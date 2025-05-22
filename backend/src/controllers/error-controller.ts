import { ErrorRequestHandler, Response, Request, NextFunction } from "express"
import { HttpError } from "../types/result"
import logger from "../logger"

export const globalErrorHandler: ErrorRequestHandler = (
    // { httpError, exception }: { httpError: HttpError, exception: Error },
    error: any,
    req: Request,
    res: Response,
    _next: NextFunction
) => {

    if (error.httpError !== undefined) {
        //{ httpError, exception }: { httpError: HttpError, exception: Error } = error
        // console.error(error.httpError as HttpError)
        res.status(error.httpError.status ?? 500).json({ error: error.httpError.msg })
        logger.error({
            msg: 'http error',
            method: req.method,
            url: req.originalUrl,
            headers: req.headers,
            body: req.body,
            status: (error.httpError as HttpError).status,
            error: {
                message: (error.httpError as HttpError).msg,
                exception: error.exception as Error
            }
        })
        return
    }
    if (error.status !== undefined) {
        logger.error({
            msg: 'http',
            method: req.method,
            url: req.originalUrl,
            headers: req.headers,
            body: req.body,
            status: error.StatusCode as number,
            error: {
                message: error.type,
                exception: ""
            }
        })
        if (error.statusCode === 400) {
            res.status(error.statusCode as number).json({ error: "bad request" })
        } else {
            res.status(error.statusCode as number).json({ error: error.status })
        }
        return
    }
    if (error instanceof Error) {
        logger.error({
            msg: 'http',
            method: req.method,
            url: req.originalUrl,
            headers: req.headers,
            body: req.body,
            status: 500,
            error: {
                message: "unknown",
                exception: error
            }
        })
        res.status(500).json({ error: "internal server error" })
        return
    }
}
