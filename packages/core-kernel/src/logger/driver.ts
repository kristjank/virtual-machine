import "colors";
import isEmpty from "lodash/isEmpty";
import { inspect } from "util";
import * as winston from "winston";
import { Kernel } from "../contracts";

export class WinstonLogger implements Kernel.ILogger {
    private logger: winston.Logger;

    constructor(options: object) {
        this.logger = winston.createLogger();

        this.registerTransports();

        return this;
    }

    public emergency(message: any): void {
        this.log("emergency", message);
    }

    public alert(message: any): void {
        this.log("alert", message);
    }

    public critical(message: any): void {
        this.log("critical", message);
    }

    public error(message: any): void {
        this.log("error", message);
    }

    public warning(message: any): void {
        this.log("warning", message);
    }

    public notice(message: any): void {
        this.log("notice", message);
    }

    public info(message: any): void {
        this.log("info", message);
    }

    public debug(message: any): void {
        this.log("debug", message);
    }

    public log(level: string, message: any): void {
        if (isEmpty(message)) {
            return;
        }

        if (typeof message !== "string") {
            message = inspect(message, { depth: 1 });
        }

        this.logger[level](message);
    }

    public suppressConsoleOutput(suppress: boolean): void {
        const consoleTransport = this.logger.transports.find(t => t.name === "console");

        if (consoleTransport) {
            consoleTransport.silent = suppress;
        }
    }

    private registerTransports(): void {
        for (const transport of Object.values(this.options.transports)) {
            // @ts-ignore
            if (transport.package) {
                // @ts-ignore
                require(transport.package);
            }

            this.logger.add(
                // @ts-ignore
                new winston.transports[transport.constructor](transport.options),
            );
        }
    }
}
