import "colors";
import isEmpty from "lodash/isEmpty";
import { inspect } from "util";
import * as winston from "winston";
import { Kernel } from "../contracts";

export class Logger implements Kernel.ILogger {
    private logger: winston.Logger;

    constructor(options: object) {
        this.logger = winston.createLogger({
            levels: {
                emerg: 0,
                alert: 1,
                crit: 2,
                error: 3,
                warning: 4,
                notice: 5,
                info: 6,
                debug: 7,
            },
        });

        winston.addColors({
            emerg: "red",
            alert: "red",
            crit: "red",
            error: "red",
            warning: "yellow",
            notice: "green",
            info: "blue",
            debug: "magenta",
        });

        this.registerTransports(options);
    }

    public emergency(message: any): void {
        this.log("emerg", message);
    }

    public alert(message: any): void {
        this.log("alert", message);
    }

    public critical(message: any): void {
        this.log("crit", message);
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

    public muteConsole(suppress: boolean): void {
        const consoleTransport = this.logger.transports.find((transport: any) => transport.name === "console");

        if (consoleTransport) {
            consoleTransport.silent = suppress;
        }
    }

    private registerTransports(options): void {
        for (const transport of Object.values(options.transports)) {
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
