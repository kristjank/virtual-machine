// tslint:disable:max-classes-per-file

export class ExtendableError extends Error {
    constructor(message: string) {
        super(message);

        Object.defineProperty(this, "message", {
            enumerable: false,
            value: message,
        });

        Object.defineProperty(this, "name", {
            enumerable: false,
            value: this.constructor.name,
        });

        Error.captureStackTrace(this, this.constructor);
    }
}

export class KernelError extends ExtendableError {}

export class DirectoryNotFound extends KernelError {
    constructor(value: string) {
        super(`Directory [${value}] could not be found.`);
    }
}

export class EntryAlreadyExists extends KernelError {
    constructor(value: string) {
        super(`[${value}] is not registered.`);
    }
}

export class EntryDoesNotExist extends KernelError {
    constructor(value: string) {
        super(`[${value}] is not registered.`);
    }
}

export class FileNotFound extends KernelError {
    constructor(value: string) {
        super(`File [${value}] could not be found.`);
    }
}

export class InvalidArgument extends KernelError {
    constructor(value: any) {
        super(`[${value.toString()}] is an invalid argument.`);
    }
}

export class InvalidType extends KernelError {
    constructor(funcDescription: string, paramName: string, expectedType: string, givenType: any) {
        super(`${funcDescription}: expected ${paramName} to be ${expectedType}, but got ${givenType}.`);
    }
}

export class InvalidVersion extends KernelError {
    constructor(version: string) {
        super(
            `"${version}" is not a valid semantic version. Please check https://semver.org/ and make sure you follow the spec.`,
        );
    }
}

export class InvalidApplicationConfiguration extends KernelError {
    constructor() {
        super("Unable to load the application configuration file.");
    }
}

export class InvalidEnvironmentConfiguration extends KernelError {
    constructor() {
        super("Unable to load the environment file.");
    }
}

export class InvalidConfigurationAdapter extends KernelError {
    constructor() {
        super("Unable to load the environment file.");
    }
}
