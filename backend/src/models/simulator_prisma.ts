import { PrismaClient } from '@prisma/client'
import { SimulatorStore } from "./simulator"
import { Simulator, SimulatorCreate, SimulatorCreatePrismaConverter } from '../types/db'

export class SimulatorPrismaStore implements SimulatorStore {
    private client: PrismaClient
    constructor(client: PrismaClient) {
        this.client = client
    }
    getSimulator(id: string): Simulator | null {
        let simulator = null
        this.client.simulator.findUnique({ where: { id } }).then((result) => {
            if (!result) {
                return
            }
            simulator = result
        })
        return simulator
    }
    getSimulatorsByCompanyId(companyId: string): Simulator[] {
        let simulators: Simulator[] = []
        this.client.simulator.findMany({ where: { companyId } }).then((result) => {
            if (!result) {
                return
            }
            simulators = result
        })
        return simulators
    }
    getSimulators(): Simulator[] {
        let simulators: Simulator[] = []
        this.client.simulator.findMany().then((result) => {
            if (!result) {
                return
            }
            simulators = result
        })
        return simulators
    }
    createSimulator(simulator: SimulatorCreate): Simulator | null {
        // Create the simulator
        let simulatorResult = null
        let simulatorPrisma = SimulatorCreatePrismaConverter(simulator)
        this.client.simulator.create({ data: simulatorPrisma }).then((result) => {
            if (!result) {
                return
            }
            simulatorResult = result
        })
        return simulatorResult
    }
    updateSimulator(id: string, simulator: Partial<Simulator>): Simulator | null {
        let simulatorResult = null
        this.client.simulator.update({ where: { id }, data: simulator }).then((result) => {
            if (!result) {
                return
            }
            simulatorResult = result
        })
        return simulatorResult
    }
    deleteSimulator(id: string): Simulator | null {
        let simulatorResult = null
        this.client.simulator.delete({ where: { id } }).then((result) => {
            if (!result) {
                return
            }
            // Simulator deleted
            simulatorResult = result
        })
        return simulatorResult
    }
}
