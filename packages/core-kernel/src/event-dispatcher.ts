import EventEmitter from "eventemitter3";
import { Kernel } from "./contracts";

export class EventDispatcher implements Kernel.IEventDispatcher {
    private readonly dispatcher: EventEmitter = new EventEmitter();

    public listen(eventNames: string | string[], listener: any): void {
        if (!Array.isArray(eventNames)) {
            eventNames = [eventNames];
        }

        for (const eventName of Object.values(eventNames)) {
            this.dispatcher.addListener(eventName, listener);
        }
    }

    public dispatch(eventNames: string | string[], listener: any): void {
        if (!Array.isArray(eventNames)) {
            eventNames = [eventNames];
        }

        for (const eventName of Object.values(eventNames)) {
            this.dispatcher.emit(eventName, listener);
        }
    }

    public forget(eventNames: string | string[]): void {
        if (!Array.isArray(eventNames)) {
            eventNames = [eventNames];
        }

        for (const eventName of Object.values(eventNames)) {
            this.dispatcher.removeListener(eventName);
        }
    }

    public has(eventName: string): boolean {
        return this.dispatcher.eventNames().includes(eventName);
    }

    public getListeners(eventName: string): any[] {
        return this.dispatcher.listeners(eventName);
    }

    public count(): number {
        return this.dispatcher.eventNames().length;
    }
}
