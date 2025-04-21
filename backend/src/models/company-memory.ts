import { randomUUID } from 'crypto'
import { Company, CompanyCreate } from '../types/db'
import { CompanyStore } from "./company"
import { ResultStore, StoreErrorCode } from '../types/result'

export class CompanyMemoryStore implements CompanyStore {
    private companies: Map<string, Company>
    constructor() {
        this.companies = new Map<string, Company>()
    }

    getCompany(id: string): ResultStore<Company> {
        const company = this.companies.get(id)
        if (!company) {
            return { ok: false, err: { code: StoreErrorCode.notFound, msg: "company not found" } }
        }
        return { ok: true, data: company }
    }

    getCompanies(): ResultStore<Company[]> {
        const data = Array.from(this.companies.values())
        return { ok: true, data }
    }
    createCompany(company: CompanyCreate): ResultStore<Company> {
        company.id = randomUUID()
        if (this.companies.has(company.id)) {
            // User already exists
            return { ok: false, err: { code: StoreErrorCode.unique, msg: "company already exists" } }
        }
        this.companies.set(company.id, company as Company)
        return { ok: true, data: company as Company }
    }
    updateCompany(id: string, company: Partial<Company>): ResultStore<Company> {
        const existingCompany = this.companies.get(id)
        if (!existingCompany) {
            return { ok: false, err: { code: StoreErrorCode.notFound, msg: "company not found" } }
        }
        const updatedCompany = { ...existingCompany, ...company }
        this.companies.set(id, updatedCompany)
        return { ok: true, data: updatedCompany }
    }
    deleteCompany(id: string): ResultStore<Company> {
        const resultCompany = this.getCompany(id)
        if (resultCompany.ok) {
            this.companies.delete(id)
        }
        return resultCompany
    }
    getCompaniesByUserId(_: string): ResultStore<Company[]> {
        // not implemented
        return { ok: true, data: Array.from(this.companies.values()) }
    }
}
