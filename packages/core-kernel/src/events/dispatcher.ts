import EventEmitter from "eventemitter3";

// @TODO: support wildcard listeners
export class EventDispatcher {
    /**
     * The event dispatcher instance.
     */
    private readonly dispatcher: EventEmitter = new EventEmitter();

    /**
     * Register an event listener with the dispatcher.
     */
    public listen(eventNames: string[], listener: any): void {
        for (const eventName of Object.values(eventNames)) {
            this.dispatcher.addListener(eventName, listener);
        }
    }

    /**
     * Fire an event and call the listeners.
     */
    public fire(eventName: string, listener: any): void {
        this.dispatcher.once(eventName, listener);
    }

    /**
     * Fire an event and call the listeners.
     */
    public dispatch(eventName: string, listener: any): void {
        this.dispatcher.emit(eventName, listener);
    }

    /**
     * Remove a set of listeners from the dispatcher.
     */
    public forget(eventName: string): void {
        this.dispatcher.removeListener(eventName);
    }

    /**
     * Determine if a given event has listeners.
     */
    protected hasListeners(eventName: string) {
        return this.dispatcher.eventNames().includes(eventName);
    }

    /**
     * Get all of the listeners for a given event name.
     */
    protected getListeners(eventName: string): any {
        return this.dispatcher.eventNames().includes(eventName);
    }

    /**
     * Register an event listener with the dispatcher.
     */
    protected makeListener(listener: any, wildcard: boolean = false): any {
        // @TODO
    }

    /**
     * Get the wildcard listeners for the event.
     */
    protected getWildcardListeners(eventName: string): any {
        // @TODO
    }
}
