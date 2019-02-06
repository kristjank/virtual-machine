import { Kernel } from "../../contracts";

export abstract class BaseAdapter {
    public constructor(protected readonly app: Kernel.IApplication) {}

    public abstract async loadConfiguration(): Promise<void>;

    public abstract async loadEnvironmentVariables(): Promise<void>;
}
