import * as capcon from "capture-console";
import "jest-extended";
import { Kernel } from "../src/contracts";
import { Logger } from "../src/logger";
import { createApp } from "./__support__";

let logger: Kernel.ILogger;
let message;

beforeEach(async () => {
    logger = new Logger(await createApp());

    message = null;

    capcon.startCapture(process.stdout, stdout => {
        message += stdout;
    });

    capcon.startCapture(process.stderr, stderr => {
        message += stderr;
    });
});

describe("Logger", () => {
    describe.each(["emergency", "alert", "critical", "error", "warning", "notice", "info", "debug"])(
        "%s",
        (level: string) => {
            it("should match the level and message", async () => {
                const expectedMessage = `${level}_message`;
                logger[level](expectedMessage);

                expect(message).toInclude(level);
                expect(message).toInclude(expectedMessage);
                message = null;
            });

            it("should not log if the message is NULL", async () => {
                logger[level](null);

                expect(message).toBeNull();
            });

            it("should not log if the message is {}", async () => {
                logger[level]({});

                expect(message).toBeNull();
            });

            it("should not log if the message is []", async () => {
                logger[level]([]);

                expect(message).toBeNull();
            });

            it("should not log if the message is an empty string", async () => {
                logger[level]("");

                expect(message).toBeNull();
            });

            it("should turn objects into strings", async () => {
                logger[level]({ key: "value" });

                expect(message).toInclude("{ key: 'value' }");
            });

            it("should turn arrays into strings", async () => {
                logger[level](["key"]);

                expect(message).toInclude("[ 'key' ]");
            });
        },
    );

    describe("muteConsole", () => {
        it("should suppress console output", () => {
            logger.muteConsole(true);

            logger.info("silent_message");
            expect(message).toBeNull();

            logger.muteConsole(false);

            logger.info("non_silent_message");
            expect(message).toMatch(/non_silent_message/);

            message = null;
        });
    });
});
