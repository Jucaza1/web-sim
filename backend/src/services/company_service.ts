import { CompanyStore } from "../models/company";
import { Company } from "../types/db";
import { CompanyCreateDTO, CompanyCreateDTOSchema, CompanyUpdateDTOSchema } from "../types/validations";

export class CompanyService {
    private companyStore: CompanyStore
    constructor(cStore : CompanyStore){
        this.companyStore = cStore
    }
    getCompany(id: string): Company | null {
        if (!id || id.length === 0) {
            return null
        }
        return this.companyStore.getCompany(id)
    }
    getCompanies(): Company[] {
        return this.companyStore.getCompanies()
    }
    createCompany(company: CompanyCreateDTO): Company | null {
        const result = CompanyCreateDTOSchema.safeParse(company)
        if (!result.success) {
            return null
        }
        return this.companyStore.createCompany(company)
    }
    updateCompany(id: string, company: Partial<CompanyCreateDTO>): Company | null {
        if (!id || id.length === 0) {
            return null
        }
        const result = CompanyUpdateDTOSchema.safeParse(company)
        if (!result.success) {
            return null
        }
        return this.companyStore.updateCompany(id, company)
    }
    deleteCompany(id: string): Company | null {
        if (!id || id.length === 0) {
            return null
        }
        return this.companyStore.deleteCompany(id)
    }
}
