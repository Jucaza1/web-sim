import { Request, Response } from 'express'
import { UserService } from '../services/user-service'
import { intCoerceSchema, UserCreateDTO, UserUpdateDTO } from '../types/validations'
import { NextFunction } from '../types/express'
import { User } from '../types/db'
import { ResultHttp } from '../types/result'
import { Payload } from '../types/jwtPayload'
import { DefaultUnAuthorizedError } from './defaultError'

export class UserController {
    private userService: UserService

    constructor(userService: UserService) {
        this.userService = userService
        this.getUser = this.getUser.bind(this)
        this.getUsers = this.getUsers.bind(this)
        this.createUser = this.createUser.bind(this)
        this.updateUser = this.updateUser.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
        this.getUsersByCompanyId = this.getUsersByCompanyId.bind(this)
        this.getUserByEmail = this.getUserByEmail.bind(this)
        this.createAdmin = this.createAdmin.bind(this)
        this.createAdminCompany = this.createAdminCompany.bind(this)
    }

    async getUser(req: Request, res: Response, next: NextFunction) {
        let payload = res.locals?.payload as Payload
        let result
        switch (payload?.role) {
            case "USER":
                result = await this.userService.getUser(payload.id ?? -1)
                break
            default:
                const id = req.params.id
                const intId = intCoerceSchema.safeParse(id)
                if (!intId.success) {
                    next({ httpError: { status: 400, msg: ["id is not valid"] } })
                    return
                }
                result = await this.userService.getUser(intId.data)
                break
        }
        if (!result.ok) {
            next({ httpError: result.err!, exception: result.exception })
            return
        }
        res.status(200).json(result.data)
        return
    }

    async getUsers(_req: Request, res: Response, next: NextFunction) {
        let result: ResultHttp<User[]> = { ok: false, data: undefined }
        switch (res.locals?.payload?.role) {
            case "USER":
                let resUser = await this.userService.getUser(res.locals.payload.id)
                result.data = (resUser.ok) ? [resUser.data!] : undefined
                result.ok = resUser.ok
                break
            case "ADMIN_COMPANY":
                result = await this.userService.getUsers()
                break
            case "ADMIN":
                result = await this.userService.getUsers()
                break
            default:
                next(DefaultUnAuthorizedError)
                return
        }
        if (!result.ok) {
            next({ httpError: result.err!, exception: result.exception })
            return
        }
        res.status(200).json(result.data)
        return
    }

    async createUser(req: Request, res: Response, next: NextFunction) {
        const userParams = req.body as UserCreateDTO
        const userCreate: UserCreateDTO = {
            email: userParams.email,
            password: userParams.password,
            name: userParams.name,
            companyId: userParams.companyId,
            profession: userParams.profession,
        }
        const result = await this.userService.createUser(userCreate, "USER")
        if (!result.ok) {
            next({ httpError: result.err!, exception: result.exception })
            return
        }
        res.status(201).json(result.data)
        return
    }

    async createAdmin(req: Request, res: Response, next: NextFunction) {
        let payload = res.locals?.payload as Payload
        if (payload?.role !== "ADMIN") {
            next(DefaultUnAuthorizedError)
            return
        }
        const userParams = req.body as UserCreateDTO
        const userCreate: UserCreateDTO = {
            email: userParams.email,
            password: userParams.password,
            name: userParams.name,
            companyId: userParams.companyId,
            profession: userParams.profession,
        }
        const result = await this.userService.createUser(userCreate, "ADMIN")
        if (!result.ok) {
            next({ httpError: result.err!, exception: result.exception })
            return
        }
        res.status(201).json(result.data)
        return
    }

