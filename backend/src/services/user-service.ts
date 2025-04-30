import { z } from "zod";
import { UserStore } from "../models/user";
import { User } from "../types/db"
import { ResultHttp, resultStoreToResultHttp } from "../types/result";
import { UserCreateDTO, UserCreateDTOSchema, UserUpdateDTOSchema } from "../types/validations";
import { Hasher } from "./hashing";

export class UserService {
    private userStore: UserStore
    private hasher: Hasher
    constructor(uStore: UserStore, hasher: Hasher) {
        this.userStore = uStore
        this.hasher = hasher
    }
    async getUser(id: string): Promise<ResultHttp<User>> {
        if (!id || id.length === 0) {
            return { ok: false, err: { status: 400, msg: ["id is required"] } }
        }
        const validateResult = z.string().uuid().safeParse(id)
        if (!validateResult.success) {
            return { ok: false, err: { status: 400, msg: ["id is not valid"] } }
        }
        const result = await this.userStore.getUser(id)
        return resultStoreToResultHttp(result)
    }
    async getUserByEmail(email: string): Promise<ResultHttp<User>> {
        if (!email || email.length === 0) {
            return { ok: false, err: { status: 400, msg: ["email is required"] } }
        }
        const validateResult = UserCreateDTOSchema.shape.email.safeParse(email)
        if (!validateResult.success) {
            return { ok: false, err: { status: 400, msg: ["email is not valid"] } }
        }
        const result = await this.userStore.getUserByEmail(email)
        return resultStoreToResultHttp(result)
    }
    async getUsersByCompanyId(companyId: string): Promise<ResultHttp<User[]>> {
        if (!companyId || companyId.length === 0) {
            return {ok:false, err: { status: 400, msg: ["id is required"] } }
        }
        const validateResult = z.string().uuid().safeParse(companyId)
        if (!validateResult.success) {
            return { ok: false, err: { status: 400, msg: ["id is not valid"] } }
        }
        const result = await this.userStore.getUsersByCompanyId(companyId)
        return resultStoreToResultHttp(result)
    }
    async getUsers(): Promise<ResultHttp<User[]>> {
        const result = await this.userStore.getUsers()
        return resultStoreToResultHttp(result)
    }
    async createUser(user: UserCreateDTO): Promise<ResultHttp<User>> {
        const validateResult = UserCreateDTOSchema.safeParse(user)
        if (!validateResult.success) {
            return { ok: false, err: { status: 400, msg: validateResult.error.errors.map(e => e.message) } }
        }
        user.password = this.hasher.hash(user.password)
        const result = await this.userStore.createUser(user)
        return resultStoreToResultHttp(result)
    }
    async updateUser(id: string, user: Partial<UserCreateDTO>): Promise<ResultHttp<User>> {
        if (!id || id.length === 0) {
            return { ok: false, err: { status: 400, msg: ["id is required"] } }
        }
        const validateResult = UserUpdateDTOSchema.safeParse(user)
        if (!validateResult.success) {
            return { ok: false, err: { status: 400, msg: validateResult.error.errors.map(e => e.message) } }
        }
        if (user.password && user.password.length > 0) {
            user.password = this.hasher.hash(user.password)
        }
        const result = await this.userStore.updateUser(id, user)
        return resultStoreToResultHttp(result)
    }
    async deleteUser(id: string): Promise<ResultHttp<User>>{
        if (!id || id.length === 0) {
            return { ok: false, err: { status: 400, msg: ["id is required"] } }
        }
        const validateResult = z.string().uuid().safeParse(id)
        if (!validateResult.success) {
            return { ok: false, err: { status: 400, msg: ["id is not valid"] } }
        }
        const result = await this.userStore.deleteUser(id)
        return resultStoreToResultHttp(result)
    }

}
