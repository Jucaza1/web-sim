import { z } from "zod";
import { UserStore } from "../models/user";
import { User } from "../types/db"
import { ResultHttp, resultStoreToResultHttp } from "../types/result";
import { UserCreateDTO, UserCreateDTOSchema } from "../types/validations";

export class UserService {
    private userStore: UserStore
    constructor(uStore: UserStore) {
        this.userStore = uStore
    }
    getUser(id: string): ResultHttp<User> {
        if (!id || id.length === 0) {
            return { ok: false, err: { status: 400, msg: ["id is required"] } }
        }
        const validateResult = z.string().uuid().safeParse(id)
        if (!validateResult.success) {
            return { ok: false, err: { status: 400, msg: ["id is not valid"] } }
        }
        const result = this.userStore.getUser(id)
        return resultStoreToResultHttp(result)
    }
    getUserByEmail(email: string): ResultHttp<User> {
        if (!email || email.length === 0) {
            return { ok: false, err: { status: 400, msg: ["email is required"] } }
        }
        const validateResult = UserCreateDTOSchema.shape.email.safeParse(email)
        if (!validateResult.success) {
            return { ok: false, err: { status: 400, msg: ["email is not valid"] } }
        }
        const result = this.userStore.getUserByEmail(email)
        return resultStoreToResultHttp(result)
    }
    getUsersByCompanyId(companyId: string): ResultHttp<User[]> {
        if (!companyId || companyId.length === 0) {
            return {ok:false, err: { status: 400, msg: ["id is required"] } }
        }
        const validateResult = z.string().uuid().safeParse(companyId)
        if (!validateResult.success) {
            return { ok: false, err: { status: 400, msg: ["id is not valid"] } }
        }
        const result = this.userStore.getUsersByCompanyId(companyId)
        return resultStoreToResultHttp(result)
    }
    getUsers(): ResultHttp<User[]> {
        const result = this.userStore.getUsers()
        return resultStoreToResultHttp(result)
    }
    createUser(user: UserCreateDTO): ResultHttp<User> {
        const validateResult = UserCreateDTOSchema.safeParse(user)
        if (!validateResult.success) {
            return { ok: false, err: { status: 400, msg: validateResult.error.errors.map(e => e.message) } }
        }
        // user.password = HashPassword(user.password)
        const result = this.userStore.createUser(user)
        return resultStoreToResultHttp(result)
    }
    updateUser(id: string, user: Partial<UserCreateDTO>): ResultHttp<User> {
        if (!id || id.length === 0) {
            return { ok: false, err: { status: 400, msg: ["id is required"] } }
        }
        const validateResult = UserCreateDTOSchema.safeParse(user)
        if (!validateResult.success) {
            return { ok: false, err: { status: 400, msg: validateResult.error.errors.map(e => e.message) } }
        }
        if (user.password && user.password.length > 0) {
            // user.password = HashPassword(user.password)
        }
        const result = this.userStore.updateUser(id, user)
        return resultStoreToResultHttp(result)
    }
    deleteUser(id: string): ResultHttp<User>{
        if (!id || id.length === 0) {
            return { ok: false, err: { status: 400, msg: ["id is required"] } }
        }
        const validateResult = z.string().uuid().safeParse(id)
        if (!validateResult.success) {
            return { ok: false, err: { status: 400, msg: ["id is not valid"] } }
        }
        const result = this.userStore.deleteUser(id)
        return resultStoreToResultHttp(result)
    }

}
