import "jest-extended";
import {
    DirectoryNotFound,
    EntryAlreadyExists,
    EntryDoesNotExist,
    FileNotFound,
    InvalidApplicationConfiguration,
    InvalidArgument,
    InvalidConfigurationAdapter,
    InvalidEnvironmentConfiguration,
    InvalidType,
    InvalidVersion,
    KernelError,
} from "../src/errors";

describe("Errors", () => {
    test("KernelError", () => {
        expect(() => {
            throw new KernelError("message");
        }).toThrowError(KernelError);
    });

    test("DirectoryNotFound", () => {
        expect(() => {
            throw new DirectoryNotFound("message");
        }).toThrowError(DirectoryNotFound);
    });

    test("EntryAlreadyExists", () => {
        expect(() => {
            throw new EntryAlreadyExists("message");
        }).toThrowError(EntryAlreadyExists);
    });

    test("EntryDoesNotExist", () => {
        expect(() => {
            throw new EntryDoesNotExist("message");
        }).toThrowError(EntryDoesNotExist);
    });

    test("FileNotFound", () => {
        expect(() => {
            throw new FileNotFound("message");
        }).toThrowError(FileNotFound);
    });

    test("InvalidArgument", () => {
        expect(() => {
            throw new InvalidArgument("message");
        }).toThrowError(InvalidArgument);
    });

    test("InvalidType", () => {
        expect(() => {
            throw new InvalidType("funcDescription", "paramName", "expectedType", "givenType");
        }).toThrowError(InvalidType);
    });

    test("InvalidVersion", () => {
        expect(() => {
            throw new InvalidVersion("message");
        }).toThrowError(InvalidVersion);
    });

    test("InvalidApplicationConfiguration", () => {
        expect(() => {
            throw new InvalidApplicationConfiguration();
        }).toThrowError(InvalidApplicationConfiguration);
    });

    test("InvalidEnvironmentConfiguration", () => {
        expect(() => {
            throw new InvalidEnvironmentConfiguration();
        }).toThrowError(InvalidEnvironmentConfiguration);
    });

    test("InvalidConfigurationAdapter", () => {
        expect(() => {
            throw new InvalidConfigurationAdapter();
        }).toThrowError(InvalidConfigurationAdapter);
    });
});
