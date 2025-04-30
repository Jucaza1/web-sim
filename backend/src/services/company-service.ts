import { z } from "zod";
import { CompanyStore } from "../models/company";
import { Company } from "../types/db";
import { ResultHttp, resultStoreToResultHttp } from "../types/result";
import { CompanyCreateDTO, CompanyCreateDTOSchema, CompanyUpdateDTOSchema } from "../types/validations";

export class CompanyService {
    private companyStore: CompanyStore
    constructor(cStore: CompanyStore) {
        this.companyStore = cStore
    }
    async getCompany(id: string): Promise<ResultHttp<Company>> {
        if (!id || id.length === 0) {
            return { ok: false, err: { status: 400, msg: ["id is required"] } }
        }
        const validateResult = z.string().uuid().safeParse(id)
        if (!validateResult.success) {
            return { ok: false, err: { status: 400, msg: ["id is not valid"] } }
        }
        const result = await this.companyStore.getCompany(id)
        return resultStoreToResultHttp(result)
    }
    async getCompanies(): Promise<ResultHttp<Company[]>> {
        const result = await this.companyStore.getCompanies()
        return resultStoreToResultHttp(result)
    }
    async createCompany(company: CompanyCreateDTO): Promise<ResultHttp<Company>> {
        const validateResult = CompanyCreateDTOSchema.safeParse(company)
        if (!validateResult.success) {
            return { ok: false, err: { status: 400, msg: validateResult.error.errors.map(e => e.message) } }
        }
        const result = await this.companyStore.createCompany(company)
        return resultStoreToResultHttp(result)
    }
    async updateCompany(id: string, company: Partial<CompanyCreateDTO>): Promise<ResultHttp<Company>> {
        if (!id || id.length === 0) {
            return { ok: false, err: { status: 400, msg: ["id is required"] } }
        }
        const validateResult = CompanyUpdateDTOSchema.safeParse(company)
        if (!validateResult.success) {
            return { ok: false, err: { status: 400, msg: validateResult.error.errors.map(e => e.message) } }
        }
        const result = await this.companyStore.updateCompany(id, company)
        return resultStoreToResultHttp(result)
    }
    async deleteCompany(id: string): Promise<ResultHttp<Company>>{
        if (!id || id.length === 0) {
            return { ok: false, err: { status: 400, msg: ["id is required"] } }
        }
        const validateResult = z.string().uuid().safeParse(id)
        if (!validateResult.success) {
            return { ok: false, err: { status: 400, msg: ["id is not valid"] } }
        }
        const result = await this.companyStore.deleteCompany(id)
        return resultStoreToResultHttp(result)
    }
}
