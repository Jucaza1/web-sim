import { Role, User, UserCreate } from "../types/db"
import { ResultStore, StoreErrorCode } from "../types/result"
import { UserStore } from "./user"

function autoIncFn(): () => number {
    let id = 1
    return function () {
        return id++
    }
}

export class UserMemoryStore implements UserStore {
    private users: Map<number, User>
    private autoInc: () => number

    constructor(seed: boolean = false) {
        this.autoInc = autoIncFn()
        this.users = new Map()
        if (seed) {
            this.seedUsers(mockUsers)
        }
    }

    async getUserByEmail(email: string): Promise<ResultStore<User>> {
        for (const user of this.users.values()) {
            if (user.email === email) {
                return { ok: true, data: user }
            }
        }
        return { ok: false, err: { code: StoreErrorCode.notFound, msg: "user not found" } }
    }

    async getUsersByCompanyId(companyId: number): Promise<ResultStore<User[]>> {
        const result: User[] = []
        for (const user of this.users.values()) {
            if (user.companyId === companyId) {
                result.push(user)
            }
        }
        return { ok: true, data: result }
    }

    async getUser(id: number): Promise<ResultStore<User>> {
        const user = this.users.get(id)
        if (!user) {
            return { ok: false, err: { code: StoreErrorCode.notFound, msg: "user not found" } }
        }
        return { ok: true, data: user }
    }

    async getUsers(): Promise<ResultStore<User[]>> {
        const data = Array.from(this.users.values())
        return { ok: true, data }
    }

    async createUser(user: UserCreate, role: Role = "USER"): Promise<ResultStore<User>> {
        const id = this.autoInc()
        if (this.users.has(id)) {
            // User already exists
            return { ok: false, err: { code: StoreErrorCode.unique, msg: "user already exists" } }
        }
        if ([...this.users.values()].some(existingUser => existingUser.email === user.email)) {
            return { ok: false, err: { code: StoreErrorCode.unique, msg: "email already exists" } }
        }
        const companyId = user.companyId ?? null
        const userwithComplete: User = {
            ...user,
            isActive: true,
            companyId: companyId,
            id: id,
            createdAt: new Date(),
            updatedAt: new Date(),
            role: role,
        }
        this.users.set(id, userwithComplete )
        return { ok: true, data: userwithComplete }
    }

    async updateUser(id: number, user: Partial<User>): Promise<ResultStore<User>> {
        const existingUser = this.users.get(id)
        if (!existingUser) {
            return { ok: false, err: { code: StoreErrorCode.notFound, msg: "user not found" } }
        }
        if ([...this.users.values()].some(existingUser => existingUser.email === user.email)) {
            return { ok: false, err: { code: StoreErrorCode.unique, msg: "email already exists" } }
        }
        const updateData: User = { ...existingUser, updatedAt: new Date(), ...user }
        this.users.set(id, updateData)
        return { ok: true, data: updateData }
    }

    async deleteUser(id: number): Promise<ResultStore<User>> {
        const resultUser = this.users.get(id)
        if (!resultUser) {
            return { ok: false, err: { code: StoreErrorCode.notFound, msg: "user not found" } }
        }
        this.users.delete(id)
        return { ok: true, data: resultUser }
    }

    seedUsers(users: User[]) {
        users.forEach(user => {
            this.users.set(user.id, user)
        })
    }
}
// Mock data for testing
const mockUsers: User[] = [
    {
        id: 1,
        name: "Alice",
        email: "alice@gmail.com",
        password: "hashedpassword1",
        createdAt: new Date("2025-01-01"),
        isActive: true,
        profession: "profession1",
        companyId: 1,
        updatedAt: new Date("2025-01-01"),
        role: "USER",
    },
    {
        id: 2,
        name: "Bob",
        email: "bob@gmail.com",
        password: "hashedpassword2",
        createdAt: new Date("2025-01-01"),
        isActive: true,
        profession: "profession2",
        companyId: 2,
        updatedAt: new Date("2025-01-01"),
        role: "ADMIN",
    },
    {
        id: 3,
        name: "Anna",
        email: "anna@gmail.com",
        password: "hashedpassword3",
        createdAt: new Date("2025-01-02"),
        isActive: true,
        profession: "profession1",
        companyId: 1,
        updatedAt: new Date("2025-01-02"),
        role: "ADMIN_COMPANY"
    },
]
