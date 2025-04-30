import { SimulatorWebgl } from '../types/db'
import { ResultStore } from '../types/result'

export interface SimulatorWebglStore {
    getSimulatorWebgl(id: string): Promise<ResultStore<SimulatorWebgl>>
    getSimulatorWebglBySimulatorId(simulatorModelId: string): Promise<ResultStore<SimulatorWebgl[]>>
    getSimulatorWebgls(): Promise<ResultStore<SimulatorWebgl[]>>
    createSimulatorWebgl(simulatorModelCreate: SimulatorWebgl): Promise<ResultStore<SimulatorWebgl>>
    updateSimulatorWebgl(id: string, simulator: Partial<SimulatorWebgl>): Promise<ResultStore<SimulatorWebgl>>
    deleteSimulatorWebgl(id: string): Promise<ResultStore<SimulatorWebgl>>
}
