import { SimulatorWebgl, SimulatorWebglCreate, SimulatorWebglCreatePrismaConverter, SimulatorWebglUpdatePrismaConverter } from '../types/db'
import { PrismaClient } from '@prisma/client'
import { SimulatorWebglStore } from "./simulator-webgl"
import { ResultStore, StoreErrorCode } from '../types/result'
import { prismaCatchToStoreError } from '../types/exceptions'

export class SimulatorWebglPrismaStore implements SimulatorWebglStore {
    private client: PrismaClient
    constructor(client: PrismaClient) {
        this.client = client
        this.getSimulatorWebgl = this.getSimulatorWebgl.bind(this)
        this.getSimulatorWebglBySimulatorId = this.getSimulatorWebglBySimulatorId.bind(this)
        this.getSimulatorWebgls = this.getSimulatorWebgls.bind(this)
        this.createSimulatorWebgl = this.createSimulatorWebgl.bind(this)
        this.updateSimulatorWebgl = this.updateSimulatorWebgl.bind(this)
        this.deleteSimulatorWebgl = this.deleteSimulatorWebgl.bind(this)
    }
    async getSimulatorWebgl(id: number): Promise<ResultStore<SimulatorWebgl>> {
        let simulatorWebgl: SimulatorWebgl | null
        try {
            simulatorWebgl = await this.client.simulatorWebgl.findUnique({ where: { id } })
        }
        catch (e) {
            return { ok: false, err: { code: prismaCatchToStoreError(e), msg: "internal server error" }, exception: e as Error }
        }
        if (!simulatorWebgl) {
            return { ok: false, err: { code: StoreErrorCode.notFound, msg: "simulatorWebgl not found" } }
        }
        return { ok: true, data: simulatorWebgl }
    }
    async getSimulatorWebglBySimulatorId(simulatorId: number): Promise<ResultStore<SimulatorWebgl>> {
        let simulatorWebgl: SimulatorWebgl | null
        try {
            simulatorWebgl = await this.client.simulatorWebgl.findUnique({ where: { simulatorId } })
        }
        catch (e) {
            return { ok: false, err: { code: prismaCatchToStoreError(e), msg: "internal server error" }, exception: e as Error }
        }
        if (!simulatorWebgl) {
            return { ok: false, err: { code: StoreErrorCode.notFound, msg: "simulatorWebgl not found" } }
        }
        return { ok: true, data: simulatorWebgl }
    }
    async getSimulatorWebgls(): Promise<ResultStore<SimulatorWebgl[]>> {
        let simulatorWebgls: SimulatorWebgl[] = []
        try {
            simulatorWebgls = await this.client.simulatorWebgl.findMany()
        }
        catch (e) {
            return { ok: false, err: { code: prismaCatchToStoreError(e), msg: "internal server error" }, exception: e as Error }
        }

        return { ok: true, data: simulatorWebgls }
    }
    async createSimulatorWebgl(simulatorWebgl: SimulatorWebglCreate): Promise<ResultStore<SimulatorWebgl>> {
        // Create the simulatorWebgl
        let simulatorResult: SimulatorWebgl | null
        let simulatorPrisma = SimulatorWebglCreatePrismaConverter(simulatorWebgl)
        try {
            simulatorResult = await this.client.simulatorWebgl.create({ data: simulatorPrisma })
        }
        catch (e) {
            return { ok: false, err: { code: prismaCatchToStoreError(e), msg: "internal server error" } }
        }
        if (simulatorWebgl.simulatorId !== undefined) {
            try {
                const simUpdateResult = await this.client.simulator.update({ where: { id: simulatorWebgl.simulatorId }, data: { ready: true } })
                if (!simUpdateResult) {
                    return { ok: false, err: { code: StoreErrorCode.unknown, msg: "internal server error" } }
                }
            }
            catch (e) {
                return { ok: false, err: { code: prismaCatchToStoreError(e), msg: "internal server error" } }
            }

        }
        if (!simulatorResult) {
            return { ok: false, err: { code: StoreErrorCode.unknown, msg: "internal server error" } }
        }
        return { ok: true, data: simulatorResult }
    }
    async updateSimulatorWebgl(id: number, simulator: Partial<SimulatorWebgl>): Promise<ResultStore<SimulatorWebgl>> {
        let simulatorResult: SimulatorWebgl | null
        const simulatorPrisma = SimulatorWebglUpdatePrismaConverter(simulator)
        try {
            simulatorResult = await this.client.simulatorWebgl.update({ where: { id }, data: simulatorPrisma })
        }
        catch (e) {
            return { ok: false, err: { code: StoreErrorCode.unknown, msg: "internal server error" } }
        }
        if (!simulatorResult) {
            return { ok: false, err: { code: StoreErrorCode.notFound, msg: "simulatorWebgl not found" } }
        }
        return { ok: true, data: simulatorResult }
    }
    async deleteSimulatorWebgl(id: number): Promise<ResultStore<SimulatorWebgl>> {
        let simulatorResult: SimulatorWebgl | null
        try {
            simulatorResult = await this.client.simulatorWebgl.delete({ where: { id } })
        }
        catch (e) {
            return { ok: false, err: { code: prismaCatchToStoreError(e), msg: "simulatorWebgl not found" } }

        }
        if (!simulatorResult) {
            return { ok: false, err: { code: StoreErrorCode.notFound, msg: "simulatorWebgl not found" } }
        }
        return { ok: true, data: simulatorResult }
    }
}
