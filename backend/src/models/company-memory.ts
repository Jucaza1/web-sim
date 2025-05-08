import { Company, CompanyCreate, CompanyIdName } from '../types/db'
import { CompanyStore } from "./company"
import { ResultStore, StoreErrorCode } from '../types/result'

function autoIncFn(): () => number {
    let id = 0
    return () => {
        id++
        return id
    }
}
export class CompanyMemoryStore implements CompanyStore {
    private companies: Map<number, Company>
    private autoInc: () => number
    constructor() {
        this.autoInc = autoIncFn()
        this.companies = new Map<number, Company>()
    }
    async getCompany(id: number): Promise<ResultStore<Company>> {
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
        const id = this.autoInc()
        if (this.companies.has(id)) {
            // User already exists
            return { ok: false, err: { code: StoreErrorCode.unique, msg: "company already exists" } }
        }
        const companyMemory: Company = { ...company, id, createdAt: new Date(), updatedAt: new Date() }
        this.companies.set(companyMemory.id, companyMemory)
        return { ok: true, data: company as Company }
    }
    async updateCompany(id: number, company: Partial<Company>): Promise<ResultStore<Company>> {
        const existingCompany = this.companies.get(id)
        if (!existingCompany) {
            return { ok: false, err: { code: StoreErrorCode.notFound, msg: "company not found" } }
        }
        const updatedCompany: Company = { ...existingCompany, updatedAt: new Date(), ...company }
        this.companies.set(id, updatedCompany)
        return { ok: true, data: updatedCompany }
    }
    async deleteCompany(id: number): Promise<ResultStore<Company>> {
        const resultCompany = await this.getCompany(id)
        if (resultCompany.ok) {
            this.companies.delete(id)
        }
        return resultCompany
    }
    async getCompaniesByUserId(_: number): Promise<ResultStore<Company[]>> {
        // not implemented
        return { ok: true, data: Array.from(this.companies.values()) }
    }
}
