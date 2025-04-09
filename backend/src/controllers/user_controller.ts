import { NextFunction, Request, Response } from 'express'
import { UserService } from '../services/user_service'
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
        const user = this.userService.getUser(id)
        if (!user) {
            next(new Error('User not found'))
            return
        }
        res.status(200).json(user)
        return
    }

    getUsers(_req: Request, res: Response, _next: NextFunction) {
        const users = this.userService.getUsers()
        res.status(200).json(users)
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
        const user = this.userService.createUser(userCreate)
        if (!user) {
            next(new Error('User already exists'))
            return
        }
        res.status(201).json(user)
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
        const user = this.userService.updateUser(id, userUpdate)
        if (!user) {
            next(new Error('User not found'))
            return
        }
        res.status(200).json(user)
        return
    }

    deleteUser(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id
        const user = this.userService.deleteUser(id)
        if (!user) {
            next(new Error('User not found'))
            return
        }
        res.status(200).json(user)
        return
    }
}
