import "jest-extended";

import { ConfigRepository } from "../../src/config";
import { Kernel } from "../../src/contracts";
import { createApp } from "../__support__";

let app: Kernel.IApplication;
let repository: ConfigRepository;

beforeEach(async () => {
    app = await createApp();
    repository = new ConfigRepository(app, { hello: "world" });
});

describe("ConfigRepository", () => {
    it("should return an iterator with all configuration", () => {
        expect(repository.all()).toHaveLength(1);
    });

    it("should set and get a value", () => {
        repository.set("key", "value");

        expect(repository.get("key")).toBe("value");
    });

    it("should return true if a key exists", () => {
        repository.set("key", "value");

        expect(repository.has("key")).toBeTrue();
    });

    it("should return true if a key does not exists", () => {
        expect(repository.has("fake-key")).toBeFalse();
    });
});
