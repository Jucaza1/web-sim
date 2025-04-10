export type Result<T, E> = {
    ok: boolean
    data?: T
    err?: E
}

export type ResultHttp<T> = Result<T, HttpError>
export type HttpError = {
    status: number
    msg?: string[]
}

export type ResultStore<T> = Result<T, StoreError>
export type StoreError = {
    code: StoreErrorCode
    msg?: string
}

export enum StoreErrorCode {
    engineFault, // 500
    connectionFault, // 500
    invalidCredentials, // 500
    unique,  // 409
    notFound, // 404
    invalidInput, // 400
    unknown, // 500
}

// function to convert a ResultStore to a ResultHttp
export function resultStoreToResultHttp<T>(result: ResultStore<T>): ResultHttp<T> {
    if (result.ok) {
        return { ok: true, data: result.data }
    }
    switch (result.err!.code) {
        case StoreErrorCode.engineFault:
            return { ok: false, err: { status: 500, msg: [result.err!.msg!] } }
        case StoreErrorCode.connectionFault:
            return { ok: false, err: { status: 500, msg: [result.err!.msg!] } }
        case StoreErrorCode.invalidCredentials:
            return { ok: false, err: { status: 401, msg: [result.err!.msg!] } }
        case StoreErrorCode.unique:
            return { ok: false, err: { status: 422, msg: [result.err!.msg!] } }
        case StoreErrorCode.notFound:
            return { ok: false, err: { status: 404, msg: [result.err!.msg!] } }
        case StoreErrorCode.invalidInput:
            return { ok: false, err: { status: 400, msg: [result.err!.msg!] } }
        default:
            return { ok: false, err: { status: 500, msg: [result.err!.msg!] } }
    }
}
