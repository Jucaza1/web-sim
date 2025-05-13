import { beforeEach, describe, expect, it } from '@jest/globals'
import { CompanyService } from '../src/services/company-service'
import { CompanyMemoryStore } from '../src/models/company-memory'
import { CompanyCreate } from '../src/types/db'
import { randomUUID } from 'crypto'
import { Company } from '../src/types/db'

let companyService: CompanyService
let companyCreate: CompanyCreate
let companyCreate2: CompanyCreate
function initializeCompanyService() {
    const companyStore = new CompanyMemoryStore()
    const cService = new CompanyService(companyStore)
    return cService
}
function compareCompanyWithCompanyCreate(company: Company, companyDTO: CompanyCreate): boolean {
    return company.name === companyDTO.name &&
        company.styleId === companyDTO.styleId &&
        company.image === companyDTO.image
}
function compareCompanyWithCompany(company: Company, company2: Company): boolean {
    return company.name === company2.name &&
        company.styleId === company2.styleId &&
        company.image === company2.image &&
        company.id === company2.id
}
describe('CompanyService', () => {
    beforeEach(() => {
        companyService = initializeCompanyService()
        companyCreate = {
            name: "Test Company",
            styleId: randomUUID(),
            image: "https://example.com/image.png",
        }
        companyCreate2 = {
            name: "Test Company2",
            styleId: randomUUID(),
            image: "https://example.com/image2.png",
        }
    })
    it('should create a company', async () => {
        const result = await companyService.createCompany(companyCreate)
        expect(result.ok).toBe(true)
        const createdCompany = result.data
        expect(createdCompany).toBeDefined()
    })
    it('should create and get a company by id', async () => {
        const createResult = await companyService.createCompany(companyCreate)
        expect(createResult.ok).toBe(true)
        const createdCompany = createResult.data!
        expect(createdCompany).toBeDefined()
        const getResult = await companyService.getCompany(createdCompany.id)
        expect(getResult.ok).toBe(true)
        const fetchedCompany = getResult.data
        expect(fetchedCompany).toBeDefined()
        expect(compareCompanyWithCompany(createdCompany, fetchedCompany!)).toBe(true)
        expect(compareCompanyWithCompanyCreate(fetchedCompany!, companyCreate)).toBe(true)
    })
    it('should create and get all companies', async () => {
        const createResult = await companyService.createCompany(companyCreate)
        expect(createResult.ok).toBe(true)
        const createdCompany = createResult.data!
        expect(createdCompany).toBeDefined()
        const createResult2 = await companyService.createCompany(companyCreate2)
        expect(createResult2.ok).toBe(true)
        const createdCompany2 = createResult2.data!
        expect(createdCompany2).toBeDefined()
        const getAllResult = await companyService.getCompanies()
        expect(getAllResult.ok).toBe(true)
        const companies = getAllResult.data!
        expect(companies).toBeDefined()
        expect(companies.length).toBe(2)
        expect(compareCompanyWithCompany(createdCompany, companies[0])).toBe(true)
        expect(compareCompanyWithCompany(createdCompany2, companies[1])).toBe(true)
    })
    it('should create and update a company', async () => {
        const createResult = await companyService.createCompany(companyCreate)
        expect(createResult.ok).toBe(true)
        const createdCompany = createResult.data!
        expect(createdCompany).toBeDefined()
        const styleId = randomUUID()
        const updateResult = await companyService.updateCompany(createdCompany.id, {
            name: "Updated Company",
            styleId: styleId,
            image: "https://example.com/updated-image.png",
        })
        expect(updateResult.ok).toBe(true)
        const updatedCompany = updateResult.data!
        expect(updatedCompany).toBeDefined()
        expect(compareCompanyWithCompany(updatedCompany, {
            ...createdCompany,
            name: "Updated Company",
            styleId: styleId,
            image: "https://example.com/updated-image.png",
        })).toBe(true)
    })
    it('should create and delete a company', async () => {
        const createResult = await companyService.createCompany(companyCreate)
        expect(createResult.ok).toBe(true)
        const createdCompany = createResult.data!
        expect(createdCompany).toBeDefined()
        const deleteResult = await companyService.deleteCompany(createdCompany.id)
        expect(deleteResult.ok).toBe(true)
        const deletedCompany = deleteResult.data!
        expect(deletedCompany).toBeDefined()
        expect(compareCompanyWithCompany(deletedCompany, createdCompany)).toBe(true)
        const getDeletedResult = await companyService.getCompany(createdCompany.id)
        expect(getDeletedResult.ok).toBe(false)
    })
    it('should not create a company with invalid data', async () => {
        const invalidCompanyCreate = { ...companyCreate, name: "" }
        const result = await companyService.createCompany(invalidCompanyCreate)
        expect(result.ok).toBe(false)
        expect(result.err!.status).toBe(400)
        expect(result.err!.msg).toBeDefined()
        expect(result.err!.msg?.length).toBe(1)
    })
    it('should not create a company with existing name', async () => {
        const createResult1 = await companyService.createCompany(companyCreate)
        expect(createResult1.ok).toBe(true)
        const createdCompany1 = createResult1.data!
        expect(createdCompany1).toBeDefined()
        const createResult2 = await companyService.createCompany({ ...companyCreate, name: companyCreate.name })
        expect(createResult2.ok).toBe(false)
    })
    it('should not update a company with invalid id', async () => {
        const createResult = await companyService.createCompany(companyCreate)
        expect(createResult.ok).toBe(true)
        const createdCompany = createResult.data!
        expect(createdCompany).toBeDefined()
        const updateResult = await companyService.updateCompany(-1, { name: "Updated Company" })
        expect(updateResult.ok).toBe(false)
    })
    it('should not update a company with invalid data', async () => {
        const createResult = await companyService.createCompany(companyCreate)
        expect(createResult.ok).toBe(true)
        const createdCompany = createResult.data!
        expect(createdCompany).toBeDefined()
        const updateResult = await companyService.updateCompany(createdCompany.id, { name: "" })
        expect(updateResult.ok).toBe(false)
    })
    it('should not delete a company with invalid id', async () => {
        const createResult = await companyService.createCompany(companyCreate)
        expect(createResult.ok).toBe(true)
        const createdCompany = createResult.data!
        expect(createdCompany).toBeDefined()
        const deleteResult = await companyService.deleteCompany(-1)
        expect(deleteResult.ok).toBe(false)
    })
})

