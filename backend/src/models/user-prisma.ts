import { PrismaClient } from '@prisma/client'
import { UserStore } from "./user"
import { Role, User, UserCreate, UserCreatePrismaConverter, UserUpdate, UserUpdatePrismaConverter } from '../types/db'
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
    async getUser(id: number): Promise<ResultStore<User>> {
        let user: User | null
        try {
            user = await this.client.user.findUnique({ where: { id } })
        } catch (e) {
            return { ok: false, err: { code: prismaCatchToStoreError(e), msg: "internal server error" }, exception: e as Error }
        }
        if (!user) {
            return { ok: false, err: { code: StoreErrorCode.notFound, msg: "user not found" } }
        }
        return { ok: true, data: user }
    }

    async getUsers(): Promise<ResultStore<User[]>> {
        let users: User[] = []
        try {
            users = await this.client.user.findMany()
        } catch (e) {
            return { ok: false, err: { code: prismaCatchToStoreError(e), msg: "internal server error" }, exception: e as Error }
        }
        return { ok: true, data: users }
    }

    async createUser(user: UserCreate, role: Role = "USER"): Promise<ResultStore<User>> {
        // Check if the user already exists
        let existingUser: User | null
        try {
            existingUser = await this.client.user.findUnique({ where: { email: user.email } })
        } catch (e) {
            return { ok: false, err: { code: prismaCatchToStoreError(e), msg: "internal server error" }, exception: e as Error }
        }
        if (existingUser) {
            return { ok: false, err: { code: StoreErrorCode.unique, msg: "user already exists" } }
        }
        // Create the user
        let userResult: User | undefined
        let userPrisma = UserCreatePrismaConverter(user, role)
        try {
            userResult = await this.client.user.create({ data: userPrisma })
        } catch (e) {
            return { ok: false, err: { code: prismaCatchToStoreError(e), msg: "internal server error" }, exception: e as Error }
        }
        if (!userResult) {
            return { ok: false, err: { code: StoreErrorCode.unknown, msg: "internal server error" } }
        }
        return { ok: true, data: userResult as User }
    }

    async updateUser(id: number, user: UserUpdate): Promise<ResultStore<User>> {
        let userResult: User | null
        const userPrisma = UserUpdatePrismaConverter(user)
        try {
            // TODO: check if id field collides in data
            userResult = await this.client.user.update({ where: { id }, data: userPrisma })
        } catch (e) {
            return { ok: false, err: { code: prismaCatchToStoreError(e), msg: "internal server error" }, exception: e as Error }
        }
        if (!userResult) {
            return { ok: false, err: { code: StoreErrorCode.unique, msg: "user already exists" } }
        }
        return { ok: true, data: userResult }
    }

    async deleteUser(id: number): Promise<ResultStore<User>> {
        let userResult: User | null
        try {
            userResult = await this.client.user.delete({ where: { id } })
        } catch (e) {
            return { ok: false, err: { code: prismaCatchToStoreError(e), msg: "internal server error" }, exception: e as Error }
        }
        if (!userResult) {
            return { ok: false, err: { code: StoreErrorCode.notFound, msg: "user not found" } }
        }
        return { ok: true, data: userResult }
    }
    async getUserByEmail(email: string): Promise<ResultStore<User>> {
        let user: User | null
        try {
            user = await this.client.user.findUnique({ where: { email } })
        } catch (e) {
            return { ok: false, err: { code: prismaCatchToStoreError(e), msg: "internal server error" }, exception: e as Error }
        }
        if (!user) {
            return { ok: false, err: { code: StoreErrorCode.notFound, msg: "user not found" } }
        }
        return { ok: true, data: user }
    }
    async getUsersByCompanyId(companyId: number): Promise<ResultStore<User[]>> {
        let users: User[] = []
        try {
            users = await this.client.user.findMany({ where: { companyId } })
        } catch (e) {
            return { ok: false, err: { code: prismaCatchToStoreError(e), msg: "internal server error" }, exception: e as Error }
        }
        return { ok: true, data: users }
    }
}
