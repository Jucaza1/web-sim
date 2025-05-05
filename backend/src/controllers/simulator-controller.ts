import { NextFunction, Request, Response } from 'express'
import { SimulatorService } from '../services/simulator-service'
import { SimulatorCreateDTO, SimulatorUpdateDTO } from '../types/validations'

export class SimulatorController {
    private simulatorService: SimulatorService
    constructor(simulatorService: SimulatorService) {
        this.simulatorService = simulatorService
        this.getSimulator = this.getSimulator.bind(this)
        this.getSimulators = this.getSimulators.bind(this)
        this.getSimulatorsByCompanyId = this.getSimulatorsByCompanyId.bind(this)
        this.createSimulator = this.createSimulator.bind(this)
        this.updateSimulator = this.updateSimulator.bind(this)
        this.deleteSimulator = this.deleteSimulator.bind(this)
    }
    async getSimulator(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id
        const result = await this.simulatorService.getSimulator(id)
        if (!result.ok) {
            next({ httpError: result.err!, exception: result.exception })
            return
        }
        res.status(200).json(result.data)
        return
    }
    async getSimulatorsByCompanyId(req: Request, res: Response, next: NextFunction) {
        const companyId = req.params.companyId
        const result = await this.simulatorService.getSimulatorsByCompanyId(companyId)
        if (!result.ok) {
            next({ httpError: result.err!, exception: result.exception })
            return
        }
        res.status(200).json(result.data)
        return
    }
    async getSimulators(_req: Request, res: Response, next: NextFunction) {
        const result = await this.simulatorService.getSimulators()
        if (!result.ok) {
            next({ httpError: result.err!, exception: result.exception })
            return
        }
        res.status(200).json(result.data)
        return
    }
    async createSimulator(req: Request, res: Response, next: NextFunction) {
        const simulatorParams = req.body as SimulatorCreateDTO
        const simulatorCreate: SimulatorCreateDTO = {
            name: simulatorParams.name,
            companyId: simulatorParams.companyId,
            description: simulatorParams.description,
        }
        const result = await this.simulatorService.createSimulator(simulatorCreate)
        if (!result.ok) {
            next({ httpError: result.err!, exception: result.exception })
            return
        }
        res.status(201).json(result.data)
        return
    }
    async updateSimulator(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id
        const simulatorParams = req.body as SimulatorUpdateDTO
        const simulatorUpdate: SimulatorUpdateDTO = {
            name: simulatorParams.name,
            description: simulatorParams.description,
        }
        const result = await this.simulatorService.updateSimulator(id, simulatorUpdate)
        if (!result.ok) {
            next({ httpError: result.err!, exception: result.exception })
            return
        }
        res.status(200).json(result.data)
        return
    }
    async deleteSimulator(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id
        const result = await this.simulatorService.deleteSimulator(id)
        if (!result.ok) {
            next({ httpError: result.err!, exception: result.exception })
            return
        }
        res.status(200).json(result.data)
        return
    }
}
