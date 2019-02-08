import "jest-extended";

import { ConfigFactory } from "../../src/config";
import { Kernel } from "../../src/contracts";
import { InvalidConfigurationAdapter } from "../../src/errors";
import { createApp } from "../__support__";

let app: Kernel.IApplication;

beforeEach(async () => {
    app = await createApp();
});

describe("ConfigFactory", () => {
    it("should should throw if an invalid adapter is request", () => {
        expect(() => ConfigFactory.make(app, "fake")).toThrow(InvalidConfigurationAdapter);
    });
});
