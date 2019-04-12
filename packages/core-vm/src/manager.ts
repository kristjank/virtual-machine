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

        const context = isolate.createContextSync();
        const global = context.global;
        global.setSync("ivm", ivm);
        isolate
            .compileScriptSync(
                `
function makeReference(ref) {
return new ivm.Reference(ref);
}
function isReference(ref) {
return ref instanceof ivm.Reference;
}
`,
            )
            .runSync(context);

        console.log(context.global);

        const globalReference = context.globalReference();
        const wallets = this.walletManager.allByAddress();
        const data = new ivm.ExternalCopy({ wallets });
        data.copy({ transferIn: true });
        console.log(data);

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
