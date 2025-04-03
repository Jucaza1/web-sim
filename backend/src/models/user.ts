import { User } from "@prisma/client"

export interface UserStore {
    getUser(id: string): User | null;
    getUsers(): User[];
    createUser(user: User): User | null;
    updateUser(id: string, user: Partial<User>): User | null;
    deleteUser(id: string): void;
    getUserByEmail(email: string): User | null;
    getUsersByCompanyId(companyId: string): User[];
}
