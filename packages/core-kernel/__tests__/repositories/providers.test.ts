import "jest-extended";

import { Kernel } from "../../src/contracts";
import { ProviderRepository } from "../../src/repositories";
import { AbstractServiceProvider } from "../../src/support";
import { ServiceProvider } from "../__stubs__/service-provider";
import { createApp } from "../__support__";

let app: Kernel.IApplication;
let repository: ProviderRepository;

beforeEach(async () => {
    app = await createApp();
    repository = new ProviderRepository(app);
});

describe("ProviderRepository", () => {
    test("register", async () => {
        expect(repository.size).toBe(0);

        // @ts-ignore
        await repository.register(repository.make(ServiceProvider, {}));

        expect(repository.size).toBe(1);
    });

    test("make", () => {
        // @ts-ignore
        expect(repository.make(ServiceProvider, {})).toBeInstanceOf(AbstractServiceProvider);
    });
});
