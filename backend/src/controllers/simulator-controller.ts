import { Request, Response } from 'express'
import { SimulatorService } from '../services/simulator-service'
import { intCoerceSchema, SimulatorCreateDTO, SimulatorUpdateDTO } from '../types/validations'
import { NextFunction } from '../types/express'
import { Payload } from '../types/jwtPayload'
import { DefaultUnAuthorizedError } from './defaultError'

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
        const intId = intCoerceSchema.safeParse(id)
        if (!intId.success) {
            next({ httpError: { status: 400, msg: [["id", intId.error.message].join(" : ")] } })
            return
        }
        const result = await this.simulatorService.getSimulator(intId.data)
        if (!result.ok) {
            next({ httpError: result.err!, exception: result.exception })
            return
        }
        res.status(200).json(result.data)
        return
    }

    async getSimulatorsByCompanyId(req: Request, res: Response, next: NextFunction) {
        const companyId = req.params.id
        const intId = intCoerceSchema.safeParse(companyId)
        if (!intId.success) {
            next({ httpError: { status: 400, msg: [["id", intId.error.message].join(" : ")] } })
            return
        }
        const result = await this.simulatorService.getSimulatorsByCompanyId(intId.data)
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

    /**
     * Create a new simulator, only accessible by ADMIN and ADMIN_COMPANY
     */
    async createSimulator(req: Request, res: Response, next: NextFunction) {
        let payload = res.locals?.payload as Payload
        if (payload?.role !== "ADMIN" && payload?.role !== "ADMIN_COMPANY") {
            next(DefaultUnAuthorizedError)
            return
        }

        const simulatorParams = req.body as SimulatorCreateDTO
        const simulatorCreate: SimulatorCreateDTO = {
            name: simulatorParams.name,
            companyId: simulatorParams.companyId,
            description: simulatorParams.description,
            thumbnail: simulatorParams.thumbnail
        }
        const result = await this.simulatorService.createSimulator(simulatorCreate)
        if (!result.ok) {
            next({ httpError: result.err!, exception: result.exception })
            return
        }
        res.status(201).json(result.data)
        return
    }

    /**
     * Update a simulator, only accessible by ADMIN and ADMIN_COMPANY
     */
    async updateSimulator(req: Request, res: Response, next: NextFunction) {
        let payload = res.locals?.payload as Payload
        if (payload?.role !== "ADMIN" && payload?.role !== "ADMIN_COMPANY") {
            next(DefaultUnAuthorizedError)
            return
        }

        const id = req.params.id
        const intId = intCoerceSchema.safeParse(id)
        if (!intId.success) {
            next({ httpError: { status: 400, msg: [["id", intId.error.message].join(" : ")] } })
            return
        }
        const simulatorParams = req.body as SimulatorUpdateDTO
        const simulatorUpdate: SimulatorUpdateDTO = {
            name: simulatorParams.name,
            description: simulatorParams.description,
            companyId: simulatorParams.companyId,
            thumbnail: simulatorParams.thumbnail
        }
        const result = await this.simulatorService.updateSimulator(intId.data, simulatorUpdate)
        if (!result.ok) {
            next({ httpError: result.err!, exception: result.exception })
            return
        }
        res.status(200).json(result.data)
        return
    }

    /**
     * Delete a simulator, only accessible by ADMIN and ADMIN_COMPANY
     */
    async deleteSimulator(req: Request, res: Response, next: NextFunction) {
        let payload = res.locals?.payload as Payload
        if (payload?.role !== "ADMIN" && payload?.role !== "ADMIN_COMPANY") {
            next(DefaultUnAuthorizedError)
            return
        }

        const id = req.params.id
        const intId = intCoerceSchema.safeParse(id)
        if (!intId.success) {
            next({ httpError: { status: 400, msg: [["id", intId.error.message].join(" : ")] } })
            return
        }
        const result = await this.simulatorService.deleteSimulator(intId.data)
        if (!result.ok) {
            next({ httpError: result.err!, exception: result.exception })
            return
        }
        res.status(200).json(result.data)
        return
    }
}