    /**
     * Create a new user with ADMIN_COMPANY role, only accessible by ADMIN and
     * ADMIN_COMPANY
     */
    async createAdminCompany(req: Request, res: Response, next: NextFunction) {
        let payload = res.locals?.payload as Payload
        if (payload?.role !== "ADMIN" && payload?.role !== "ADMIN_COMPANY") {
            next(DefaultUnAuthorizedError)
            return
        }
        const userParams = req.body as UserCreateDTO
        const userCreate: UserCreateDTO = {
            email: userParams.email,
            password: userParams.password,
            name: userParams.name,
            companyId: userParams.companyId,
            profession: userParams.profession,
        }
        const result = await this.userService.createUser(userCreate, "ADMIN_COMPANY")
        if (!result.ok) {
            next({ httpError: result.err!, exception: result.exception })
            return
        }
        res.status(201).json(result.data)
        return
    }

    /**
     * Update a user, id only choosable by ADMIN, rest of roles can only update
     * themselves
     */
    async updateUser(req: Request, res: Response, next: NextFunction) {
        let payload = res.locals?.payload as Payload
        let idFinal: number
        switch (payload?.role) {
            case "USER":
                idFinal = payload.id ?? -1
                break
            case "ADMIN_COMPANY":
                idFinal = payload.id ?? -1
                break
            case "ADMIN":
                const id = req.params.id
                const intId = intCoerceSchema.safeParse(id)
                if (!intId.success) {
                    next({ httpError: { status: 400, msg: [intId.error.message] } })
                    return
                }
                idFinal = intId.data
                break
            default:
                next(DefaultUnAuthorizedError)
                return
        }
        const userParams = req.body as Partial<UserCreateDTO>
        const userUpdate: UserUpdateDTO = {
            name: userParams.name,
            email: userParams.email,
            password: userParams.password,
            companyId: userParams.companyId,
            profession: userParams.profession,
        }
        const result = await this.userService.updateUser(idFinal, userUpdate)
        if (!result.ok) {
            next({ httpError: result.err!, exception: result.exception })
            return
        }
        res.status(200).json(result.data)
        return
    }

    /**
     * Delete a user, id only choosable by ADMIN, rest of roles can only delete
     * themselves
     */
    async deleteUser(req: Request, res: Response, next: NextFunction) {
        let payload = res.locals?.payload as Payload
        let idFinal: number
        switch (payload?.role) {
            case "USER":
                idFinal = payload.id ?? -1
                break
            case "ADMIN_COMPANY":
                idFinal = payload.id ?? -1
                break
            case "ADMIN":
                const id = req.params.id
                const intId = intCoerceSchema.safeParse(id)
                if (!intId.success) {
                    next({ httpError: { status: 400, msg: [intId.error.message] } })
                    return
                }
                idFinal = intId.data
                break
            default:
                next(DefaultUnAuthorizedError)
                return
        }
        const result = await this.userService.deleteUser(idFinal)
        if (!result.ok) {
            next({ httpError: result.err!, exception: result.exception })
            return
        }
        res.status(200).json(result.data)
        return
    }

    /**
     * Get users by companyId, only accessible by ADMIN and ADMIN_COMPANY
     */
    async getUsersByCompanyId(req: Request, res: Response, next: NextFunction) {
        let payload = res.locals?.payload as Payload
        if (payload?.role !== "ADMIN" && payload?.role !== "ADMIN_COMPANY") {
            next(DefaultUnAuthorizedError)
            return
        }
        const companyId = req.params.id
        const intId = intCoerceSchema.safeParse(companyId)
        if (!intId.success) {
            next({ httpError: { status: 400, msg: [intId.error.message] } })
            return
        }
        const result = await this.userService.getUsersByCompanyId(intId.data)
        if (!result.ok) {
            next({ httpError: result.err!, exception: result.exception })
            return
        }
        res.status(200).json(result.data)
        return
    }

    /**
     * Get user by email, only accessible by ADMIN and ADMIN_COMPANY
     */
    async getUserByEmail(req: Request, res: Response, next: NextFunction) {
        let payload = res.locals?.payload as Payload
        if (payload?.role !== "ADMIN" && payload?.role !== "ADMIN_COMPANY") {
            next(DefaultUnAuthorizedError)
            return
        }
        const email = req.params.email
        const result = await this.userService.getUserByEmail(email)
        if (!result.ok) {
            next({ httpError: result.err!, exception: result.exception })
            return
        }
        res.status(200).json(result.data)
        return
    }
}
