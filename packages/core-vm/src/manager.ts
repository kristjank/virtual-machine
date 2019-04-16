import { app } from "@arkecosystem/core-container";
import { Logger } from "@arkecosystem/core-interfaces";
import * as fs from "fs";
import ivm from "isolated-vm";
import * as path from "path";

export class VirtualMachineManager {
    private logger = app.resolvePlugin<Logger.ILogger>("logger");
    private walletManager = app.resolvePlugin("database").walletManager;

    public constructor() {
        this.logger.info("Starting Core Virtual Machine Engine");
        // console.log(this.walletManager.findByAddress("APnhwwyTbMiykJwYbGhYjNgtHiVJDSEhSn"));
    }

    public runIvm() {
        const isolate = new ivm.Isolate({ memoryLimit: 32 });
        const context = isolate.createContextSync();
        const global = context.global;
        const globalReference = context.globalReference();
        const wallet = this.walletManager.findByAddress("APnhwwyTbMiykJwYbGhYjNgtHiVJDSEhSn");
        const wallets = this.walletManager.allByAddress();
        const data = new ivm.ExternalCopy({ wallet });
        data.copy({ transferIn: true });

        globalReference.setSync(
            "_test",
            new ivm.Reference((...args) => {
                console.log(`Test : `, ...args);
                console.log(`Wallets: `, wallets.length);
            }),
        );

        globalReference.setSync("_ivm", ivm);
        globalReference.setSync("global", globalReference.derefInto());
        // globalReference.setSync('_wallet', data);

        globalReference.setSync(
            "_getWallets",
            new ivm.Reference(() => {
                // const allWallets = wallets;
                // allWallets.shift();
                return new ivm.ExternalCopy(wallets.shift().copyInto());
            }),
        );

        const bootstrap = isolate.compileScriptSync(`
        new function() {
            const ivm = _ivm;
            const test = _test;
            const getWallets = _getWallets;
            delete _ivm;
            delete _test;
            delete _getWallets;

            global.test = function(...args) {
                test.applySync(undefined, args.map(arg => new ivm.ExternalCopy(arg).copyInto()));
            }
            global.getWallets = function() {
                return getWallets.applySync(undefined, []);
            }


        }
        `);
        bootstrap.runSync(context);

        const runDApp = isolate.compileScriptSync(
            fs.readFileSync(path.join(__dirname, "..", "src", "contract.js")).toString("utf-8"),
        );

        runDApp.runSync(context);

        const runMainScript = isolate.compileScriptSync("main();");
        runMainScript.runSync(context);
        console.log(isolate.cpuTime);
        runMainScript.runSync(context);
        console.log(isolate.cpuTime);
        runMainScript.runSync(context);
        console.log(isolate.cpuTime);
        runMainScript.runSync(context);
    }
}
