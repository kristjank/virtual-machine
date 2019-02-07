import chalk from "chalk";
import "colors";
import dayjs from "dayjs-ext";
import isEmpty from "lodash/isEmpty";
import emoji from "node-emoji";
import { inspect } from "util";
import * as winston from "winston";
import "winston-daily-rotate-file";
import { Kernel } from "./contracts";

export class Logger implements Kernel.ILogger {
    private logger: winston.Logger;

    constructor(readonly app: Kernel.IApplication) {
        this.logger = winston.createLogger({
            levels: {
                emergency: 0,
                alert: 1,
                critical: 2,
                error: 3,
                warning: 4,
                notice: 5,
                info: 6,
                debug: 7,
            },
        });

        winston.addColors({
            emergency: "red",
            alert: "red",
            critical: "red",
            error: "red",
            warning: "yellow",
            notice: "green",
            info: "blue",
            debug: "magenta",
        });

        this.registerTransports();
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

    public muteConsole(suppress: boolean): void {
        const consoleTransport = this.logger.transports.find((transport: any) => transport.name === "console");

        if (consoleTransport) {
            consoleTransport.silent = suppress;
        }
    }

    public addTransport(transport: any): void {
        this.logger.add(transport);
    }

    public removeTransport(transport: any): void {
        this.logger.remove(transport);
    }

    private registerTransports(): void {
        this.logger.configure({
            transports: [
                new winston.transports.Console({
                    level: "debug",
                    format: this.formatLog(true),
                    stderrLevels: ["emergency", "alert", " critical", "error"],
                }),
                // @ts-ignore
                new winston.transports.DailyRotateFile({
                    level: "debug",
                    format: this.formatLog(false),
                    filename: this.app.logPath("%DATE%.log"),
                    datePattern: "YYYY-MM-DD",
                    zippedArchive: true,
                    maxSize: "100m",
                    maxFiles: "10",
                }),
            ],
        });
    }

    private formatLog(colorOutput: boolean = true) {
        const { colorize, combine, timestamp, printf } = winston.format;

        return combine(
            colorize(),
            timestamp(),
            printf(info => {
                // @ts-ignore
                const infoLevel = info[Symbol.for("level")];

                let level = infoLevel.toUpperCase();
                let message = emoji.emojify(info.message) || JSON.stringify(info.meta);

                if (colorOutput) {
                    level = {
                        emergency: chalk.bold.red(level),
                        alert: chalk.bold.red(level),
                        critical: chalk.bold.red(level),
                        error: chalk.bold.red(level),
                        warning: chalk.bold.yellow(level),
                        notice: chalk.bold.yellowBright(level),
                        info: chalk.bold.blue(level),
                        debug: chalk.bold.magenta(level),
                    }[infoLevel];

                    message = {
                        emergency: message,
                        alert: message,
                        critical: message,
                        error: message,
                        warning: message,
                        notice: message,
                        info: message,
                        debug: message,
                    }[infoLevel];
                }

                const dateTime = dayjs(info.timestamp).format("YYYY-MM-DD HH:mm:ss");

                return `[${dateTime}][${level}]: ${message}`;
            }),
        );
    }
}
