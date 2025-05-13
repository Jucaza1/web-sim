import { SimulatorStore } from "../models/simulator"
import { Simulator, SimulatorCreate } from "../types/db"
import { ResultHttp, resultStoreToResultHttp } from "../types/result"
import { idSchema, SimulatorCreateDTOSchema, SimulatorUpdateDTO } from "../types/validations"

export class SimulatorService {
    private simulatorStore: SimulatorStore
    constructor(sStore: SimulatorStore) {
        this.simulatorStore = sStore
    }
    async getSimulator(id: number): Promise<ResultHttp<Simulator>> {
        const validateResult = idSchema.safeParse(id)
        if (!validateResult.success) {
            return { ok: false, err: { status: 400, msg: ["id is not valid"] } }
        }
        const result = await this.simulatorStore.getSimulator(id)
        return resultStoreToResultHttp(result)
    }
    async getSimulatorsByCompanyId(companyId: number): Promise<ResultHttp<Simulator[]>> {
        const validateResult = idSchema.safeParse(companyId)
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
            return { ok: false, err: { status: 400, msg: validateResult.error.errors.map(e => [e.path,e.message].join(" : ")) } }
        }
        const result = await this.simulatorStore.createSimulator(simulator)
        return resultStoreToResultHttp(result)
    }
    async updateSimulator(id: number, simulator: SimulatorUpdateDTO): Promise<ResultHttp<Simulator>> {
        const validateResult = idSchema.safeParse(id)
        if (!validateResult.success) {
            return { ok: false, err: { status: 400, msg: ["id is not valid"] } }
        }
        const result = await this.simulatorStore.updateSimulator(id, simulator)
        return resultStoreToResultHttp(result)
    }
    async deleteSimulator(id: number): Promise<ResultHttp<Simulator>> {
        const validateResult = idSchema.safeParse(id)
        if (!validateResult.success) {
            return { ok: false, err: { status: 400, msg: ["id is not valid"] } }
        }
        const result = await this.simulatorStore.deleteSimulator(id)
        return resultStoreToResultHttp(result)
    }

}
