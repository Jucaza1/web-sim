import { User, UserCreate } from "../types/db"
import { ResultStore } from "../types/result"

export interface UserStore {
    getUser(id: string): Promise<ResultStore<User>>
    getUsers(): Promise<ResultStore<User[]>>
    createUser(user: UserCreate): Promise<ResultStore<User>>
    updateUser(id: string, user: Partial<User>): Promise<ResultStore<User>>
    deleteUser(id: string): Promise<ResultStore<User>>
    getUserByEmail(email: string): Promise<ResultStore<User>>
    getUsersByCompanyId(companyId: string): Promise<ResultStore<User[]>>
}
}
