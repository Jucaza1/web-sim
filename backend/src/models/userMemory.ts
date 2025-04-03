import { User } from "@prisma/client";
import { UserStore } from "./user";

export class UserMemoryStore implements UserStore {
    private users: Map<string, User>
    constructor() {
        this.users = new Map();
        this.seedUsers(mockUsers);
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
        const result: User[] = [];
        for (const user of this.users.values()) {
            if (user.companyId === companyId) {
                result.push(user)
            }
        }
        return result;
    }

    getUser(id: string): User | null {
        return this.users.get(id) || null
    }

    getUsers(): User[] {
        return Array.from(this.users.values())
    }

    createUser(user: User): User | null {
        if (this.users.has(user.id)) {
            // User already exists
            return null
        }
        this.users.set(user.id, user)
        return user
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

    deleteUser(id: string): void {
        this.users.delete(id)
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
        id: "1",
        name: "Alice",
        email: "alice@gmail.com",
        password: "hashed_password_1",
        createdAt: new Date("2025-01-01"),
        isActive: true,
        profession: "profession1",
        companyId: "company1",
    },
    {
        id: "2",
        name: "Bob",
        email: "Bob@gmail.com",
        password: "hashed_password_2",
        createdAt: new Date("2025-01-01"),
        isActive: true,
        profession: "profession2",
        companyId: "company1",
    },
    {
        id: "3",
        name: "Anna",
        email: "anna@gmail.com",
        password: "hashed_password_3",
        createdAt: new Date("2025-01-02"),
        isActive: true,
        profession: "profession1",
        companyId: "company2",
    },
]
