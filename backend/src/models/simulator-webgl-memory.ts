import { SimulatorWebgl, SimulatorWebglCreate } from '../types/db'
import { ResultStore, StoreErrorCode } from '../types/result'
import { SimulatorWebglStore } from "./simulator-webgl"

export class SimulatorWebglMemoryStore implements SimulatorWebglStore {
    private simulatorWebgls: Map<string, SimulatorWebgl>
    constructor() {
        this.simulatorWebgls = new Map<string, SimulatorWebgl>()
    }

    async getSimulatorWebgl(id: string): Promise<ResultStore<SimulatorWebgl>> {
        const simulatorWebgl = this.simulatorWebgls.get(id)
        if (!simulatorWebgl) {
            return { ok: false, err: { code: StoreErrorCode.notFound, msg: "simulatorWebgl not found" } }
        }
        return { ok: true, data: simulatorWebgl }
    }
    async getSimulatorWebglBySimulatorId(simulatorId: string): Promise<ResultStore<SimulatorWebgl[]>> {
        const simulatorWebgls = Array.from(this.simulatorWebgls.values()).filter(simulatorWebgl => simulatorWebgl.simulatorId === simulatorId)
        if (!simulatorWebgls) {
            return { ok: false, err: { code: StoreErrorCode.notFound, msg: "simulatorWebgl not found" } }
        }
        return { ok: true, data: simulatorWebgls }
    }
    async getSimulatorWebgls(): Promise<ResultStore<SimulatorWebgl[]>> {
        return { ok: true, data: Array.from(this.simulatorWebgls.values()) }
    }
    async createSimulatorWebgl(simulatorWebglCreate: SimulatorWebgl): Promise<ResultStore<SimulatorWebgl>> {
        let simulatorWebglMemory : SimulatorWebglCreate = { ...simulatorWebglCreate, id: crypto.randomUUID(), createdAt: new Date(), updatedAt: new Date() }
        if (this.simulatorWebgls.has(simulatorWebglMemory.id!)) {
            // SimulatorWebgl already exists
            return { ok: false, err: { code: StoreErrorCode.unique, msg: "simulatorWebgl already exists" } }
        }
        this.simulatorWebgls.set(simulatorWebglMemory.id!, simulatorWebglMemory as SimulatorWebgl)
        return { ok: true, data: simulatorWebglMemory as SimulatorWebgl }
    }
    async updateSimulatorWebgl(id: string, simulator: Partial<SimulatorWebgl>): Promise<ResultStore<SimulatorWebgl>> {
        const existingSimulatorWebgl = this.getSimulatorWebgl(id)
        if (!existingSimulatorWebgl) {
            return { ok: false, err: { code: StoreErrorCode.notFound, msg: "simulatorWebgl not found" } }
        }
        const updatedSimulatorWebgl = { ...existingSimulatorWebgl, ...simulator }
        this.simulatorWebgls.set(id, updatedSimulatorWebgl as SimulatorWebgl)
        return updatedSimulatorWebgl
    }
    async deleteSimulatorWebgl(id: string): Promise<ResultStore<SimulatorWebgl>> {
        const resultSimulatorWebgl = await this.getSimulatorWebgl(id)
        if (!resultSimulatorWebgl.ok) {
            return { ok: false, err: { code: StoreErrorCode.notFound, msg: "simulatorWebgl not found" } }
        }
        this.simulatorWebgls.delete(id)
        return resultSimulatorWebgl
    }

}
