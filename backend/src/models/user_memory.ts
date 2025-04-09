import { User, UserCreate } from "../types/db"
import { UserStore } from "./user"
import { randomUUID } from "crypto"

export class UserMemoryStore implements UserStore {
    private users: Map<string, User>
    constructor() {
        this.users = new Map()
        this.seedUsers(mockUsers)
    }
    getUserByEmail(email: string): User | null {
        for (const user of this.users.values()) {
            if (user.email === email) {
                return user
            }
        }
        return null
    }
    getUsersByCompanyId(companyId: string): User[] {
        const result: User[] = []
        for (const user of this.users.values()) {
            if (user.companyId === companyId) {
                result.push(user)
            }
        }
        return result
    }

    getUser(id: string): User | null {
        return this.users.get(id) || null
    }

    getUsers(): User[] {
        return Array.from(this.users.values())
    }

    createUser(user: UserCreate): User | null {
        user.id = randomUUID()
        if (this.users.has(user.id)) {
            // User already exists
            return null
        }
        this.users.set(user.id, user as User)
        return user as User
    }

    updateUser(id: string, user: Partial<User>): User | null {
        const existingUser = this.users.get(id)
        let updateData = null
        if (existingUser) {
            updateData = { ...existingUser, ...user }
            this.users.set(id, updateData)
        }
        return updateData
    }

    deleteUser(id: string): User | null {
        const resultUser = this.users.get(id) || null
        this.users.delete(id)
        return resultUser
    }

    seedUsers(users: User[]): void {
        users.forEach(user => {
            this.users.set(user.id, user)
        })
    }
}
// Mock data for testing
const mockUsers: User[] = [
    {
        id: "9db2bdc9-65a3-4a4f-8a5d-63e73454c3ce",
        name: "Alice",
        email: "alice@gmail.com",
        password: "hashed_password_1",
        createdAt: new Date("2025-01-01"),
        isActive: true,
        profession: "profession1",
        companyId: "company1",
    },
    {
        id: "524be767-9542-43ab-b456-5d369e75b909",
        name: "Bob",
        email: "Bob@gmail.com",
        password: "hashed_password_2",
        createdAt: new Date("2025-01-01"),
        isActive: true,
        profession: "profession2",
        companyId: "company1",
    },
    {
        id: "ab96de69-76c2-4a9c-9abb-2357aef22e3b",
        name: "Anna",
        email: "anna@gmail.com",
        password: "hashed_password_3",
        createdAt: new Date("2025-01-02"),
        isActive: true,
        profession: "profession1",
        companyId: "company2",
    },
]
