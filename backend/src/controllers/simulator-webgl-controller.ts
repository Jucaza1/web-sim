import { Request, Response } from 'express'
import { SimulatorWebglService } from '../services/simulator-webgl-service'
import { intCoerceSchema, SimulatorWebglCreateDTO, SimulatorWebglUpdateDTO } from '../types/validations'
import { NextFunction } from '../types/express'
import { Payload } from '../types/jwtPayload'
import { DefaultUnAuthorizedError } from './defaultError'

export class SimulatorWebglController {
    private simulatorWebglService: SimulatorWebglService

    constructor(simulatorWebglService: SimulatorWebglService) {
        this.simulatorWebglService = simulatorWebglService
        this.getWebgl = this.getWebgl.bind(this)
        this.getWebglBySimulatorId = this.getWebglBySimulatorId.bind(this)
        this.getWebgls = this.getWebgls.bind(this)
        this.createWebgl = this.createWebgl.bind(this)
        this.updateWebgl = this.updateWebgl.bind(this)
        this.deleteWebgl = this.deleteWebgl.bind(this)
    }

    async getWebgl(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id
        const intId = intCoerceSchema.safeParse(id)
        if (!intId.success) {
            next({ httpError: { status: 400, msg: ["id is not valid"] } })
            return
        }
        const result = await this.simulatorWebglService.getWebgl(intId.data)
        if (!result.ok) {
            next({ httpError: result.err!, exception: result.exception })
            return
        }
        res.status(200).json(result.data)
        return
    }

    async getWebglBySimulatorId(req: Request, res: Response, next: NextFunction) {
        const simulatorId = req.params.id
        const intId = intCoerceSchema.safeParse(simulatorId)
        if (!intId.success) {
            next({ httpError: { status: 400, msg: ["id is not valid"] } })
            return
        }
        const result = await this.simulatorWebglService.getWebglBySimulatorId(intId.data)
        if (!result.ok) {
            next({ httpError: result.err!, exception: result.exception })
            return
        }
        res.status(200).json(result.data)
        return
    }

    async getWebgls(_req: Request, res: Response, next: NextFunction) {
        const result = await this.simulatorWebglService.getWebgls()
        if (!result.ok) {
            next({ httpError: result.err!, exception: result.exception })
            return
        }
        res.status(200).json(result.data)
        return
    }

    /**
     * Create a new simulatorWebgl, only accessible by ADMIN and ADMIN_COMPANY
     */
    async createWebgl(req: Request, res: Response, next: NextFunction) {
        let payload = res.locals?.payload as Payload
        if (payload?.role !== "ADMIN" && payload?.role !== "ADMIN_COMPANY") {
            next(DefaultUnAuthorizedError)
            return
        }

        const webglParams = req.body as SimulatorWebglCreateDTO
        const webglCreate: SimulatorWebglCreateDTO = {
            simulatorId: webglParams.simulatorId,
            kind: webglParams.kind,
            data: webglParams.data,
            wasm: webglParams.wasm,
            framework: webglParams.framework,
            loader: webglParams.loader,
        }
        const result = await this.simulatorWebglService.createWebgl(webglCreate)
        if (!result.ok) {
            next({ httpError: result.err!, exception: result.exception })
            return
        }
        res.status(201).json(result.data)
        return
    }

    /**
     * Update a simulatorWebgl, only accessible by ADMIN and ADMIN_COMPANY
     */
    async updateWebgl(req: Request, res: Response, next: NextFunction) {
        let payload = res.locals?.payload as Payload
        if (payload?.role !== "ADMIN" && payload?.role !== "ADMIN_COMPANY") {
            next(DefaultUnAuthorizedError)
            return
        }

        const id = req.params.id
        const intId = intCoerceSchema.safeParse(id)
        if (!intId.success) {
            next({ httpError: { status: 400, msg: ["id is not valid"] } })
            return
        }
        const webglParams = req.body as SimulatorWebglUpdateDTO
        const webglUpdate: SimulatorWebglUpdateDTO = {
            simulatorId: webglParams.simulatorId,
            kind: webglParams.kind,
            data: webglParams.data,
            wasm: webglParams.wasm,
            framework: webglParams.framework,
            loader: webglParams.loader,
        }
        const result = await this.simulatorWebglService.updateWebgl(intId.data, webglUpdate)
        if (!result.ok) {
            next({ httpError: result.err!, exception: result.exception })
            return
        }
        res.status(200).json(result.data)
        return
    }

    /**
     * Delete a simulatorWebgl, only accessible by ADMIN and ADMIN_COMPANY
     */
    async deleteWebgl(req: Request, res: Response, next: NextFunction) {
        let payload = res.locals?.payload as Payload
        if (payload?.role !== "ADMIN" && payload?.role !== "ADMIN_COMPANY") {
            next(DefaultUnAuthorizedError)
            return
        }
        const id = req.params.id
        const intId = intCoerceSchema.safeParse(id)
        if (!intId.success) {
            next({ httpError: { status: 400, msg: ["id is not valid"] } })
            return
        }
        const result = await this.simulatorWebglService.deleteWebgl(intId.data)
        if (!result.ok) {
            next({ httpError: result.err!, exception: result.exception })
            return
        }
        res.status(200).json(result.data)
        return
    }
}
