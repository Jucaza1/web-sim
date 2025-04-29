import { SimulatorWebgl } from '../types/db'
import { SimulatorWebglStore } from "./simulator-webgl"

export class SimulatorWebglMemoryStore implements SimulatorWebglStore {
    private simulatorWebgls: Map<string, SimulatorWebgl>
    constructor() {
        this.simulatorWebgls = new Map<string, SimulatorWebgl>()
    }

    getSimulatorWebgl(id: string): SimulatorWebgl | null {
        return this.simulatorWebgls.get(id) || null
    }
    getSimulatorWebglBySimulatorId(simulatorId: string): SimulatorWebgl[] {
        return Array.from(this.simulatorWebgls.values()).filter(simulatorWebgl => simulatorWebgl.simulatorId === simulatorId)
    }
    getSimulatorWebgls(): SimulatorWebgl[] {
        return Array.from(this.simulatorWebgls.values())
    }
    createSimulatorWebgl(simulatorWebglCreate: SimulatorWebgl): SimulatorWebgl | null {
        let simulatorWebglMemory = { ...simulatorWebglCreate, id: crypto.randomUUID(), createdAt: new Date(), updatedAt: new Date() }
        if (this.simulatorWebgls.has(simulatorWebglMemory.id)) {
            // SimulatorWebgl already exists
            return null
        }
        this.simulatorWebgls.set(simulatorWebglMemory.id, simulatorWebglMemory)
        return simulatorWebglMemory
    }
    updateSimulatorWebgl(id: string, simulator: Partial<SimulatorWebgl>): SimulatorWebgl | null {
        const existingSimulatorWebgl = this.getSimulatorWebgl(id)
        if (!existingSimulatorWebgl) {
            return null
        }
        const updatedSimulatorWebgl = { ...existingSimulatorWebgl, ...simulator }
        this.simulatorWebgls.set(id, updatedSimulatorWebgl)
        return updatedSimulatorWebgl
    }
    deleteSimulatorWebgl(id: string): SimulatorWebgl | null {
        const resultSimulatorWebgl = this.getSimulatorWebgl(id)
        if (!resultSimulatorWebgl) {
            return null
        }
        this.simulatorWebgls.delete(id)
        return resultSimulatorWebgl
    }

}
