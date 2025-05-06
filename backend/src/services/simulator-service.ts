import { SimulatorStore } from "../models/simulator"
import z from "zod"
import { Simulator, SimulatorCreate } from "../types/db"
import { ResultHttp, resultStoreToResultHttp } from "../types/result"
import { SimulatorCreateDTOSchema, SimulatorUpdateDTO } from "../types/validations"

export class SimulatorService {
    private simulatorStore: SimulatorStore
    constructor(sStore: SimulatorStore) {
        this.simulatorStore = sStore
    }
    async getSimulator(id: string): Promise<ResultHttp<Simulator>> {
        if (!id || id.length === 0) {
            return { ok: false, err: { status: 400, msg: ["id is required"] } }
        }
        const validateResult = z.string().uuid().safeParse(id)
        if (!validateResult.success) {
            return { ok: false, err: { status: 400, msg: ["id is not valid"] } }
        }
        const result = await this.simulatorStore.getSimulator(id)
        return resultStoreToResultHttp(result)
    }
    async getSimulatorsByCompanyId(companyId: string): Promise<ResultHttp<Simulator[]>> {
        if (!companyId || companyId.length === 0) {
            return { ok: false, err: { status: 400, msg: ["id is required"] } }
        }
        const validateResult = z.string().uuid().safeParse(companyId)
        if (!validateResult.success) {
            return { ok: false, err: { status: 400, msg: ["id is not valid"] } }
        }
        const result = await this.simulatorStore.getSimulatorsByCompanyId(companyId)
        return resultStoreToResultHttp(result)
    }
    async getSimulators(): Promise<ResultHttp<Simulator[]>> {
        const result = await this.simulatorStore.getSimulators()
        return resultStoreToResultHttp(result)
    }
    async createSimulator(simulator: SimulatorCreate): Promise<ResultHttp<Simulator>> {
        const validateResult = SimulatorCreateDTOSchema.safeParse(simulator)
        if (!validateResult.success) {
            return { ok: false, err: { status: 400, msg: validateResult.error.errors.map(e => e.message) } }
        }
        const result = await this.simulatorStore.createSimulator(simulator)
        return resultStoreToResultHttp(result)
    }
    async updateSimulator(id: string, simulator: SimulatorUpdateDTO): Promise<ResultHttp<Simulator>> {
        if (!id || id.length === 0) {
            return { ok: false, err: { status: 400, msg: ["id is required"] } }
        }
        const validateResult = z.string().uuid().safeParse(id)
        if (!validateResult.success) {
            return { ok: false, err: { status: 400, msg: ["id is not valid"] } }
        }
        const result = await this.simulatorStore.updateSimulator(id, simulator)
        return resultStoreToResultHttp(result)
    }
    async deleteSimulator(id: string): Promise<ResultHttp<Simulator>> {
        if (!id || id.length === 0) {
            return { ok: false, err: { status: 400, msg: ["id is required"] } }
        }
        const validateResult = z.string().uuid().safeParse(id)
        if (!validateResult.success) {
            return { ok: false, err: { status: 400, msg: ["id is not valid"] } }
        }
        const result = await this.simulatorStore.deleteSimulator(id)
        return resultStoreToResultHttp(result)
    }

}
