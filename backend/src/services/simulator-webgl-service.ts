import { SimulatorWebgl } from "../types/db"
import { ResultHttp, resultStoreToResultHttp } from "../types/result"
import { SimulatorWebglStore } from "../models/simulator-webgl"
import { idSchema, SimulatorWebglCreateDTO, SimulatorWebglCreateDTOSchema, SimulatorWebglUpdateDTO } from "../types/validations"

export class SimulatorWebglService {
    private simulatorWebglStore: SimulatorWebglStore
    constructor(sWglStore: SimulatorWebglStore) {
        this.simulatorWebglStore = sWglStore
    }
    async getWebgl(id: number): Promise<ResultHttp<SimulatorWebgl>> {
        const validateResult = idSchema.safeParse(id)
        if (!validateResult.success) {
            return { ok: false, err: { status: 400, msg: ["id is not valid"] } }
        }
        const result = await this.simulatorWebglStore.getSimulatorWebgl(id)
        return resultStoreToResultHttp(result)
    }
    async getWebglBySimulatorId(simulatorId: number): Promise<ResultHttp<SimulatorWebgl[]>> {
        const validateResult = idSchema.safeParse(simulatorId)
        if (!validateResult.success) {
            return { ok: false, err: { status: 400, msg: ["simulatorId is not valid"] } }
        }
        const result = await this.simulatorWebglStore.getSimulatorWebglBySimulatorId(simulatorId)
        return resultStoreToResultHttp(result)
    }
    async getWebgls(): Promise<ResultHttp<SimulatorWebgl[]>> {
        const result = await this.simulatorWebglStore.getSimulatorWebgls()
        return resultStoreToResultHttp(result)
    }
    async createWebgl(webgl: SimulatorWebglCreateDTO): Promise<ResultHttp<SimulatorWebgl>> {
        const validateResult = SimulatorWebglCreateDTOSchema.safeParse(webgl)
        if (!validateResult.success) {
            return { ok: false, err: { status: 400, msg: validateResult.error.errors.map(e => e.message) } }
        }
        const result = await this.simulatorWebglStore.createSimulatorWebgl(webgl)
        return resultStoreToResultHttp(result)
    }
    async updateWebgl(id: number, webgl: SimulatorWebglUpdateDTO): Promise<ResultHttp<SimulatorWebgl>> {
        const validateResult = idSchema.safeParse(id)
        if (!validateResult.success) {
            return { ok: false, err: { status: 400, msg: ["id is not valid"] } }
        }
        const result = await this.simulatorWebglStore.updateSimulatorWebgl(id, webgl)
        return resultStoreToResultHttp(result)
    }
    async deleteWebgl(id: number): Promise<ResultHttp<SimulatorWebgl>> {
        const validateResult = idSchema.safeParse(id)
        if (!validateResult.success) {
            return { ok: false, err: { status: 400, msg: ["id is not valid"] } }
        }
        const result = await this.simulatorWebglStore.deleteSimulatorWebgl(id)
        return resultStoreToResultHttp(result)
    }

}
