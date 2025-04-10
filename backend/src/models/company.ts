import { Company, CompanyCreate } from '../types/db'
import { ResultStore } from '../types/result'

export interface CompanyStore {
    getCompany(id: string): ResultStore<Company>
    getCompanies(): ResultStore<Company[]>
    createCompany(company: CompanyCreate): ResultStore<Company>
    updateCompany(id: string, company: Partial<Company>): ResultStore<Company>
    deleteCompany(id: string): ResultStore<Company>
    getCompaniesByUserId(userId: string): ResultStore<Company[]>
}
