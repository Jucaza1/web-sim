import { Company, CompanyCreate } from '../types/db'
import { ResultStore } from '../types/result'
import { CompanyMemoryStore } from './company-memory'
import { CompanyPrismaStore } from './company-prisma'
import { PrismaClientSingleton } from './prisma-singleton'

export interface CompanyStore {
    getCompany(id: string): Promise<ResultStore<Company>>
    getCompanies(): Promise<ResultStore<Company[]>>
    createCompany(company: CompanyCreate): Promise<ResultStore<Company>>
    updateCompany(id: string, company: Partial<Company>): Promise<ResultStore<Company>>
    deleteCompany(id: string): Promise<ResultStore<Company>>
    getCompaniesByUserId(userId: string): Promise<ResultStore<Company[]>>
}
export function CompanyStoreFactory(kind: string, _seed: boolean = false): CompanyStore {
    switch (kind) {
        case "memory":
            console.log("runing in-memory DB for company")
            return new CompanyMemoryStore()
        case "postgresql":
            console.log("runing in postgresql DB for company")
            return new CompanyPrismaStore(PrismaClientSingleton.getInstance())
        default:
            console.log("runing in-memory DB for company")
            return new CompanyMemoryStore()
    }
}
