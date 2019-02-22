import { IRequest, IResponse } from "../../interfaces";

export async function index(request: IRequest, h: IResponse) {
    return request.jsonapi;
}

export async function top(request: IRequest, h: IResponse) {
    // @TODO
}

export async function show(request: IRequest, h: IResponse) {
    // @TODO
}

export async function transactions(request: IRequest, h: IResponse) {
    // @TODO
}

export async function transactionsSent(request: IRequest, h: IResponse) {
    // @TODO
}

export async function transactionsReceived(request: IRequest, h: IResponse) {
    // @TODO
}

export async function votes(request: IRequest, h: IResponse) {
    // @TODO
}
