import { Simulator, SimulatorCreate, SimulatorUpdate } from '../types/db'
import { ResultStore } from '../types/result'
import { PrismaClientSingleton } from './prisma-singleton'
import { SimulatorMemoryStore } from './simulator-memory'
import { SimulatorPrismaStore } from './simulator-prisma'
import logger from "../logger"

export interface SimulatorStore {
    getSimulator(id: number): Promise<ResultStore<Simulator>>
    getSimulatorsByCompanyId(companyId: number): Promise<ResultStore<Simulator[]>>
    getSimulators(): Promise<ResultStore<Simulator[]>>
    createSimulator(simulator: SimulatorCreate): Promise<ResultStore<Simulator>>
    updateSimulator(id: number, simulator: SimulatorUpdate): Promise<ResultStore<Simulator>>
    deleteSimulator(id: number): Promise<ResultStore<Simulator>>
}
export function SimulatorStoreFactory(kind: string, _seed: boolean = false): SimulatorStore {
    switch (kind) {
        case "memory":
            logger.debug("runing in-memory DB for simulator")
            return new SimulatorMemoryStore()
        case "postgresql":
            logger.debug("runing postgresql DB for simulator")
            return new SimulatorPrismaStore(PrismaClientSingleton.getInstance())
        default:
            logger.debug("runing in-memory DB for simulator")
            return new SimulatorMemoryStore()
    }
}
