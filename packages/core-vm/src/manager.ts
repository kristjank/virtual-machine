import { app } from "@arkecosystem/core-container";
import { Logger } from "@arkecosystem/core-interfaces";
import { Isolate, IsolateOptions } from "isolated-vm";

export class VirtualMachineManager {
    private logger = app.resolvePlugin<Logger.ILogger>("logger");

    public constructor() {
        this.logger.info("Starting CORE VIRTUAL MACHINE Engine");
    }

    public runIvm() {
        const isolate = new Isolate();
        console.log("mamqqa");
        const context = isolate.createContextSync();
        const globalReference = context.globalReference();
    }
}
