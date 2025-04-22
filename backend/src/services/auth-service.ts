import jwt, { JwtPayload } from "jsonwebtoken"
import { UserService } from "./user-service"
import { UserCredentials, UserCredentialsSchema } from "../types/credentials"
import { ResultHttp } from "../types/result"
import { User } from "../types/db"
import { Hasher } from "./hashing"

export class AuthServiceJWT {
    private secret: string
    private userService: UserService
    private hasher: Hasher
    constructor(secret: string, userService: UserService, Hasher: Hasher) {
        this.secret = secret
        this.userService = userService
        this.hasher = Hasher
        this.validateJWT = this.validateJWT.bind(this)
        this.forgeJWT = this.forgeJWT.bind(this)
        this.validateCredentials = this.validateCredentials.bind(this)
    }
    validateCredentials(userCred: UserCredentials): ResultHttp<string> {
        const validateResult = UserCredentialsSchema.safeParse(userCred)
        if (!validateResult.success) {
            return { ok: false, err: { status: 400, msg: validateResult.error.errors.map(e => e.message) } }
        }
        const userResult = this.userService.getUserByEmail(userCred.email)
        if (!userResult.ok) {
            if (userResult.err!.status >= 500) {
                return { ok: false, err: userResult.err }
            }
            return { ok: false, err: { status: 401, msg: ["incorrect credentials"] } }
        }
        if (userCred.email !== userResult!.data!.email
            && !this.hasher.compare(userCred.password, userResult!.data!.password)) {
            return { ok: false, err: { status: 401, msg: ["incorrect credentials"] } }
        }
        return { ok: true, data: this.forgeJWT(userResult!.data!) }
    }
    forgeJWT(user: User): string {
        const payload = { id: user.id }
        return jwt.sign(payload, this.secret, { expiresIn: 3600 })
    }
    validateJWT(token: string): ResultHttp<jwt.JwtPayload> {
        if (token === "") {
            return { ok: false, err: { status: 401, msg: ["invalid token"] } }
        }
        let decoded: jwt.JwtPayload
        try {
            decoded = jwt.verify(token, this.secret) as JwtPayload
        } catch (_) {
            return { ok: false, err: { status: 401, msg: ["invalid token"] } }
        }
        const result = this.userService.getUser(decoded.id as string)
        if (!result.ok){
            return { ok: false, err: { status: 401, msg: ["invalid token"] } }
        }
        return { ok: true, data: decoded }
    }
}
