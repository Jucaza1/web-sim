import { Request, Response } from 'express'
import { UserService } from '../services/user-service'
import { intCoerceSchema, UserCreateDTO, UserUpdateDTO } from '../types/validations'
import { NextFunction } from '../types/express'

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
        const id = req.params.id
        const intId = intCoerceSchema.safeParse(id)
        if (!intId.success) {
            next({ httpError: { status: 400, msg: ["id is not valid"] } })
            return
        }
        const result = await this.userService.getUser(intId.data)
        if (!result.ok) {
            next({ httpError: result.err!, exception: result.exception })
            return
        }
        res.status(200).json(result.data)
        return
    }

    async getUsers(_req: Request, res: Response, next: NextFunction) {
        const result = await this.userService.getUsers()
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

    async createAdminCompany(req: Request, res: Response, next: NextFunction) {
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

    async updateUser(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id
        const intId = intCoerceSchema.safeParse(id)
        if (!intId.success) {
            next({ httpError: { status: 400, msg: [intId.error.message] } })
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
        const result = await this.userService.updateUser(intId.data, userUpdate)
        if (!result.ok) {
            next({ httpError: result.err!, exception: result.exception })
            return
        }
        res.status(200).json(result.data)
        return
    }

    async deleteUser(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id
        const intId = intCoerceSchema.safeParse(id)
        if (!intId.success) {
            next({ httpError: { status: 400, msg: [intId.error.message] } })
            return
        }
        const result = await this.userService.deleteUser(intId.data)
        if (!result.ok) {
            next({ httpError: result.err!, exception: result.exception })
            return
        }
        res.status(200).json(result.data)
        return
    }

    async getUsersByCompanyId(req: Request, res: Response, next: NextFunction) {
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

    async getUserByEmail(req: Request, res: Response, next: NextFunction) {
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
