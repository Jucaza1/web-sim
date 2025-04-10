import { User, UserCreate } from "../types/db"
import { ResultStore } from "../types/result"

export interface UserStore {
    getUser(id: string): ResultStore<User>
    getUsers(): ResultStore<User[]>
    createUser(user: UserCreate): ResultStore<User>
    updateUser(id: string, user: Partial<User>): ResultStore<User>
    deleteUser(id: string): ResultStore<User>
    getUserByEmail(email: string): ResultStore<User>
    getUsersByCompanyId(companyId: string): ResultStore<User[]>
}
