import "jest-extended";

import { ensureDirSync, removeSync } from "fs-extra";
import { resolve } from "path";
import { Kernel } from "../src/contracts";
import { DirectoryNotFound, EntryDoesNotExist, FailedNetworkDetection } from "../src/errors";
import { createApp } from "./__support__";

const config = {
    env: "dummy",
    version: "2.1.0",
    token: "ark",
    network: "dummy",
    paths: {
        data: resolve(__dirname, "./__fixtures__/data"),
        config: resolve(__dirname, "./__fixtures__/config"),
        cache: resolve(__dirname, "./__fixtures__/cache"),
        log: resolve(__dirname, "./__fixtures__/log"),
        temp: resolve(__dirname, "./__fixtures__/temp"),
    },
};

function createTempDir(method: string) {
    ensureDirSync("tmp");

    app[method]("tmp");

    removeSync("tmp");
}

let app: Kernel.IApplication;
beforeEach(async () => {
    app = await createApp();
});

describe("Application", () => {
    it("should be booted", () => {
        expect(app.isBooted()).toBeTrue();
        expect(app.isBootstrapped()).toBeTrue();
    });

    it("should terminate the application", async () => {
        await app.terminate();

        expect(app.isBootstrapped()).toBeFalse();
    });

    it("should throw an error if the blockchain is not available", async () => {
        expect(() => app.blockchain).toThrow(EntryDoesNotExist);
    });

    it("should throw an error if the p2p is not available", async () => {
        expect(() => app.p2p).toThrow(EntryDoesNotExist);
    });

    it("should throw an error if the transactionPool is not available", async () => {
        expect(() => app.transactionPool).toThrow(EntryDoesNotExist);
    });

    it("should throw an error if the token is missing", async () => {
        const dummyConfig = { ...config };
        delete dummyConfig.token;

        await expect(createApp(dummyConfig)).rejects.toThrow(FailedNetworkDetection);
    });

    it("should throw an error if the network is missing", async () => {
        const dummyConfig = { ...config };
        delete dummyConfig.network;

        await expect(createApp(dummyConfig)).rejects.toThrow(FailedNetworkDetection);
    });

    it("config", () => {
        expect(app.config<string>("key")).toBeUndefined();

        app.config("key", "value");

        expect(app.config<string>("key")).toBe("value");
    });

    it("version", () => {
        expect(app.version()).toBeString();
    });

    describe("dataPath", () => {
        it("should return a valid path", () => {
            expect(app.dataPath()).toBe(config.paths.data);
        });

        it("should throw an error if the requested path does not exist", () => {
            createTempDir("useDataPath");

            expect(() => app.dataPath()).toThrow(DirectoryNotFound);
        });
    });

    describe("useDataPath", () => {
        it("should use the given path", () => {
            app.useDataPath(config.paths.data);

            expect(app.dataPath()).toBe(config.paths.data);
        });

        it("should throw an error if the given path does not exist", () => {
            expect(() => app.useDataPath("fake")).toThrow(DirectoryNotFound);
        });
    });

    describe("configPath", () => {
        it("should return a valid path", () => {
            expect(app.configPath()).toBe(config.paths.config);
        });

        it("should throw an error if the requested path does not exist", () => {
            createTempDir("useConfigPath");

            expect(() => app.configPath()).toThrow(DirectoryNotFound);
        });
    });

    describe("useConfigPath", () => {
        it("should use the given path", () => {
            app.useConfigPath(config.paths.config);

            expect(app.configPath()).toBe(config.paths.config);
        });

        it("should throw an error if the given path does not exist", () => {
            expect(() => app.useConfigPath("fake")).toThrow(DirectoryNotFound);
        });
    });

    describe("cachePath", () => {
        it("should return a valid path", () => {
            expect(app.cachePath()).toBe(config.paths.cache);
        });

        it("should throw an error if the requested path does not exist", () => {
            createTempDir("useCachePath");

            expect(() => app.cachePath()).toThrow(DirectoryNotFound);
        });
    });

    describe("useCachePath", () => {
        it("should use the given path", () => {
            app.useCachePath(config.paths.cache);

            expect(app.cachePath()).toBe(config.paths.cache);
        });

        it("should throw an error if the given path does not exist", () => {
            expect(() => app.useCachePath("fake")).toThrow(DirectoryNotFound);
        });
    });

    describe("logPath", () => {
        it("should return a valid path", () => {
            expect(app.logPath()).toBe(config.paths.log);
        });

        it("should throw an error if the requested path does not exist", () => {
            createTempDir("useLogPath");

            expect(() => app.logPath()).toThrow(DirectoryNotFound);
        });
    });

    describe("useLogPath", () => {
        it("should use the given path", () => {
            app.useLogPath(config.paths.log);

            expect(app.logPath()).toBe(config.paths.log);
        });

        it("should throw an error if the given path does not exist", () => {
            createTempDir("useLogPath");

            expect(() => app.useLogPath("fake")).toThrow(DirectoryNotFound);
        });
    });

    describe("tempPath", () => {
        it("should return a valid path", () => {
            expect(app.tempPath()).toBe(config.paths.temp);
        });

        it("should throw an error if the requested path does not exist", () => {
            createTempDir("useTempPath");

            expect(() => app.tempPath()).toThrow(DirectoryNotFound);
        });
    });

    describe("useTempPath", () => {
        it("should use the given path", () => {
            app.useTempPath(config.paths.temp);

            expect(app.tempPath()).toBe(config.paths.temp);
        });

        it("should throw an error if the given path does not exist", () => {
            expect(() => app.useTempPath("fake")).toThrow(DirectoryNotFound);
        });
    });

    describe("isProduction", () => {
        it("should be true if the network is 'mainnet'", () => {
            app.useNetwork("mainnet");

            expect(app.isProduction()).toBeTrue();
        });

        it("should be false if the network is not 'mainnet'", () => {
            app.useNetwork("devnet");

            expect(app.isProduction()).toBeFalse();
        });

        it("should be true if the environment is 'production'", () => {
            app.useEnvironment("production");

            expect(app.isProduction()).toBeTrue();
        });

        it("should be false if the environment is not 'production'", () => {
            app.useEnvironment("development");

            expect(app.isProduction()).toBeFalse();
        });
    });

    describe("isDevelopment", () => {
        it("should be true if the network is 'devnet'", () => {
            app.useNetwork("devnet");

            expect(app.isDevelopment()).toBeTrue();
        });

        it("should be false if the network is not 'devnet'", () => {
            app.useNetwork("mainnet");

            expect(app.isDevelopment()).toBeFalse();
        });

        it("should be true if the environment is 'development'", () => {
            app.useEnvironment("development");

            expect(app.isDevelopment()).toBeTrue();
        });

        it("should be false if the environment is not 'development'", () => {
            app.useEnvironment("production");

            expect(app.isDevelopment()).toBeFalse();
        });
    });

    describe("runningTests", () => {
        it("should be true if the network is 'testnet'", () => {
            app.useNetwork("testnet");

            expect(app.runningTests()).toBeTrue();
        });

        it("should be false if the network is not 'testnet'", () => {
            app.useNetwork("mainnet");

            expect(app.runningTests()).toBeFalse();
        });

        it("should be true if the environment is 'test'", () => {
            app.useEnvironment("test");

            expect(app.runningTests()).toBeTrue();
        });

        it("should be false if the environment is not 'test'", () => {
            app.useEnvironment("production");

            expect(app.runningTests()).toBeFalse();
        });
    });

    it("should go in and out of maintenance mode", () => {
        app.enableMaintenance();

        expect(app.isDownForMaintenance()).toBeTrue();

        app.disableMaintenance();

        expect(app.isDownForMaintenance()).toBeFalse();
    });
});
