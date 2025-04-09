import { randomUUID } from 'crypto'
import { Company, CompanyCreate } from '../types/db'
import { CompanyStore } from "./company"

export class CompanyMemoryStore implements CompanyStore {
    private companies: Map<string, Company>
    constructor() {
        this.companies = new Map<string, Company>()
    }

    getCompany(id: string): Company | null {
        return this.companies.get(id) || null
    }

    getCompanies(): Company[] {
        return Array.from(this.companies.values())
    }
    createCompany(company: CompanyCreate): Company | null {
        company.id = randomUUID()
        if (this.companies.has(company.id)) {
            return null
        }
        this.companies.set(company.id, company as Company)
        return company as Company
    }
    updateCompany(id: string, company: Partial<Company>): Company | null {
        const existingCompany = this.getCompany(id)
        if (!existingCompany) {
            return null
        }
        const updatedCompany = { ...existingCompany, ...company }
        this.companies.set(id, updatedCompany)
        return updatedCompany
    }
    deleteCompany(id: string): Company | null {
        const resultCompany = this.getCompany(id)
        this.companies.delete(id)
        return resultCompany
    }
    getCompaniesByUserId(_: string): Company[] {
        // not implemented
        return Array.from(this.companies.values())
    }
}
