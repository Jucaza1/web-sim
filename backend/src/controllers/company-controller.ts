import { NextFunction, Request, Response } from 'express'
import { CompanyService } from '../services/company-service'
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
        const result = this.companyService.getCompany(id)
        if (!result.ok) {
            next(result.err!)
            return
        }
        res.status(200).json(result.data)
        return
    }

    getCompanies(_req: Request, res: Response, _next: NextFunction) {
        const result = this.companyService.getCompanies()
        if (!result.ok) {
            _next(result.err!)
            return
        }
        res.status(200).json(result.data)
        return
    }

    createCompany(req: Request, res: Response, next: NextFunction) {
        const companyParams = req.body as CompanyCreateDTO
        const companyCreate : CompanyCreateDTO = {
            name: companyParams.name,
            image: companyParams.image,
            styleId: companyParams.styleId,
        }
        const result = this.companyService.createCompany(companyCreate)
        if (!result.ok) {
            next(result.err!)
            return
        }
        res.status(201).json(result.data)
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
        const result = this.companyService.updateCompany(id, companyUpdate)
        if (!result.ok) {
            next(result.err!)
            return
        }
        res.status(200).json(result.data)
        return
    }

    deleteCompany(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id
        const result = this.companyService.deleteCompany(id)
        if (!result.ok) {
            next(result.err!)
            return
        }
        res.status(200).json(result.data)
        return
    }
}

