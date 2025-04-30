import { Simulator, SimulatorCreate } from '../types/db'
import { ResultStore } from '../types/result'

export interface SimulatorStore {
    getSimulator(id: string): Promise<ResultStore<Simulator>>
    getSimulatorsByCompanyId(companyId: string): Promise<ResultStore<Simulator[]>>
    getSimulators(): Promise<ResultStore<Simulator[]>>
    createSimulator(simulator: SimulatorCreate): Promise<ResultStore<Simulator>>
    updateSimulator(id: string, simulator: Partial<Simulator>): Promise<ResultStore<Simulator>>
    deleteSimulator(id: string): Promise<ResultStore<Simulator>>
}
