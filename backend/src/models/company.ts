import { Company, CompanyCreate } from '../types/db'

export interface CompanyStore {
    getCompany(id: string): Company | null
    getCompanies(): Company[]
    createCompany(company: CompanyCreate): Company | null
    updateCompany(id: string, company: Partial<Company>): Company | null
    deleteCompany(id: string): Company | null
    getCompaniesByUserId(userId: string): Company[]
}
