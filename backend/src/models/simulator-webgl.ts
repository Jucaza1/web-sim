import { SimulatorWebgl, SimulatorWebglCreate, SimulatorWebglUpdate } from '../types/db'
import { ResultStore } from '../types/result'
import { PrismaClientSingleton } from './prisma-singleton'
import { SimulatorWebglMemoryStore } from './simulator-webgl-memory'
import { SimulatorWebglPrismaStore } from './simulator-webgl-prisma'
import logger from "../logger"

export interface SimulatorWebglStore {
    getSimulatorWebgl(id: number): Promise<ResultStore<SimulatorWebgl>>
    getSimulatorWebglBySimulatorId(simulatorId: number): Promise<ResultStore<SimulatorWebgl>>
    getSimulatorWebgls(): Promise<ResultStore<SimulatorWebgl[]>>
    createSimulatorWebgl(simulatorWebglCreate: SimulatorWebglCreate): Promise<ResultStore<SimulatorWebgl>>
    updateSimulatorWebgl(id: number, simulator: SimulatorWebglUpdate): Promise<ResultStore<SimulatorWebgl>>
    deleteSimulatorWebgl(id: number): Promise<ResultStore<SimulatorWebgl>>
}

export function SimulatorWebglStoreFactory(kind: string, _seed: boolean = false): SimulatorWebglStore {
    switch (kind) {
        case "memory":
            logger.debug("runing in-memory DB for simulatorWebgl")
            return new SimulatorWebglMemoryStore()
        case "postgresql":
            logger.debug("runing postgresql DB for simulatorWebgl")
            return new SimulatorWebglPrismaStore(PrismaClientSingleton.getInstance())
        default:
            logger.debug("runing in-memory DB for simulatorWebgl")
            return new SimulatorWebglMemoryStore()
    }
}
