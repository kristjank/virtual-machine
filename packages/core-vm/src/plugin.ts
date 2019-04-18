import { Container } from "@arkecosystem/core-interfaces";
import { defaults } from "./defaults";
import { VirtualMachineManager } from "./manager";

export const plugin: Container.PluginDescriptor = {
    pkg: require("../package.json"),
    defaults,
    alias: "core-vm",
    async register(container: Container.IContainer, options) {
        /* Start plugin here */
        const vm = new VirtualMachineManager();
        vm.runIvm();
        vm.runIvmModuleTest();
        return vm;
    },

    async deregister(container: Container.IContainer, options) {
        /* Stop plugin here */
    },
};
