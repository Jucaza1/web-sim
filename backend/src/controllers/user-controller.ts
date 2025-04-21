import { NextFunction, Request, Response } from 'express'
import { UserService } from '../services/user-service'
import { UserCreateDTO, UserUpdateDTO } from '../types/validations'

export class UserController {
    private userService: UserService

    constructor(userService: UserService) {
        this.userService = userService
        this.getUser = this.getUser.bind(this)
        this.getUsers = this.getUsers.bind(this)
        this.createUser = this.createUser.bind(this)
        this.updateUser = this.updateUser.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
    }

    getUser(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id
        const result = this.userService.getUser(id)
        if (!result.ok) {
            next(result.err!)
            return
        }
        res.status(200).json(result.data)
        return
    }

    getUsers(_req: Request, res: Response, next: NextFunction) {
        const result = this.userService.getUsers()
        if (!result.ok) {
            next(result.err!)
            return
        }
        res.status(200).json(result.data)
        return
    }

    createUser(req: Request, res: Response, next: NextFunction) {
        const userParams = req.body as UserCreateDTO
        const userCreate : UserCreateDTO = {
            email: userParams.email,
            password: userParams.password,
            name: userParams.name,
            companyId: userParams.companyId,
            profession: userParams.profession,
        }
        const result = this.userService.createUser(userCreate)
        if (!result.ok) {
            next(result.err!)
            return
        }
        res.status(201).json(result.data)
        return
    }

    updateUser(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id
        const userParams = req.body as Partial<UserCreateDTO>
        const userUpdate : UserUpdateDTO = {
            name: userParams.name,
            email: userParams.email,
            password: userParams.password,
            companyId: userParams.companyId,
            profession: userParams.profession,
        }
        const result = this.userService.updateUser(id, userUpdate)
        if (!result.ok) {
            next(result.err!)
            return
        }
        res.status(200).json(result.data)
        return
    }

    deleteUser(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id
        const result = this.userService.deleteUser(id)
        if (!result.ok) {
            next(result.err!)
            return
        }
        res.status(200).json(result.data)
        return
    }
}
