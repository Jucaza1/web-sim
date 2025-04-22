import { PrismaClient } from '@prisma/client'
import { CompanyStore } from "./company"
import { Company, CompanyCreate } from '../types/db'
import { ResultStore, StoreErrorCode } from '../types/result'
import { prismaCatchToStoreError } from '../types/exceptions'

export class CompanyPrismaStore implements CompanyStore {
    private client: PrismaClient
    constructor(client: PrismaClient) {
        this.client = client
        this.getCompany = this.getCompany.bind(this)
        this.getCompanies = this.getCompanies.bind(this)
        this.createCompany = this.createCompany.bind(this)
        this.updateCompany = this.updateCompany.bind(this)
        this.deleteCompany = this.deleteCompany.bind(this)
        this.getCompaniesByUserId = this.getCompaniesByUserId.bind(this)
    }
    getCompany(id: string): ResultStore<Company> {
        let company: Company | undefined
        try {
            this.client.company.findUnique({ where: { id } }).then((result) => {
                if (!result) {
                    return
                }
                company = result
            })
        } catch (e) {
            return { ok: false, err: { code: prismaCatchToStoreError(e), msg: "internal server error" } }
        }
        if (!company) {
            return { ok: false, err: { code: StoreErrorCode.notFound, msg: "company not found" } }
        }
        return { ok: true, data: company }
    }
    getCompanies(): ResultStore<Company[]> {
        let companies: Company[] = []
        try {
            this.client.company.findMany().then((result) => {
                if (!result) {
                    return
                }
                companies = result
            })
        } catch (e) {
            return { ok: false, err: { code: prismaCatchToStoreError(e), msg: "internal server error" } }
        }
        return { ok: true, data: companies }
    }
    createCompany(company: CompanyCreate): ResultStore<Company> {
        // Check if the company already exists
        let existingCompany: Company | undefined
        try {
            this.client.company.findUnique({ where: { name: company.name } }).then((result) => {
                if (result) {
                    existingCompany = result
                }
            })
        } catch (e) {
            return { ok: false, err: { code: prismaCatchToStoreError(e), msg: "internal server error" } }
        }
        if (existingCompany) {
            return { ok: false, err: { code: StoreErrorCode.unique, msg: "company already exists" } }
        }
        // Create the company
        let companyResult: Company | undefined
        try {
            this.client.company.create({ data: company }).then((result) => {
                if (!result) {
                    return
                }
                companyResult = result
            })
        } catch (e) {
            return { ok: false, err: { code: prismaCatchToStoreError(e), msg: "internal server error" } }
        }
        if (!companyResult) {
            return { ok: false, err: { code: StoreErrorCode.unknown, msg: "internal server error" } }
        }
        return { ok: true, data: companyResult }
    }
    updateCompany(id: string, company: Partial<Company>): ResultStore<Company> {
        let companyResult: Company | undefined
        try {
            this.client.company.update({ where: { id }, data: company }).then((result) => {
                if (!result) {
                    return
                }
                companyResult = result
            })
        } catch (e) {
            return { ok: false, err: { code: prismaCatchToStoreError(e), msg: "internal server error" } }
        }
        if (!companyResult) {
            return { ok: false, err: { code: StoreErrorCode.notFound, msg: "company not found" } }
        }
        return { ok: true, data: companyResult }
    }
    deleteCompany(id: string): ResultStore<Company> {
        let companyResult: Company | undefined
        try {
            this.client.company.delete({ where: { id } }).then((result) => {
                // Company deleted
                if (!result) {
                    return
                }
                companyResult = result
            })
        } catch (e) {
            return { ok: false, err: { code: prismaCatchToStoreError(e), msg: "internal server error" } }
        }
        if (!companyResult) {
            return { ok: false, err: { code: StoreErrorCode.notFound, msg: "company not found" } }
        }
        return { ok: true, data: companyResult }
    }
    getCompaniesByUserId(userId: string): ResultStore<Company[]> {
        let companies: Company[] = []
        try {
            this.client.company.findMany({ where: { users: { some: { id: userId } } } })
                .then((result) => {
                    if (!result) {
                        return
                    }
                    companies = result
                })
        } catch (e) {
            return { ok: false, err: { code: prismaCatchToStoreError(e), msg: "internal server error" } }
        }
        return { ok: true, data: companies }
    }
}
