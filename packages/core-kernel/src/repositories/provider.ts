import { IApplication } from "../contracts/kernel";
import { AbstractServiceProvider } from "../support";

export class ProviderRepository {
    public readonly providers: Set<AbstractServiceProvider> = new Set<AbstractServiceProvider>();

    public constructor(readonly app: IApplication) {}

    public all(): IterableIterator<AbstractServiceProvider> {
        return this.providers.values();
    }

    public async register(provider: AbstractServiceProvider): Promise<void> {
        await provider.register();

        this.providers.add(provider);
    }

    public make(provider: AbstractServiceProvider, opts: Record<string, any>): AbstractServiceProvider {
        // @ts-ignore
        return new provider(this.app, opts);
    }

    public count(): number {
        return this.providers.size;
    }
}
