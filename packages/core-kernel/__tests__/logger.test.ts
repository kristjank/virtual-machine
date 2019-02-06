import * as capcon from "capture-console";
import "jest-extended";
import { Kernel } from "../src/contracts";
import { Logger } from "../src/logger";

let logger: Kernel.ILogger;
let message;

beforeEach(() => {
    logger = new Logger({
        transports: [
            {
                constructor: "Console",
                options: {
                    level: "debug",
                },
            },
            {
                constructor: "File",
                options: { filename: "tmp.log", level: "silly" },
            },
        ],
    });

    capcon.startCapture(process.stdout, stdout => {
        message += stdout;
    });
});

describe("Logger", () => {
    describe.each(["emergency", "alert", "critical", "error", "warning", "notice", "info", "debug"])(
        "should log a %s message",
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
