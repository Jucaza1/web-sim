import { PrismaClient } from '@prisma/client'
import { CompanyStore } from "./company"
import { Company, CompanyCreate } from '../types/db'

export class CompanyPrismaStore implements CompanyStore {
    private client: PrismaClient
    constructor(client: PrismaClient) {
        this.client = client
    }
    getCompany(id: string): Company | null {
        let company = null
        this.client.company.findUnique({ where: { id } }).then((result) => {
            if (!result) {
                return
            }
            company = result
        })
        return company
    }
    getCompanies(): Company[] {
        let companies: Company[] = []
        this.client.company.findMany().then((result) => {
            if (!result) {
                return
            }
            companies = result
        })
        return companies
    }
    createCompany(company: CompanyCreate): Company | null {
        // Check if the company already exists
        let existingCompany = null
        this.client.company.findUnique({ where: { name: company.name } }).then((result) => {
            if (result) {
                existingCompany = result
            }
        })
        if (existingCompany) {
            // throw new Error('Company already exists')
            return null
        }
        // Create the company
        let companyResult = null
        this.client.company.create({ data: company }).then((result) => {
            if (!result) {
                return
            }
            companyResult = result
        })
        return companyResult
    }
    updateCompany(id: string, company: Partial<Company>): Company | null {
        let companyResult = null
        this.client.company.update({ where: { id }, data: company }).then((result) => {
            if (!result) {
                return
            }
            companyResult = result
        })
        return companyResult
    }
    deleteCompany(id: string): Company | null {
        let companyResult = null
        this.client.company.delete({ where: { id } }).then((result) => {
            // Company deleted
            if (!result) {
                return
            }
            companyResult = result
        })
        return companyResult
    }
    getCompaniesByUserId(userId: string): Company[] {
        let companies: Company[] = []
        this.client.company.findMany({ where: { users: { some: { id: userId } } } })
            .then((result) => {
                if (!result) {
                    return
                }
                companies = result
            })
        return companies
    }
}
