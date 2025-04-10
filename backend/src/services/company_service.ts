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
    getCompany(id: string): ResultHttp<Company> {
        if (!id || id.length === 0) {
            return { ok: false, err: { status: 400, msg: ["id is required"] } }
        }
        const validateResult = z.string().uuid().safeParse(id)
        if (!validateResult.success) {
            return { ok: false, err: { status: 400, msg: ["id is not valid"] } }
        }
        const result = this.companyStore.getCompany(id)
        return resultStoreToResultHttp(result)
    }
    getCompanies(): ResultHttp<Company[]> {
        const result = this.companyStore.getCompanies()
        return resultStoreToResultHttp(result)
    }
    createCompany(company: CompanyCreateDTO): ResultHttp<Company> {
        const validateResult = CompanyCreateDTOSchema.safeParse(company)
        if (!validateResult.success) {
            return { ok: false, err: { status: 400, msg: validateResult.error.errors.map(e => e.message) } }
        }
        const result = this.companyStore.createCompany(company)
        return resultStoreToResultHttp(result)
    }
    updateCompany(id: string, company: Partial<CompanyCreateDTO>): ResultHttp<Company> {
        if (!id || id.length === 0) {
            return { ok: false, err: { status: 400, msg: ["id is required"] } }
        }
        const validateResult = CompanyUpdateDTOSchema.safeParse(company)
        if (!validateResult.success) {
            return { ok: false, err: { status: 400, msg: validateResult.error.errors.map(e => e.message) } }
        }
        const result = this.companyStore.updateCompany(id, company)
        return resultStoreToResultHttp(result)
    }
    deleteCompany(id: string): ResultHttp<Company>{
        if (!id || id.length === 0) {
            return { ok: false, err: { status: 400, msg: ["id is required"] } }
        }
        const validateResult = z.string().uuid().safeParse(id)
        if (!validateResult.success) {
            return { ok: false, err: { status: 400, msg: ["id is not valid"] } }
        }
        const result = this.companyStore.deleteCompany(id)
        return resultStoreToResultHttp(result)
    }
}
