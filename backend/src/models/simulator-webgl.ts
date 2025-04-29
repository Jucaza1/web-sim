import { SimulatorWebgl } from '../types/db'

export interface SimulatorWebglStore {
    getSimulatorWebgl(id: string): SimulatorWebgl | null
    getSimulatorWebglBySimulatorId(simulatorModelId: string): SimulatorWebgl[]
    getSimulatorWebgls(): SimulatorWebgl[]
    createSimulatorWebgl(simulatorModelCreate: SimulatorWebgl): SimulatorWebgl | null
    updateSimulatorWebgl(id: string, simulator: Partial<SimulatorWebgl>): SimulatorWebgl | null
    deleteSimulatorWebgl(id: string): SimulatorWebgl | null
}
