import { User, UserCreate } from "../types/db"

export interface UserStore {
    getUser(id: string): User | null
    getUsers(): User[]
    createUser(user: UserCreate): User | null
    updateUser(id: string, user: Partial<User>): User | null
    deleteUser(id: string): User | null
    getUserByEmail(email: string): User | null
    getUsersByCompanyId(companyId: string): User[]
}
