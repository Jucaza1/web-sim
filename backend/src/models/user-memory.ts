import { User, UserCreate } from "../types/db"
import { ResultStore, StoreErrorCode } from "../types/result"
import { UserStore } from "./user"
import { randomUUID } from "crypto"

export class UserMemoryStore implements UserStore {
    private users: Map<string, User>
    constructor() {
        this.users = new Map()
        this.seedUsers(mockUsers)
    }
    getUserByEmail(email: string): ResultStore<User> {
        for (const user of this.users.values()) {
            if (user.email === email) {
                return { ok: true, data: user }
            }
        }
        return { ok: false, err: { code: StoreErrorCode.notFound, msg: "user not found" } }
    }
    getUsersByCompanyId(companyId: string): ResultStore<User[]> {
        const result: User[] = []
        for (const user of this.users.values()) {
            if (user.companyId === companyId) {
                result.push(user)
            }
        }
        return { ok: true, data: result }
    }

    getUser(id: string): ResultStore<User> {
        const user = this.users.get(id)
        if (!user) {
            return { ok: false, err: { code: StoreErrorCode.notFound, msg: "user not found" } }
        }
        return { ok: true, data: user }
    }

    getUsers(): ResultStore<User[]> {
        const data = Array.from(this.users.values())
        return { ok: true, data }
    }

    createUser(user: UserCreate): ResultStore<User> {
        user.id = randomUUID()
        if (this.users.has(user.id)) {
            // User already exists
            return { ok: false, err: { code: StoreErrorCode.unique, msg: "user already exists" } }
        }
        if ([...this.users.values()].some(existingUser => existingUser.email === user.email)) {
            return { ok: false, err: { code: StoreErrorCode.unique, msg: "email already exists" } }
        }
        this.users.set(user.id, user as User)
        return { ok: true, data: user as User }
    }

    updateUser(id: string, user: Partial<User>): ResultStore<User> {
        const existingUser = this.users.get(id)
        if (!existingUser) {
            return { ok: false, err: { code: StoreErrorCode.notFound, msg: "user not found" } }
        }
        const updateData = { ...existingUser, ...user }
        this.users.set(id, updateData)
        return { ok: true, data: updateData }
    }

    deleteUser(id: string): ResultStore<User> {
        const resultUser = this.users.get(id)
        if (!resultUser) {
            return { ok: false, err: { code: StoreErrorCode.notFound, msg: "user not found" } }
        }
        this.users.delete(id)
        return { ok: true, data: resultUser }
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
        password: "hashedpassword1",
        createdAt: new Date("2025-01-01"),
        isActive: true,
        profession: "profession1",
        companyId: "47202dbe-b5c7-4073-8b74-f96e93941496",
    },
    {
        id: "524be767-9542-43ab-b456-5d369e75b909",
        name: "Bob",
        email: "bob@gmail.com",
        password: "hashedpassword2",
        createdAt: new Date("2025-01-01"),
        isActive: true,
        profession: "profession2",
        companyId: "b637ce5c-d44a-4d6f-9912-992c109de929",
    },
    {
        id: "ab96de69-76c2-4a9c-9abb-2357aef22e3b",
        name: "Anna",
        email: "anna@gmail.com",
        password: "hashedpassword3",
        createdAt: new Date("2025-01-02"),
        isActive: true,
        profession: "profession1",
        companyId: "47202dbe-b5c7-4073-8b74-f96e93941496",
    },
]
