import { UserStore } from "../models/user";
import { User } from "../types/db"
import { UserCreateDTO, UserCreateDTOSchema } from "../types/validations";

export class UserService {
    private userStore: UserStore
    constructor(uStore : UserStore){
        this.userStore = uStore
    }
    getUser(id: string): User | null {
        if (!id || id.length === 0) {
            return null
        }
        return this.userStore.getUser(id)
    }
    getUserByEmail(email: string): User | null {
        if (!email || email.length === 0) {
            return null
        }
        return this.userStore.getUserByEmail(email)
    }
    getUsersByCompanyId(companyId: string): User[] {
        if (!companyId || companyId.length === 0) {
            return []
        }
        return this.userStore.getUsersByCompanyId(companyId)
    }
    getUsers(): User[] {
        return this.userStore.getUsers()
    }
    createUser(user: UserCreateDTO): User | null {
        const result = UserCreateDTOSchema.safeParse(user)
        if (!result.success) {
            return null
        }
        // user.password = HashPassword(user.password)
        return this.userStore.createUser(user)
    }
    updateUser(id: string, user: Partial<UserCreateDTO>): User | null {
        if (!id || id.length === 0) {
            return null
        }
        const result = UserCreateDTOSchema.safeParse(user)
        if (!result.success) {
            return null
        }
        if (user.password && user.password.length > 0) {
            // user.password = HashPassword(user.password)
        }
        return this.userStore.updateUser(id, user)
    }
    deleteUser(id: string): User | null {
        if (!id || id.length === 0) {
            return null
        }
        return this.userStore.deleteUser(id)
    }

}
