import { randomUUID } from "crypto"
import { Simulator, SimulatorCreate } from "../types/db"
import { SimulatorStore } from "./simulator"

export class SimulatorMemoryStore implements SimulatorStore {
    private simulators: Map<string, Simulator>
    constructor() {
        this.simulators = new Map<string, Simulator>()
    }

    getSimulator(id: string): Simulator | null {
        const simulator = this.simulators.get(id)
        return simulator || null
    }

    getSimulatorsByCompanyId(companyId: string): Simulator[] {
        return Array.from(this.simulators.values()).filter(simulator => simulator.companyId === companyId)
    }
    getSimulators(): Simulator[] {
        return Array.from(this.simulators.values())
    }
    createSimulator(simulator: SimulatorCreate): Simulator | null {
        let simulatorMemory = { ...simulator, id: randomUUID() }
        if (this.simulators.has(simulatorMemory.id)) {
            // Simulator already exists
            return null
        }
        this.simulators.set(simulatorMemory.id, simulatorMemory)
        return simulatorMemory
    }
    updateSimulator(id: string, simulator: Partial<Simulator>): Simulator | null {
        const existingSimulator = this.getSimulator(id)
        if (!existingSimulator) {
            return null
        }
        const updatedSimulator = { ...existingSimulator, ...simulator }
        this.simulators.set(id, updatedSimulator)
        return updatedSimulator
    }
    deleteSimulator(id: string): Simulator | null {
        const resultSimulator = this.getSimulator(id)
        if (!resultSimulator) {
            return null
        }
        this.simulators.delete(id)
        return resultSimulator
    }
}

