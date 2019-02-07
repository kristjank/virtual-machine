import "jest-extended";

import { Kernel } from "../src/contracts";
import { ServiceProvider } from "./__stubs__/service-provider";
import { createApp } from "./__support__";

let app: Kernel.IApplication;
let serviceProvider: ServiceProvider;
beforeEach(() => {
    app = createApp();
    serviceProvider = new ServiceProvider(app);
});

describe("Plugin", () => {
    it("should call the <register> method of a service provider", async () => {
        await serviceProvider.register();

        expect(app.resolve(serviceProvider.getName())).toBeTrue();
    });

    it("should call the <dispose> method of a service provider", async () => {
        await serviceProvider.register();

        expect(app.resolve(serviceProvider.getName())).toBeTrue();

        await serviceProvider.dispose();

        expect(app.resolve(serviceProvider.getName())).toBeFalse();
    });
});
