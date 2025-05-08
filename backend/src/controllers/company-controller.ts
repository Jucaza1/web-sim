import { NextFunction, Request, Response } from 'express'
import { CompanyService } from '../services/company-service'
import { CompanyCreateDTO, CompanyUpdateDTO, intCoerceSchema } from '../types/validations'

export class CompanyController {
    private companyService: CompanyService

    constructor(companyService: CompanyService) {
        this.companyService = companyService
        this.getCompany = this.getCompany.bind(this)
        this.getCompanies = this.getCompanies.bind(this)
        this.getCompaniesIdName = this.getCompaniesIdName.bind(this)
        this.createCompany = this.createCompany.bind(this)
        this.updateCompany = this.updateCompany.bind(this)
        this.deleteCompany = this.deleteCompany.bind(this)
    }

    async getCompany(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id
        const intId = intCoerceSchema.safeParse(id)
        if (!intId.success) {
            next({ httpError: { status: 400, msg: [intId.error.message] } })
            return
        }
        const result = await this.companyService.getCompany(intId.data)
        if (!result.ok) {
            next({ httpError: result.err!, exception: result.exception })
            return
        }
        res.status(200).json(result.data)
        return
    }

    async getCompanies(_req: Request, res: Response, next: NextFunction) {
        const result = await this.companyService.getCompanies()
        if (!result.ok) {
            next({ httpError: result.err!, exception: result.exception })
            return
        }
        res.status(200).json(result.data)
        return
    }

    async getCompaniesIdName(_req: Request, res: Response, next: NextFunction) {
        const result = await this.companyService.getCompaniesIdName()
        if (!result.ok) {
            next({ httpError: result.err!, exception: result.exception })
            return
        }
        res.status(200).json(result.data)
        return
    }

    async createCompany(req: Request, res: Response, next: NextFunction) {
        const companyParams = req.body as CompanyCreateDTO
        const companyCreate : CompanyCreateDTO = {
            name: companyParams.name,
            image: companyParams.image,
            styleId: companyParams.styleId,
        }
        const result = await this.companyService.createCompany(companyCreate)
        if (!result.ok) {
            next({ httpError: result.err!, exception: result.exception })
            return
        }
        res.status(201).json(result.data)
        return
    }

    async updateCompany(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id
        const intId = intCoerceSchema.safeParse(id)
        if (!intId.success) {
            next({ httpError: { status: 400, msg: [intId.error.message] } })
            return
        }
        const companyParams = req.body as Partial<CompanyUpdateDTO>
        const companyUpdate : CompanyUpdateDTO = {
            name: companyParams.name,
            image: companyParams.image,
            styleId: companyParams.styleId,
        }
        const result = await this.companyService.updateCompany(intId.data, companyUpdate)
        if (!result.ok) {
            next({ httpError: result.err!, exception: result.exception })
            return
        }
        res.status(200).json(result.data)
        return
    }

    async deleteCompany(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id
        const intId = intCoerceSchema.safeParse(id)
        if (!intId.success) {
            next({ httpError: { status: 400, msg: [intId.error.message] } })
            return
        }
        const result = await this.companyService.deleteCompany(intId.data)
        if (!result.ok) {
            next({ httpError: result.err!, exception: result.exception })
            return
        }
        res.status(200).json(result.data)
        return
    }
}

