import { Company, CompanyCreate } from '../types/db'
import { ResultStore } from '../types/result'

export interface CompanyStore {
    getCompany(id: string): Promise<ResultStore<Company>>
    getCompanies(): Promise<ResultStore<Company[]>>
    createCompany(company: CompanyCreate): Promise<ResultStore<Company>>
    updateCompany(id: string, company: Partial<Company>): Promise<ResultStore<Company>>
    deleteCompany(id: string): Promise<ResultStore<Company>>
    getCompaniesByUserId(userId: string): Promise<ResultStore<Company[]>>
}
}
