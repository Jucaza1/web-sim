import { PrismaClient } from '@prisma/client'
import { UserStore } from "./user"
import { User, UserCreate, UserCreatePrismaConverter } from '../types/db'
import { ResultStore, StoreErrorCode } from '../types/result'
import { prismaCatchToStoreError } from '../types/exceptions'

export class UserPrismaStore implements UserStore {
    private client: PrismaClient
    constructor(client: PrismaClient) {
        this.client = client
        this.getUsers = this.getUsers.bind(this)
        this.getUser = this.getUser.bind(this)
        this.createUser = this.createUser.bind(this)
        this.updateUser = this.updateUser.bind(this)
        this.deleteUser = this.deleteUser.bind(this)
        this.getUserByEmail = this.getUserByEmail.bind(this)
        this.getUsersByCompanyId = this.getUsersByCompanyId.bind(this)
    }
    getUser(id: string): ResultStore<User> {
        let user
        try {
            this.client.user.findUnique({ where: { id } }).then((restult) => {
                if (!restult) {
                    return
                }
                user = restult
            })
        } catch (e) {
            return { ok: false, err: { code: prismaCatchToStoreError(e), msg: "internal server error" } }
        }
        if (!user) {
            return { ok: false, err: { code: StoreErrorCode.notFound, msg: "user not found" } }
        }
        return { ok: true, data: user }
    }

    getUsers(): ResultStore<User[]> {
        let users: User[] = []
        try {
            this.client.user.findMany().then((result) => {
                if (!result) {
                    return
                }
                users = result
            })
        } catch (e) {
            return { ok: false, err: { code: prismaCatchToStoreError(e), msg: "internal server error" } }
        }
        return { ok: true, data: users }
    }

    createUser(user: UserCreate): ResultStore<User> {
        // Check if the user already exists
        let existingUser = null
        try {
            this.client.user.findUnique({ where: { email: user.email } }).then((result) => {
                if (result) {
                    existingUser = result
                }
            })
        } catch (e) {
            return { ok: false, err: { code: prismaCatchToStoreError(e), msg: "internal server error" } }
        }
        if (existingUser) {
            // throw new Error('User already exists')
            return { ok: false, err: { code: StoreErrorCode.unique, msg: "user already exists" } }
        }
        // Create the user
        let userResult: User | undefined
        let userPrisma = UserCreatePrismaConverter(user)
        try {
            this.client.user.create({ data: userPrisma }).then((result) => {
                if (!result) {
                    return
                }
                userResult = result
            })
        } catch (e) {
            return { ok: false, err: { code: prismaCatchToStoreError(e), msg: "internal server error" } }
        }
        if (!userResult) {
            return { ok: false, err: { code: StoreErrorCode.unknown, msg: "internal server error" } }
        }
        return { ok: true, data: userResult as User }
    }

    updateUser(id: string, user: Partial<User>): ResultStore<User> {
        let userResult: User | undefined
        try {
            this.client.user.update({ where: { id }, data: user }).then((result) => {
                if (!result) {
                    return
                }
                userResult = result
            })
        } catch (e) {
            return { ok: false, err: { code: prismaCatchToStoreError(e), msg: "internal server error" } }
        }
        if (!userResult) {
            return { ok: false, err: { code: StoreErrorCode.unique, msg: "user already exists" } }
        }
        return { ok: true, data: userResult }
    }

    deleteUser(id: string): ResultStore<User> {
        let userResult: User | undefined
        try {
            this.client.user.delete({ where: { id } }).then((result) => {
                if (!result) {
                    return
                }
                userResult = result
            })
        } catch (e) {
            return { ok: false, err: { code: prismaCatchToStoreError(e), msg: "internal server error" } }
        }
        if (!userResult) {
            return { ok: false, err: { code: StoreErrorCode.notFound, msg: "user not found" } }
        }
        return { ok: true, data: userResult }
    }
    getUserByEmail(email: string): ResultStore<User> {
        let user: User | undefined
        try {
            this.client.user.findUnique({ where: { email } }).then((result) => {
                if (!result) {
                    return
                }
                user = result
            })
        } catch (e) {
            return { ok: false, err: { code: prismaCatchToStoreError(e), msg: "internal server error" } }
        }
        if (!user) {
            return { ok: false, err: { code: StoreErrorCode.notFound, msg: "user not found" } }
        }
        return { ok: true, data: user }
    }
    getUsersByCompanyId(companyId: string): ResultStore<User[]> {
        let users: User[] = []
        try {
            this.client.user.findMany({ where: { companyId } }).then((result) => {
                if (!result) {
                    return
                }
                users = result
            })
        } catch (e) {
            return { ok: false, err: { code: prismaCatchToStoreError(e), msg: "internal server error" } }
        }
        return { ok: true, data: users }
    }
}
