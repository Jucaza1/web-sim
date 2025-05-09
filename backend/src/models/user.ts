import { Role, User, UserCreate } from "../types/db"
import { ResultStore } from "../types/result"
import { UserMemoryStore } from "./user-memory"
import { UserPrismaStore } from "./user-prisma"
import { PrismaClientSingleton } from "./prisma-singleton"

export interface UserStore {
    getUser(id: number): Promise<ResultStore<User>>
    getUsers(): Promise<ResultStore<User[]>>
    createUser(user: UserCreate, role?: Role): Promise<ResultStore<User>>
    updateUser(id: number, user: Partial<User>): Promise<ResultStore<User>>
    deleteUser(id: number): Promise<ResultStore<User>>
    getUserByEmail(email: string): Promise<ResultStore<User>>
    getUsersByCompanyId(companyId: number): Promise<ResultStore<User[]>>
}

export function UserStoreFactory(kind: string, seed: boolean = false): UserStore {
    switch (kind) {
        case "memory":
            console.log("runing in-memory DB for user")
            return new UserMemoryStore(seed)
        case "postgresql":
            console.log("runing postgresql DB for user")
            return new UserPrismaStore(PrismaClientSingleton.getInstance())
        default:
            console.log("runing in-memory DB for user")
            return new UserMemoryStore(seed)
    }
}
