import { app } from "@arkecosystem/core-container";
import { Logger } from "@arkecosystem/core-interfaces";
// import { Isolate, IsolateOptions, Reference, ExternalCopy } from "isolated-vm";
// import { Isolate, IsolateOptions, Reference, ExternalCopy } from "isolated-vm";
import ivm from "isolated-vm";

export class VirtualMachineManager {
    private logger = app.resolvePlugin<Logger.ILogger>("logger");
    private walletManager = app.resolvePlugin("database").walletManager;

    public constructor() {
        this.logger.info("Starting Core Virtual Machine Engine");
        console.log(this.walletManager.findByAddress("APnhwwyTbMiykJwYbGhYjNgtHiVJDSEhSn"));
    }

    public runIvm() {
        const isolate = new ivm.Isolate({ memoryLimit: 32 });

        const contract = `import contract from "./contract.js"`;
        const code = isolate.compileModuleSync(contract);

        console.log(code);

        const context = isolate.createContextSync();
        const global = context.global;
        global.setSync("ivm", ivm);
        const script2 = isolate.compileScriptSync(`
                function returnWallet() {
                    data.setAge(128);
                    return data.balance;
                }
                `);

        console.log(context.global);

        const globalReference = context.globalReference();
        const wallet = this.walletManager.findByAddress("APnhwwyTbMiykJwYbGhYjNgtHiVJDSEhSn");
        const data = new ivm.ExternalCopy({ wallet });
        data.copy({ transferIn: true });

        console.log("DATA:");
        console.log(data);
        script2.runSync(context);
        const obj = data.copyInto();
        console.log(obj);

        //    globalReference.setSync('_log', new Reference(function(...args: any) {
        //             console.log(`Actor : `, ...args);
        //         }));

        //         globalReference.setSync('global', globalReference.derefInto());

        //         const bootstrap = isolate.compileScriptSync(`
        // new function() {
        // const log = _log;

        // global.log = function(...args) {
        // log.applySync(undefined, args.map(arg => new ivm.ExternalCopy(arg).copyInto()));
        // }
        // global.changeSpeed = function(x, y) {
        // changeSpeed.applySync(undefined, [x, y]);
        // }
        // global.getNearbyActors = function() {
        // return getNearbyActors.applySync(undefined, []);
        // }
        // }
        // `);
        //         bootstrap.runSync(context);
    }
}
