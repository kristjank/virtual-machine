import * as capcon from "capture-console";
import "jest-extended";
import { Kernel } from "../src/contracts";
import { Logger } from "../src/logger";

const logger: Kernel.ILogger = new Logger();
let message;

beforeEach(() => {
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
