import { NextFunction, Request, Response } from 'express'
import { CompanyService } from '../services/company_service'
import { CompanyCreateDTO, CompanyUpdateDTO } from '../types/validations'

export class CompanyController {
    private companyService: CompanyService

    constructor(companyService: CompanyService) {
        this.companyService = companyService
        this.getCompany = this.getCompany.bind(this)
        this.getCompanies = this.getCompanies.bind(this)
        this.createCompany = this.createCompany.bind(this)
        this.updateCompany = this.updateCompany.bind(this)
        this.deleteCompany = this.deleteCompany.bind(this)
    }

    getCompany(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id
        const company = this.companyService.getCompany(id)
        if (!company) {
            next(new Error('Company not found'))
            return
        }
        res.status(200).json(company)
        return
    }

    getCompanies(_req: Request, res: Response, _next: NextFunction) {
        res.status(200).json(this.companyService.getCompanies())
        return
    }

    createCompany(req: Request, res: Response, next: NextFunction) {
        const companyParams = req.body as CompanyCreateDTO
        const companyCreate : CompanyCreateDTO = {
            name: companyParams.name,
            image: companyParams.image,
            styleId: companyParams.styleId,
        }
        const company = this.companyService.createCompany(companyCreate)
        if (!company) {
            next(new Error('Company already exists'))
            return
        }
        res.status(201).json(company)
        return
    }

    updateCompany(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id
        const companyParams = req.body as Partial<CompanyUpdateDTO>
        const companyUpdate : CompanyUpdateDTO = {
            name: companyParams.name,
            image: companyParams.image,
            styleId: companyParams.styleId,
        }
        const company = this.companyService.updateCompany(id, companyUpdate)
        if (!company) {
            next(new Error('Company not found'))
            return
        }
        res.status(200).json(company)
        return
    }

    deleteCompany(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id
        const company = this.companyService.deleteCompany(id)
        if (!company) {
            next(new Error('Company not found'))
            return
        }
        res.status(200).json(company)
        return
    }
}

