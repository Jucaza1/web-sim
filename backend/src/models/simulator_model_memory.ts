import { SimulatorModel, SimulatorModelCreate } from '../types/db'
import { SimulatorModelStore } from "./simulator_model"

export class SimulatorModelMemoryStore implements SimulatorModelStore {
    private simulatorModels: Map<string, SimulatorModel>
    constructor() {
        this.simulatorModels = new Map<string, SimulatorModel>()
    }

    getSimulatorModel(id: string): SimulatorModel | null {
        return this.simulatorModels.get(id) || null
    }
    getSimulatorModelsByCompanyId(companyId: string): SimulatorModel[] {
        return Array.from(this.simulatorModels.values()).filter(simulatorModel => simulatorModel.companyId === companyId)
    }
    getSimulatorModelsBySimulatorId(simulatorModelId: string): SimulatorModel[] {
        return Array.from(this.simulatorModels.values()).filter(simulatorModel => simulatorModel.simulatorId === simulatorModelId)
    }
    getSimulatorModels(): SimulatorModel[] {
        return Array.from(this.simulatorModels.values())
    }
    createSimulatorModel(simulatorModelCreate: SimulatorModelCreate): SimulatorModel | null {
        let simulatorModelMemory = { ...simulatorModelCreate, id: crypto.randomUUID(), createdAt: new Date(), updatedAt: new Date() }
        if (this.simulatorModels.has(simulatorModelMemory.id)) {
            // Simulator model already exists
            return null
        }
        this.simulatorModels.set(simulatorModelMemory.id, simulatorModelMemory)
        return simulatorModelMemory
    }
    updateSimulatorModel(id: string, simulator: Partial<SimulatorModel>): SimulatorModel | null {
        const existingSimulatorModel = this.getSimulatorModel(id)
        if (!existingSimulatorModel) {
            return null
        }
        const updatedSimulatorModel = { ...existingSimulatorModel, ...simulator }
        this.simulatorModels.set(id, updatedSimulatorModel)
        return updatedSimulatorModel
    }
    deleteSimulatorModel(id: string): SimulatorModel | null {
        const resultSimulatorModel = this.getSimulatorModel(id)
        if (!resultSimulatorModel) {
            return null
        }
        this.simulatorModels.delete(id)
        return resultSimulatorModel
    }

}
