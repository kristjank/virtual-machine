import EventEmitter from "eventemitter3";
import { Kernel } from "./contracts";

export class EventDispatcher implements Kernel.IEventDispatcher {
    /**
     * The event dispatcher instance.
     */
    private readonly dispatcher: EventEmitter = new EventEmitter();

    /**
     * Register an event listener with the dispatcher.
     */
    public listen(eventNames: string | string[], listener: any): void {
        if (!Array.isArray(eventNames)) {
            eventNames = [eventNames];
        }

        for (const eventName of Object.values(eventNames)) {
            this.dispatcher.addListener(eventName, listener);
        }
    }

    /**
     * Fire an event and call the listeners.
     */
    public dispatch(eventNames: string | string[], listener: any): void {
        if (!Array.isArray(eventNames)) {
            eventNames = [eventNames];
        }

        for (const eventName of Object.values(eventNames)) {
            this.dispatcher.emit(eventName, listener);
        }
    }

    /**
     * Remove a set of listeners from the dispatcher.
     */
    public forget(eventNames: string | string[]): void {
        if (!Array.isArray(eventNames)) {
            eventNames = [eventNames];
        }

        for (const eventName of Object.values(eventNames)) {
            this.dispatcher.removeListener(eventName);
        }
    }

    /**
     * Determine if a given event has listeners.
     */
    public has(eventName: string): boolean {
        return this.dispatcher.eventNames().includes(eventName);
    }

    /**
     * Get all of the listeners for a given event name.
     */
    public getListeners(eventName: string): any[] {
        return this.dispatcher.listeners(eventName);
    }
}
