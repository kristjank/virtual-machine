import Hapi from "hapi";

export interface IRequest extends Hapi.Request {
    jsonapi: Record<string, any>;
}

// tslint:disable-next-line: no-empty-interface
export interface IResponse extends Hapi.ResponseToolkit {}

// tslint:disable-next-line: no-empty-interface
export interface IServer extends Hapi.Server {}

export interface IValidationError {
    status: number;
    source: {
        pointer: string;
        parameter?: string;
    };
    title: string;
    detail: string;
}
