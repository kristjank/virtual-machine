import {
    aliasTo,
    asClass,
    asFunction,
    asValue,
    AwilixContainer,
    BuildResolverOptions,
    Constructor,
    createContainer,
    FunctionReturning,
    Resolver,
} from "awilix";
import { isClass, isFunction } from "typechecker";
import { EntryDoesNotExist, InvalidType } from "./errors";

export class Container {
    private readonly container: AwilixContainer = createContainer();

    public resolve<T = any>(name: string): T {
        if (!this.has(name)) {
            throw new EntryDoesNotExist(name);
        }

        return this.container.resolve<T>(name);
    }

    public bind(name: string, concrete: any): void {
        if (isClass(concrete)) {
            concrete = asClass(concrete);
        } else if (isFunction(concrete)) {
            concrete = asFunction(concrete);
        } else {
            concrete = asValue(concrete);
        }

        this.container.register(name, concrete);
    }

    public shared(name: string, concrete: any): void {
        if (isClass(concrete)) {
            concrete = asClass(concrete);
        } else if (isFunction(concrete)) {
            concrete = asFunction(concrete);
        } else {
            throw new InvalidType("shared", "concrete", "class or function", typeof concrete);
        }

        this.container.register(name, concrete.singleton());
    }

    public alias(name: string, alias: string): void {
        this.container.register(alias, aliasTo(name));
    }

    public has(name: string): boolean {
        return this.container.has(name);
    }

    public call(
        targetOrResolver: FunctionReturning<{}> | Constructor<{}> | Resolver<{}>,
        opts?: BuildResolverOptions<{}>,
    ) {
        return this.container.build(targetOrResolver, opts);
    }
}
