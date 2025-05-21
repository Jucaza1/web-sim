import { Request, Response } from "express";
import { AuthServiceJWT } from "../services/auth-service";
import { UserCredentials } from "../types/credentials";
import { NextFunction } from "../types/express";

export class AuthController {
    private authService: AuthServiceJWT

    constructor(authService: AuthServiceJWT) {
        this.authService = authService
        this.authMiddleware = this.authMiddleware.bind(this)
        this.login = this.login.bind(this)
    }

    async login(req: Request, res: Response, next: NextFunction) {
        const userCred = req.body as UserCredentials
        const result = await this.authService.validateCredentialsForgeJWT(userCred)
        if (!result.ok) {
            next({ httpError: result.err!, exception: result.exception })
            return
        }
        res.setHeader("Authorization", result.data!)
        res.cookie("Authorization", result.data!, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            path: "/"
        })
        res.sendStatus(204)
    }
    async logout(_req: Request, res: Response, _next: NextFunction) {
        res.clearCookie('Authorization', {
            path: '/',
            httpOnly: true,
            sameSite: 'lax',
            secure: false
        })
        res.sendStatus(204)
    }

    async authMiddleware(req: Request, res: Response, next: NextFunction) {
        if (!req.cookies) {
            console.error({ status: 401, msg: ["no token present in cookies"] })
            res.status(401).json({ error: ["no token present in cookies"] })
            return
        }
        const token = req.cookies["Authorization"]
        if (token === undefined) {
            console.error({ status: 401, msg: ["no token present in cookies"] })
            res.status(401).json({ error: ["no token present in cookies"] })
            return
        }
        const result = await this.authService.validateJWT(token)
        if (!result.ok) {
            console.error(result.err)
            res.status(result.err!.status).json({ error: result.err!.msg })
            return
        }
        res.locals.payload = result.data!
        console.info(`--authMiddlware: decoded userId     : ${result.data!.id as number}`)
        // console.info(`--authMiddlware: decoded userRole   : ${result.data!.role as string}`)
        // console.info(`--authMiddlware: decoded userCompany: ${result.data!.company}`)
        next()
    }
}
