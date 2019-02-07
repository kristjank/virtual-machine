import "jest-extended";
import { EventDispatcher } from "../../src/events/dispatcher";

let dispatcher;

beforeEach(() => {
    dispatcher = new EventDispatcher();
});

describe("EventDispatcher", () => {
    it("should register a listener", () => {
        dispatcher.listen("connection", () => "Hello World");

        expect(dispatcher.has("connection")).toBeTrue();
    });

    it("should register many listeners", () => {
        dispatcher.listen(["connection1", "connection2"], () => "Hello World");

        expect(dispatcher.has("connection1")).toBeTrue();
        expect(dispatcher.has("connection2")).toBeTrue();
    });

    it("should dispatch an event and receive it", () => {
        let lastEmit;

        dispatcher.listen("connection", data => {
            lastEmit = data;
        });

        dispatcher.dispatch("connection", "Hello World");

        expect(lastEmit).toBe("Hello World");
    });

    it("should forget a listener", () => {
        dispatcher.listen("connection", () => "Hello World");

        expect(dispatcher.has("connection")).toBeTrue();

        dispatcher.forget("connection");

        expect(dispatcher.has("connection")).toBeFalse();
    });

    it("should forget many listeners", () => {
        dispatcher.listen(["connection1", "connection2"], () => "Hello World");

        expect(dispatcher.has("connection1")).toBeTrue();
        expect(dispatcher.has("connection2")).toBeTrue();

        dispatcher.forget(["connection1", "connection2"]);

        expect(dispatcher.has("connection1")).toBeFalse();
        expect(dispatcher.has("connection2")).toBeFalse();
    });

    it("should get listeners for an event name", () => {
        dispatcher.listen("connection1", () => "Hello World");

        expect(dispatcher.getListeners("connection1")).toBeArray();
        expect(dispatcher.getListeners("connection1")[0]).toBeFunction();
        expect(dispatcher.getListeners("connection1")[0]()).toBe("Hello World");
    });
});
