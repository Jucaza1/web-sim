import { Company, CompanyCreate, CompanyIdName } from '../types/db'
import { ResultStore } from '../types/result'
import { CompanyMemoryStore } from './company-memory'
import { CompanyPrismaStore } from './company-prisma'
import { PrismaClientSingleton } from './prisma-singleton'

export interface CompanyStore {
    getCompany(id: number): Promise<ResultStore<Company>>
    getCompanies(): Promise<ResultStore<Company[]>>
    createCompany(company: CompanyCreate): Promise<ResultStore<Company>>
    updateCompany(id: number, company: Partial<Company>): Promise<ResultStore<Company>>
    deleteCompany(id: number): Promise<ResultStore<Company>>
    getCompaniesByUserId(userId: number): Promise<ResultStore<Company[]>>
    getCompaniesIdName(): Promise<ResultStore<CompanyIdName[]>>
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
