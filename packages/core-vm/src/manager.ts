"use strict";
import { app } from "@arkecosystem/core-container";
// import { Logger } from "@arkecosystem/core-interfaces";
import * as ivm from "isolated-vm";

export class VirtualMachineManager {
    // private logger = app.resolvePlugin<Logger.ILogger>("logger");

    private isolate = new ivm.Isolate();

    public constructor() {
        // this.logger.info("Starting core virtual machine" );
        console.log("druzinla");
    }

    public runIvm() {
        console.log("mamqqa");
        // initialize
        // let isolate = new ivm.Isolate(memoryLimit: 16});
        const context = this.isolate.createContextSync();
        // let globalReference = context.globalReference();
    }
}
