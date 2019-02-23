import { IRequest, IResponse } from "../../interfaces";

export async function index(request: IRequest, h: IResponse) {
    return [
        {
            id: "1",
            title: "JSON API paints my bikeshed!",
            blocks: [
                "ed70cf44-9a34-4878-84e6-0c0e4a450cfe",
                "24ba3666-a593-498c-9f5d-55a4ee08c72e",
                "f386492d-df61-4573-b4e3-54f6f5d08acf",
            ],
            rounds: [
                "ed70cf44-9a34-4878-84e6-0c0e4a450cfe",
                "24ba3666-a593-498c-9f5d-55a4ee08c72e",
                "f386492d-df61-4573-b4e3-54f6f5d08acf",
            ],
            transactions: [
                "ed70cf44-9a34-4878-84e6-0c0e4a450cfe",
                "24ba3666-a593-498c-9f5d-55a4ee08c72e",
                "f386492d-df61-4573-b4e3-54f6f5d08acf",
            ],
        },
    ];
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
