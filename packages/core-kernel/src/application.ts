import { existsSync, removeSync, writeFileSync } from "fs-extra";
import camelCase from "lodash/camelCase";
import { join } from "path";
import * as Bootstrappers from "./bootstrap";
import { ConfigFactory, ConfigRepository } from "./config";
import { Container } from "./container";
import { Blockchain, Kernel, P2P, TransactionPool } from "./contracts";
import { DirectoryNotFound, FailedNetworkDetection } from "./errors";
import { EventDispatcher } from "./event-dispatcher";
import { Logger } from "./logger";
import { ProviderRepository } from "./repositories";
import { AbstractServiceProvider } from "./support";

export class Application extends Container implements Kernel.IApplication {
    private readonly providers: ProviderRepository = new ProviderRepository(this);
    private hasBeenBootstrapped: boolean = false;
    private booted: boolean = false;

    public async boot(config: Record<string, any>): Promise<void> {
        this.bindConfiguration(config);

        this.bindPathsInContainer();

        this.registerCoreServices();

        this.registerBindings();

        this.registerNamespace();

        await this.registerServiceProviders();

        this.booted = true;
    }

    public async reboot(): Promise<void> {
        await this.terminate();

        await this.registerServiceProviders();
    }

    public getProviders(): Set<AbstractServiceProvider> {
        return this.providers.all();
    }

    public async registerProvider(provider: AbstractServiceProvider): Promise<void> {
        await this.providers.register(provider);
    }

    public makeProvider(provider: AbstractServiceProvider, opts: Record<string, any>): AbstractServiceProvider {
        return this.providers.make(provider, opts);
    }

    public afterLoadingEnvironment(listener: any): any {
        return this.afterBootstrapping("LoadEnvironmentVariables", listener);
    }

    public beforeBootstrapping(bootstrapper: string, listener: any): void {
        this.events.listen(`bootstrapping: ${bootstrapper}`, listener);
    }

    public afterBootstrapping(bootstrapper: string, listener: any): void {
        this.events.listen(`bootstrapped: ${bootstrapper}`, listener);
    }

    public config<T = any>(key: string, value?: T): T {
        if (value) {
            this.resolve("config").set(key, value);
        }

        return this.resolve("config").get(key);
    }

    public namespace(): string {
        return this.resolve("app.namespace");
    }

    public version(): string {
        return this.resolve("app.version");
    }

    public token(): string {
        return this.resolve("app.token");
    }

    public network(): string {
        return this.resolve("app.network");
    }

    public useNetwork(value: string): void {
        this.bind("app.network", value);
    }

    public dataPath(path: string = ""): string {
        return join(this.getPath("data"), path);
    }

    public useDataPath(path: string): void {
        this.usePath("data", path);
    }

    public configPath(path: string = ""): string {
        return join(this.getPath("config"), path);
    }

    public useConfigPath(path: string): void {
        this.usePath("config", path);
    }

    public cachePath(path: string = ""): string {
        return join(this.getPath("cache"), path);
    }

    public useCachePath(path: string): void {
        this.usePath("cache", path);
    }

    public logPath(path: string = ""): string {
        return join(this.getPath("log"), path);
    }

    public useLogPath(path: string): void {
        this.usePath("log", path);
    }

    public tempPath(path: string = ""): string {
        return join(this.getPath("temp"), path);
    }

    public useTempPath(path: string): void {
        this.usePath("temp", path);
    }

    public environmentFile(): string {
        return this.configPath(".env");
    }

    public environment(): string {
        return this.resolve("app.env");
    }

    public useEnvironment(value: string): void {
        this.bind("app.env", value);
    }

    public isProduction(): boolean {
        return this.environment() === "production" || this.network() === "mainnet";
    }

    public isDevelopment(): boolean {
        return this.environment() === "development" || ["devnet", "testnet"].includes(this.network());
    }

    public runningTests(): boolean {
        return this.environment() === "test" || this.network() === "testnet";
    }

    public isBooted(): boolean {
        return this.booted;
    }

    public isBootstrapped(): boolean {
        return this.hasBeenBootstrapped;
    }

    public enableMaintenance(): void {
        writeFileSync(this.tempPath("maintenance"), JSON.stringify({ time: +new Date() }));

        this.log.notice("Application is now in maintenance mode.");

        this.events.dispatch("kernel.maintenance", true);
    }

    public disableMaintenance(): void {
        removeSync(this.tempPath("maintenance"));

        this.log.notice("Application is now live.");

        this.events.dispatch("kernel.maintenance", false);
    }

    public isDownForMaintenance(): boolean {
        return existsSync(this.tempPath("maintenance"));
    }

    public async terminate(): Promise<void> {
        this.hasBeenBootstrapped = false;

        await this.disposeServiceProviders();
    }

    public get log(): Kernel.ILogger {
        return this.resolve<Kernel.ILogger>("log");
    }

    public get blockchain(): Blockchain.IBlockchain {
        return this.resolve<Blockchain.IBlockchain>("blockchain");
    }

    public get p2p(): P2P.IMonitor {
        return this.resolve<P2P.IMonitor>("p2p");
    }

    public get transactionPool(): TransactionPool.ITransactionPool {
        return this.resolve<TransactionPool.ITransactionPool>("transactionPool");
    }

    public get events(): Kernel.IEventDispatcher {
        return this.resolve<Kernel.IEventDispatcher>("events");
    }

    private bindConfiguration(config: Record<string, any>): void {
        this.bind("configLoader", ConfigFactory.make(this, "local")); // @TODO
        this.bind("config", new ConfigRepository(this, config));
    }

    private registerBindings(): void {
        this.bind("app.env", this.config("env"));
        this.bind("app.token", this.config("token"));
        this.bind("app.network", this.config("network"));
        this.bind("app.version", this.config("version"));
    }

    private registerNamespace(): void {
        const token = this.token();
        const network = this.network();

        if (!token || !network) {
            throw new FailedNetworkDetection();
        }

        this.bind("app.namespace", `${token}-${network}`);
        this.bind("app.dirPrefix", `${token}/${network}`);
    }

    private registerCoreServices(): void {
        this.bind("events", new EventDispatcher());
        this.bind("log", new Logger(this));
    }

    private async registerServiceProviders(): Promise<void> {
        this.hasBeenBootstrapped = true;

        for (const Bootstrapper of Object.values(Bootstrappers)) {
            this.events.dispatch(`bootstrapping: ${Bootstrapper.name}`, this);

            await new Bootstrapper().bootstrap(this);

            this.events.dispatch(`bootstrapped: ${Bootstrapper.name}`, this);
        }
    }

    private async disposeServiceProviders(): Promise<void> {
        for (const provider of this.getProviders()) {
            await provider.dispose();
        }
    }

    private bindPathsInContainer(): void {
        for (const [type, path] of Object.entries(this.config("paths"))) {
            this[camelCase(`use_${type}_path`)](path);

            this.bind(`path.${type}`, path);
        }
    }

    private getPath(type: string): string {
        const path = this.resolve(`path.${type}`);

        if (!existsSync(path)) {
            throw new DirectoryNotFound(path);
        }

        return path;
    }

    private usePath(type: string, path: string): void {
        if (!existsSync(path)) {
            throw new DirectoryNotFound(path);
        }

        this.bind(`path.${type}`, path);
    }
}
