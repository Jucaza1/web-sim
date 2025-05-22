import { Request, Response } from "express";
import { AuthServiceJWT } from "../services/auth-service";
import { UserCredentials } from "../types/credentials";
import { NextFunction } from "../types/express";
import { Logger } from "pino"

export class AuthController {
    private authService: AuthServiceJWT
    private logger: Logger

    constructor(authService: AuthServiceJWT, logger: Logger) {
        this.authService = authService
        this.authMiddleware = this.authMiddleware.bind(this)
        this.login = this.login.bind(this)
        this.logger = logger
    }

    async login(req: Request, res: Response, next: NextFunction) {
        const userCred = req.body as UserCredentials
        const result = await this.authService.validateCredentialsForgeJWT(userCred)
        if (!result.ok) {
            next({ httpError: result.err!, exception: result.exception })
            return
        }
        res.setHeader("Authorization", result.data!)
        res.sendStatus(204)
    }

    async authMiddleware(req: Request, res: Response, next: NextFunction) {
        if (!req.cookies) {
            this.logger.error({ status: 401, msg: ["no token present in cookies"] })
            res.status(401).json({ error: ["no token present in cookies"] })
            return
        }
        const token = req.cookies["Authorization"]
        if (token === undefined) {
            this.logger.error({ status: 401, msg: ["no token present in cookies"] })
            res.status(401).json({ error: ["no token present in cookies"] })
            return
        }
        const result = await this.authService.validateJWT(token)
        if (!result.ok) {
            this.logger.error(result.err)
            res.status(result.err!.status).json({ error: result.err!.msg })
            return
        }
        res.locals.payload = result.data!
        this.logger.debug(result.data, "JWT")
        // console.info(`--authMiddlware: decoded userId     : ${result.data!.id as number}`)
        // console.info(`--authMiddlware: decoded userRole   : ${result.data!.role as string}`)
        // console.info(`--authMiddlware: decoded userCompany: ${result.data!.company}`)
        next()
    }
}
