import { PrismaClient } from '@prisma/client'
import { CompanyStore } from "./company"
import { Company, CompanyCreate, CompanyIdName } from '../types/db'
import { ResultStore, StoreErrorCode } from '../types/result'
import { prismaCatchToStoreError } from '../types/exceptions'

export class CompanyPrismaStore implements CompanyStore {
    private client: PrismaClient
    constructor(client: PrismaClient) {
        this.client = client
        this.getCompany = this.getCompany.bind(this)
        this.getCompanies = this.getCompanies.bind(this)
        this.getCompaniesIdName = this.getCompaniesIdName.bind(this)
        this.createCompany = this.createCompany.bind(this)
        this.updateCompany = this.updateCompany.bind(this)
        this.deleteCompany = this.deleteCompany.bind(this)
        this.getCompaniesByUserId = this.getCompaniesByUserId.bind(this)
    }
    async getCompany(id: string): Promise<ResultStore<Company>> {
        let company: Company | null
        try {
            company = await this.client.company.findUnique({ where: { id } })
        } catch (e) {
            return { ok: false, err: { code: prismaCatchToStoreError(e), msg: "internal server error" }, exception: e as Error }
        }
        if (!company) {
            return { ok: false, err: { code: StoreErrorCode.notFound, msg: "company not found" } }
        }
        return { ok: true, data: company }
    }
    async getCompanies(): Promise<ResultStore<Company[]>> {
        let companies: Company[] = []
        try {
            companies = await this.client.company.findMany()
        } catch (e) {
            return { ok: false, err: { code: prismaCatchToStoreError(e), msg: "internal server error" }, exception: e as Error }
        }
        return { ok: true, data: companies }
    }
    async getCompaniesIdName(): Promise<ResultStore<CompanyIdName[]>> {
        let companies: CompanyIdName[] = []
        try {
            companies = await this.client.company.findMany({ select: { id: true, name: true } })
        } catch (e) {
            return { ok: false, err: { code: prismaCatchToStoreError(e), msg: "internal server error" }, exception: e as Error }
        }
        return { ok : true, data: companies}


    }
    async createCompany(company: CompanyCreate): Promise<ResultStore<Company>> {
        // Check if the company already exists
        let existingCompany: Company | null
        try {
            existingCompany = await this.client.company.findUnique({ where: { name: company.name } })
        } catch (e) {
            return { ok: false, err: { code: prismaCatchToStoreError(e), msg: "internal server error" }, exception: e as Error }
        }
        if (existingCompany) {
            return { ok: false, err: { code: StoreErrorCode.unique, msg: "company already exists" } }
        }
        // Create the company
        let companyResult: Company | undefined
        try {
            companyResult = await this.client.company.create({ data: company })
        } catch (e) {
            return { ok: false, err: { code: prismaCatchToStoreError(e), msg: "internal server error" }, exception: e as Error }
        }
        if (!companyResult) {
            return { ok: false, err: { code: StoreErrorCode.unknown, msg: "internal server error" } }
        }
        return { ok: true, data: companyResult }
    }
    async updateCompany(id: string, company: Partial<Company>): Promise<ResultStore<Company>> {
        let companyResult: Company | undefined
        try {
            // TODO: check if id field collides in data
            companyResult = await this.client.company.update({ where: { id }, data: company })
        } catch (e) {
            return { ok: false, err: { code: prismaCatchToStoreError(e), msg: "internal server error" }, exception: e as Error }
        }
        if (!companyResult) {
            return { ok: false, err: { code: StoreErrorCode.notFound, msg: "company not found" } }
        }
        return { ok: true, data: companyResult }
    }
    async deleteCompany(id: string): Promise<ResultStore<Company>> {
        let companyResult: Company | undefined
        try {
            companyResult = await this.client.company.delete({ where: { id } })
        } catch (e) {
            return { ok: false, err: { code: prismaCatchToStoreError(e), msg: "internal server error" }, exception: e as Error }
        }
        if (!companyResult) {
            return { ok: false, err: { code: StoreErrorCode.notFound, msg: "company not found" } }
        }
        return { ok: true, data: companyResult }
    }
    async getCompaniesByUserId(userId: string): Promise<ResultStore<Company[]>> {
        let companies: Company[] = []
        try {
            companies = await this.client.company.findMany({ where: { users: { some: { id: userId } } } })
        } catch (e) {
            return { ok: false, err: { code: prismaCatchToStoreError(e), msg: "internal server error" }, exception: e as Error }
        }
        return { ok: true, data: companies }
    }
}
