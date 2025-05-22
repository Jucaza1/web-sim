import { Role, User, UserCreate, UserUpdate } from "../types/db"
import { ResultStore } from "../types/result"
import { UserMemoryStore } from "./user-memory"
import { UserPrismaStore } from "./user-prisma"
import { PrismaClientSingleton } from "./prisma-singleton"
import logger from "../logger"

export interface UserStore {
    getUser(id: number): Promise<ResultStore<User>>
    getUsers(): Promise<ResultStore<User[]>>
    createUser(user: UserCreate, role?: Role): Promise<ResultStore<User>>
    updateUser(id: number, user: UserUpdate): Promise<ResultStore<User>>
    deleteUser(id: number): Promise<ResultStore<User>>
    getUserByEmail(email: string): Promise<ResultStore<User>>
    getUsersByCompanyId(companyId: number): Promise<ResultStore<User[]>>
}

export function UserStoreFactory(kind: string, seed: boolean = false): UserStore {
    switch (kind) {
        case "memory":
            logger.debug("runing in-memory DB for user")
            return new UserMemoryStore(seed)
        case "postgresql":
            logger.debug("runing postgresql DB for user")
            return new UserPrismaStore(PrismaClientSingleton.getInstance())
        default:
            logger.debug("runing in-memory DB for user")
            return new UserMemoryStore(seed)
    }
}
