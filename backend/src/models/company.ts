import { Company, CompanyCreate, CompanyIdName, CompanyUpdate } from '../types/db'
import { ResultStore } from '../types/result'
import { CompanyMemoryStore } from './company-memory'
import { CompanyPrismaStore } from './company-prisma'
import { PrismaClientSingleton } from './prisma-singleton'
import logger from "../logger"

export interface CompanyStore {
    getCompany(id: number): Promise<ResultStore<Company>>
    getCompanies(): Promise<ResultStore<Company[]>>
    createCompany(company: CompanyCreate): Promise<ResultStore<Company>>
    updateCompany(id: number, company: CompanyUpdate): Promise<ResultStore<Company>>
    deleteCompany(id: number): Promise<ResultStore<Company>>
    getCompaniesByUserId(userId: number): Promise<ResultStore<Company[]>>
    getCompaniesIdName(): Promise<ResultStore<CompanyIdName[]>>
}
export function CompanyStoreFactory(kind: string, _seed: boolean = false): CompanyStore {
    switch (kind) {
        case "memory":
            logger.debug("runing in-memory DB for company")
            return new CompanyMemoryStore()
        case "postgresql":
            logger.debug("runing in postgresql DB for company")
            return new CompanyPrismaStore(PrismaClientSingleton.getInstance())
        default:
            logger.debug("runing in-memory DB for company")
            return new CompanyMemoryStore()
    }
}
