import { randomUUID } from "crypto"
import { Simulator, SimulatorCreate } from "../types/db"
import { SimulatorStore } from "./simulator"
import { ResultStore, StoreErrorCode } from "../types/result"

export class SimulatorMemoryStore implements SimulatorStore {
    private simulators: Map<string, Simulator>
    constructor() {
        this.simulators = new Map<string, Simulator>()
    }
    async getSimulator(id: string): Promise<ResultStore<Simulator>> {
        const simulator = this.simulators.get(id)
        if (!simulator) {
            return { ok: false, err: { code: StoreErrorCode.notFound, msg: "simulator not found" } }
        }
        return { ok: true, data: simulator }
    }
    async getSimulatorsByCompanyId(companyId: string): Promise<ResultStore<Simulator[]>> {
        return { ok: true, data: Array.from(this.simulators.values()).filter(simulator => simulator.companyId === companyId) }
    }
    async getSimulators(): Promise<ResultStore<Simulator[]>> {
        return { ok: true, data: Array.from(this.simulators.values()) }
    }
    async createSimulator(simulator: SimulatorCreate): Promise<ResultStore<Simulator>> {
        let simulatorMemory = { ...simulator, id: randomUUID(), createdAt: new Date(), updatedAt: new Date() }
        if (this.simulators.has(simulatorMemory.id)) {
            // Simulator already exists
            return { ok: false, err: { code: StoreErrorCode.unique, msg: "simulator already exists" } }
        }
        this.simulators.set(simulatorMemory.id, simulatorMemory)
        return { ok: true, data: simulatorMemory }
    }
    async updateSimulator(id: string, simulator: Partial<Simulator>): Promise<ResultStore<Simulator>> {
        const existingSimulator = await this.getSimulator(id)
        if (!existingSimulator.ok) {
            return { ok: false, err: { code: StoreErrorCode.notFound, msg: "simulator not found" } }
        }
        const updatedSimulator = { ...existingSimulator.data!, ...simulator }
        this.simulators.set(id, updatedSimulator)
        return { ok: true, data: updatedSimulator }
    }
    async deleteSimulator(id: string): Promise<ResultStore<Simulator>> {
        const resultSimulator = await this.getSimulator(id)
        if (!resultSimulator.ok) {
            return { ok: false, err: { code: StoreErrorCode.notFound, msg: "simulator not found" } }
        }
        this.simulators.delete(id)
        return resultSimulator
    }
}

