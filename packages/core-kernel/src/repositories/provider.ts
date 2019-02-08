import { IApplication } from "../contracts/kernel";
import { AbstractServiceProvider } from "../support";

export class ProviderRepository extends Set<AbstractServiceProvider> {
    public constructor(readonly app: IApplication) {
        super();
    }

    public async register(provider: AbstractServiceProvider): Promise<void> {
        await provider.register();

        this.add(provider);
    }

    public make(provider: AbstractServiceProvider, opts: Record<string, any>): AbstractServiceProvider {
        // @ts-ignore
        return new provider(this.app, opts);
    }
}
