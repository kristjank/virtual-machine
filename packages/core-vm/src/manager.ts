import { app } from "@arkecosystem/core-container";
import { Logger } from "@arkecosystem/core-interfaces";
import * as fs from "fs";
import ivm from "isolated-vm";
import * as path from "path";
import { Module } from "webpack";

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
                return new ivm.ExternalCopy(wallets.shift());
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

        const runDappSimple = isolate.compileScriptSync(
            fs.readFileSync(path.join(__dirname, "..", "src", "contract.js")).toString("utf-8"),
        );
        runDappSimple.runSync(context);

        const runMainScript = isolate.compileScriptSync("main();");
        runMainScript.runSync(context);
        this.logger.debug(`CpuTime (ms, ns): (${isolate.cpuTime})`);

        runMainScript.runSync(context);
        this.logger.debug(`CpuTime (ms, ns): (${isolate.cpuTime})`);

        runMainScript.runSync(context);
        this.logger.debug(`CpuTime (ms, ns): (${isolate.cpuTime})`);
    }

    public instatiateCallback(specifier: string, referrer: Module) {
        console.log(specifier);
        console.log(referrer);

        return fs;
    }

    public runIvmModuleTest() {
        this.logger.info("Starting module integration test");
        const isolate = new ivm.Isolate({ memoryLimit: 32 });
        const context = isolate.createContextSync();

        const module = isolate.compileModuleSync(
            fs.readFileSync(path.join(__dirname, "..", "src", "contract-module.js")).toString("utf-8"),
        );
        console.log(module);

        const dependencySpecifiers = module.dependencySpecifiers; // use this to check for allowed ones
        console.log(dependencySpecifiers);

        console.log("befor institi");
        module.instantiateSync(context, (specifier: string, referrer: ivm.Module) => {
            console.log(specifier);
            console.log(referrer);
            console.log("callback");
            return null;
        });

        const reference = module.namespace;

        const defExport = reference.getSync("add");
        console.log(defExport);

        // const result = defExport.applySync(null, [2,4]);
        // console.log(result);
    }
}
