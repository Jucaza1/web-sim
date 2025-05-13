import { CompanyStore } from "../models/company";
import { Company, CompanyIdName } from "../types/db";
import { ResultHttp, resultStoreToResultHttp } from "../types/result";
import { CompanyCreateDTO, CompanyCreateDTOSchema, CompanyUpdateDTOSchema, idSchema } from "../types/validations";

export class CompanyService {
    private companyStore: CompanyStore
    constructor(cStore: CompanyStore) {
        this.companyStore = cStore
    }
    async getCompany(id: number): Promise<ResultHttp<Company>> {
        const validateResult = idSchema.safeParse(id)
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
    async getCompaniesIdName(): Promise<ResultHttp<CompanyIdName[]>> {
        const result = await this.companyStore.getCompaniesIdName()
        return resultStoreToResultHttp(result)
    }
    async createCompany(company: CompanyCreateDTO): Promise<ResultHttp<Company>> {
        const validateResult = CompanyCreateDTOSchema.safeParse(company)
        if (!validateResult.success) {
            return { ok: false, err: { status: 400, msg: validateResult.error.errors.map(e => [e.path,e.message].join(" : ")) } }
        }
        const result = await this.companyStore.createCompany(company)
        return resultStoreToResultHttp(result)
    }
    async updateCompany(id: number, company: Partial<CompanyCreateDTO>): Promise<ResultHttp<Company>> {
        const validateResultId = idSchema.safeParse(id)
        if (!validateResultId.success) {
            return { ok: false, err: { status: 400, msg: ["id is not valid"] } }
        }
        const validateResult = CompanyUpdateDTOSchema.safeParse(company)
        if (!validateResult.success) {
            return { ok: false, err: { status: 400, msg: validateResult.error.errors.map(e => [e.path,e.message].join(" : ")) } }
        }
        const result = await this.companyStore.updateCompany(id, company)
        return resultStoreToResultHttp(result)
    }
    async deleteCompany(id: number): Promise<ResultHttp<Company>> {
        const validateResult = idSchema.safeParse(id)
        if (!validateResult.success) {
            return { ok: false, err: { status: 400, msg: ["id is not valid"] } }
        }
        const result = await this.companyStore.deleteCompany(id)
        return resultStoreToResultHttp(result)
    }
}
