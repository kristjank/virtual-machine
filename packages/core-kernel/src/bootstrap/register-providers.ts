import semver from "semver";
import { Kernel } from "../contracts";
import { AbstractServiceProvider } from "../support/service-provider";

export class RegisterProviders {
    public async bootstrap(app: Kernel.IApplication): Promise<void> {
        const providers = app.config("providers");

        for (const [pkg, opts] of Object.entries(providers)) {
            const { ServiceProvider } = require(pkg);

            const serviceProvider: AbstractServiceProvider = app.makeProvider(ServiceProvider, opts);

            if (this.satisfiesDependencies(app, serviceProvider)) {
                await app.registerProvider(serviceProvider);
            }
        }
    }

    private satisfiesDependencies(app: Kernel.IApplication, serviceProvider: AbstractServiceProvider): boolean {
        const dependencies = serviceProvider.depends();

        if (!dependencies) {
            return true;
        }

        for (const [dep, version] of Object.entries(dependencies)) {
            if (!app.has(dep)) {
                throw new Error(`Failed to register "${serviceProvider.getName()}" as we did not detect "${dep}".`);
            }

            // @ts-ignore
            const constraint = app.resolve(dep).getVersion();

            if (semver.satisfies(constraint, version)) {
                throw new Error(`Expected "${dep}" to satisfy "${constraint}" but received "${version}".`);
            }
        }

        return true;
    }
}
