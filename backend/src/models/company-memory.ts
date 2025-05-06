import { randomUUID } from 'crypto'
import { Company, CompanyCreate, CompanyIdName } from '../types/db'
import { CompanyStore } from "./company"
import { ResultStore, StoreErrorCode } from '../types/result'

export class CompanyMemoryStore implements CompanyStore {
    private companies: Map<string, Company>
    constructor() {
        this.companies = new Map<string, Company>()
    }
    async getCompany(id: string): Promise<ResultStore<Company>> {
        const company = this.companies.get(id)
        if (!company) {
            return { ok: false, err: { code: StoreErrorCode.notFound, msg: "company not found" } }
        }
        return { ok: true, data: company }
    }
    async getCompanies(): Promise<ResultStore<Company[]>> {
        const data = Array.from(this.companies.values())
        return { ok: true, data }
    }
    async getCompaniesIdName(): Promise<ResultStore<CompanyIdName[]>> {
        const data: CompanyIdName[] = Array.from(this.companies.entries()).map(([_, company]) => { return { id: company.id, name: company.name } })
        return { ok: true, data }
    }
    async createCompany(company: CompanyCreate): Promise<ResultStore<Company>> {
        company.id = randomUUID()
        if (this.companies.has(company.id)) {
            // User already exists
            return { ok: false, err: { code: StoreErrorCode.unique, msg: "company already exists" } }
        }
        this.companies.set(company.id, company as Company)
        return { ok: true, data: company as Company }
    }
    async updateCompany(id: string, company: Partial<Company>): Promise<ResultStore<Company>> {
        const existingCompany = this.companies.get(id)
        if (!existingCompany) {
            return { ok: false, err: { code: StoreErrorCode.notFound, msg: "company not found" } }
        }
        const updatedCompany: Company = { ...existingCompany, updatedAt: new Date(), ...company }
        this.companies.set(id, updatedCompany)
        return { ok: true, data: updatedCompany }
    }
    async deleteCompany(id: string): Promise<ResultStore<Company>> {
        const resultCompany = await this.getCompany(id)
        if (resultCompany.ok) {
            this.companies.delete(id)
        }
        return resultCompany
    }
    async getCompaniesByUserId(_: string): Promise<ResultStore<Company[]>> {
        // not implemented
        return { ok: true, data: Array.from(this.companies.values()) }
    }
}
