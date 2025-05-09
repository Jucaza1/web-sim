import { SimulatorWebgl, SimulatorWebglCreate } from '../types/db'
import { ResultStore } from '../types/result'
import { PrismaClientSingleton } from './prisma-singleton'
import { SimulatorWebglMemoryStore } from './simulator-webgl-memory'
import { SimulatorWebglPrismaStore } from './simulator-webgl-prisma'

export interface SimulatorWebglStore {
    getSimulatorWebgl(id: number): Promise<ResultStore<SimulatorWebgl>>
    getSimulatorWebglBySimulatorId(simulatorId: number): Promise<ResultStore<SimulatorWebgl[]>>
    getSimulatorWebgls(): Promise<ResultStore<SimulatorWebgl[]>>
    createSimulatorWebgl(simulatorWebglCreate: SimulatorWebglCreate): Promise<ResultStore<SimulatorWebgl>>
    updateSimulatorWebgl(id: number, simulator: Partial<SimulatorWebgl>): Promise<ResultStore<SimulatorWebgl>>
    deleteSimulatorWebgl(id: number): Promise<ResultStore<SimulatorWebgl>>
}

export function SimulatorWebglStoreFactory(kind: string, _seed: boolean = false): SimulatorWebglStore {
    switch (kind) {
        case "memory":
            console.log("runing in-memory DB for simulatorWebgl")
            return new SimulatorWebglMemoryStore()
        case "postgresql":
            console.log("runing postgresql DB for simulatorWebgl")
            return new SimulatorWebglPrismaStore(PrismaClientSingleton.getInstance())
        default:
            console.log("runing in-memory DB for simulatorWebgl")
            return new SimulatorWebglMemoryStore()
    }
}
