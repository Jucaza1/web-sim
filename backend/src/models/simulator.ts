import { Simulator, SimulatorCreate } from '../types/db'

export interface SimulatorStore {
    getSimulator(id: string): Simulator | null
    getSimulatorsByCompanyId(companyId: string): Simulator[]
    getSimulators(): Simulator[]
    createSimulator(simulator: SimulatorCreate): Simulator | null
    updateSimulator(id: string, simulator: Partial<Simulator>): Simulator | null
    deleteSimulator(id: string): Simulator | null
}
