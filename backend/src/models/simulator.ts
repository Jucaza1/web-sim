import { Simulator, SimulatorCreate } from '../types/db'
import { ResultStore } from '../types/result'
import { PrismaClientSingleton } from './prisma-singleton'
import { SimulatorMemoryStore } from './simulator-memory'
import { SimulatorPrismaStore } from './simulator-prisma'

export interface SimulatorStore {
    getSimulator(id: string): Promise<ResultStore<Simulator>>
    getSimulatorsByCompanyId(companyId: string): Promise<ResultStore<Simulator[]>>
    getSimulators(): Promise<ResultStore<Simulator[]>>
    createSimulator(simulator: SimulatorCreate): Promise<ResultStore<Simulator>>
    updateSimulator(id: string, simulator: Partial<Simulator>): Promise<ResultStore<Simulator>>
    deleteSimulator(id: string): Promise<ResultStore<Simulator>>
}
export function SimulatorStoreFactory(kind: string, _seed: boolean = false): SimulatorStore {
    switch (kind) {
        case "memory":
            console.log("runing in-memory DB for simulator")
            return new SimulatorMemoryStore()
        case "postgresql":
            console.log("runing postgresql DB for simulator")
            return new SimulatorPrismaStore(PrismaClientSingleton.getInstance())
        default:
            console.log("runing in-memory DB for simulator")
            return new SimulatorMemoryStore()
    }
}
