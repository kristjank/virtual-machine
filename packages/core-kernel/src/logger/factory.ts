import { Kernel } from "../contracts";

export class LogFactory {
    private drivers: Map<string, Kernel.ILogger>;

    constructor() {
        this.drivers = new Map();
    }

    public driver(name: string = "default"): Kernel.ILogger {
        return this.drivers.get(name);
    }

    public async makeDriver(driver: Kernel.ILogger, name: string = "default"): Promise<void> {
        this.drivers.set(name, new Driver());
    }
}
