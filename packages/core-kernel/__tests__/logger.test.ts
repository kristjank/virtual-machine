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
        "should log message with the level - %s",
        (level: string) => {
            test("matches level and message ", async () => {
                const expectedMessage = `${level}_message`;
                logger[level](expectedMessage);

                expect(message).toInclude(level);
                expect(message).toInclude(expectedMessage);
                message = null;
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
