import { PrismaClient } from '@prisma/client'
// import { UserStore } from "./user"
import { User, UserCreate, UserCreatePrismaConverter } from '../types/db'

// export class UserPrismaStore implements UserStore {
export class UserPrismaStore {
    private client: PrismaClient
    constructor(client: PrismaClient) {
        this.client = client
    }
    getUser(id: string): User | null {
        let user = null
        this.client.user.findUnique({ where: { id } }).then((restult) => {
            if (!restult) {
                return
            }
            user = restult
        })
        return user
    }

    getUsers(): User[] {
        let users: User[] = []
        this.client.user.findMany().then((result) => {
            if (!result) {
                return
            }
            users = result
        })
        return users
    }

    createUser(user: UserCreate): User | null {
        // Check if the user already exists
        let existingUser = null
        this.client.user.findUnique({ where: { email: user.email } }).then((result) => {
            if (result) {
                existingUser = result
            }
        })
        if (existingUser) {
            // throw new Error('User already exists')
            return null
        }
        // Create the user
        let userResult = null
        let userPrisma = UserCreatePrismaConverter(user)
        this.client.user.create({ data: userPrisma }).then((result) => {
            if (!result) {
                return
            }
            userResult = result
        })
        return userResult
    }

    updateUser(id: string, user: Partial<User>): User | null {
        let userResult = null
        this.client.user.update({ where: { id }, data: user }).then((result) => {
            if (!result) {
                return
            }
            userResult = result
        })
        return userResult

    }

    deleteUser(id: string): User | null {
        let retulstUser = null
        this.client.user.delete({ where: { id } }).then((result) => {
            if (!result) {
                return
            }
            retulstUser = result
        })
        return retulstUser
    }
    getUserByEmail(email: string): User | null {
        let user = null
        this.client.user.findUnique({ where: { email } }).then((result) => {
            if (!result) {
                return
            }
            user = result
        })
        return user
    }
    getUsersByCompanyId(companyId: string): User[] {
        let users: User[] = []
        this.client.user.findMany({ where: { companyId } }).then((result) => {
            if (!result) {
                return
            }
            users = result
        })
        return users
    }
}
