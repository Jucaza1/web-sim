import { SimulatorModel, SimulatorModelCreate } from '../types/db'

export interface SimulatorModelStore {
    getSimulatorModel(id: string): SimulatorModel | null
    getSimulatorModelsByCompanyId(companyId: string): SimulatorModel[]
    getSimulatorModelsBySimulatorId(simulatorModelId: string): SimulatorModel[]
    getSimulatorModels(): SimulatorModel[]
    createSimulatorModel(simulatorModelCreate: SimulatorModelCreate): SimulatorModel | null
    updateSimulatorModel(id: string, simulator: Partial<SimulatorModel>): SimulatorModel | null
    deleteSimulatorModel(id: string): SimulatorModel | null
}
