import { SimulatorWebgl, SimulatorWebglCreate, SimulatorWebglUpdate } from '../types/db'
import { ResultStore, StoreErrorCode } from '../types/result'
import { SimulatorWebglStore } from "./simulator-webgl"

function autoIncFn(): () => number {
    let id = 0
    return () => {
        id++
        return id
    }
}
export class SimulatorWebglMemoryStore implements SimulatorWebglStore {
    private simulatorWebgls: Map<number, SimulatorWebgl>
    private autoInc: () => number
    constructor() {
        this.simulatorWebgls = new Map<number, SimulatorWebgl>()
        this.autoInc = autoIncFn()
    }

    async getSimulatorWebgl(id: number): Promise<ResultStore<SimulatorWebgl>> {
        const simulatorWebgl = this.simulatorWebgls.get(id)
        if (!simulatorWebgl) {
            return { ok: false, err: { code: StoreErrorCode.notFound, msg: "simulatorWebgl not found" } }
        }
        return { ok: true, data: simulatorWebgl }
    }
    async getSimulatorWebglBySimulatorId(simulatorId: number): Promise<ResultStore<SimulatorWebgl[]>> {
        const simulatorWebgls = Array.from(this.simulatorWebgls.values()).filter(simulatorWebgl => simulatorWebgl.simulatorId === simulatorId)
        if (!simulatorWebgls) {
            return { ok: false, err: { code: StoreErrorCode.notFound, msg: "simulatorWebgl not found" } }
        }
        return { ok: true, data: simulatorWebgls }
    }
    async getSimulatorWebgls(): Promise<ResultStore<SimulatorWebgl[]>> {
        return { ok: true, data: Array.from(this.simulatorWebgls.values()) }
    }
    async createSimulatorWebgl(simulatorWebglCreate: SimulatorWebglCreate): Promise<ResultStore<SimulatorWebgl>> {
        let simulatorWebglMemory: SimulatorWebgl = { ...simulatorWebglCreate, id: this.autoInc(), createdAt: new Date(), updatedAt: new Date() }
        if (this.simulatorWebgls.has(simulatorWebglMemory.id!)) {
            // SimulatorWebgl already exists
            return { ok: false, err: { code: StoreErrorCode.unique, msg: "simulatorWebgl already exists" } }
        }
        this.simulatorWebgls.set(simulatorWebglMemory.id!, simulatorWebglMemory as SimulatorWebgl)
        return { ok: true, data: simulatorWebglMemory as SimulatorWebgl }
    }
    async updateSimulatorWebgl(id: number, simulator: SimulatorWebglUpdate): Promise<ResultStore<SimulatorWebgl>> {
        const existingSimulatorWebgl = await this.getSimulatorWebgl(id)
        if (!existingSimulatorWebgl.ok) {
            return { ok: false, err: { code: StoreErrorCode.notFound, msg: "simulatorWebgl not found" } }
        }
        const updatedSimulatorWebgl = { ...existingSimulatorWebgl.data, ...simulator }
        this.simulatorWebgls.set(id, updatedSimulatorWebgl.data as SimulatorWebgl)
        return { ok: true, data: updatedSimulatorWebgl.data as SimulatorWebgl }
    }
    async deleteSimulatorWebgl(id: number): Promise<ResultStore<SimulatorWebgl>> {
        const resultSimulatorWebgl = await this.getSimulatorWebgl(id)
        if (!resultSimulatorWebgl.ok) {
            return { ok: false, err: { code: StoreErrorCode.notFound, msg: "simulatorWebgl not found" } }
        }
        this.simulatorWebgls.delete(id)
        return resultSimulatorWebgl
    }

}
