import { IApplication } from "../contracts/kernel";
import { AbstractServiceProvider } from "../support";

export class ProviderRepository {
    private readonly providers: Set<AbstractServiceProvider> = new Set<AbstractServiceProvider>();

    public constructor(readonly app: IApplication) {}

    public all(): Set<AbstractServiceProvider> {
        return this.providers;
    }

    public async register(provider: AbstractServiceProvider): Promise<void> {
        await provider.register();

        this.providers.add(provider);
    }

    public make(provider: AbstractServiceProvider, opts: Record<string, any>): AbstractServiceProvider {
        // @ts-ignore
        return new provider(this.app, opts);
    }
}
