import { SimulatorWebgl, SimulatorWebglCreate, SimulatorWebglCreatePrismaConverter } from '../types/db'
import { PrismaClient } from '@prisma/client'
import { SimulatorWebglStore } from "./simulator-webgl"

export class SimulatorWebglPrismaStore implements SimulatorWebglStore {
    private client: PrismaClient
    constructor(client: PrismaClient) {
        this.client = client
    }
    getSimulatorWebgl(id: string): SimulatorWebgl | null {
        let simulatorWebgl = null
        this.client.simulatorWebgl.findUnique({ where: { id } }).then((result) => {
            if (!result) {
                return
            }
            simulatorWebgl = result
        })
        return simulatorWebgl
    }
    getSimulatorWebglBySimulatorId(simulatorId: string): SimulatorWebgl[] {
        let simulatorWebgls: SimulatorWebgl[] = []
        this.client.simulatorWebgl.findMany({ where: { simulatorId } }).then((result) => {
            if (!result) {
                return
            }
            simulatorWebgls = result
        })
        return simulatorWebgls
    }
    getSimulatorWebgls(): SimulatorWebgl[] {
        let simulatorWebgls: SimulatorWebgl[] = []
        this.client.simulatorWebgl.findMany().then((result) => {
            if (!result) {
                return
            }
            simulatorWebgls = result
        })
        return simulatorWebgls
    }
    createSimulatorWebgl(simulatorWebgl: SimulatorWebglCreate): SimulatorWebgl | null {
        // Create the simulatorWebgl
        let simulatorResult = null
        let simulatorPrisma = SimulatorWebglCreatePrismaConverter(simulatorWebgl)
        this.client.simulatorWebgl.create({ data: simulatorPrisma }).then((result) => {
            if (!result) {
                return
            }
            simulatorResult = result
        })
        return simulatorResult
    }
    updateSimulatorWebgl(id: string, simulator: Partial<SimulatorWebgl>): SimulatorWebgl | null {
        let simulatorResult = null
        this.client.simulatorWebgl.update({ where: { id }, data: simulator }).then((result) => {
            if (!result) {
                return
            }
            simulatorResult = result
        })
        return simulatorResult
    }
    deleteSimulatorWebgl(id: string): SimulatorWebgl | null {
        let simulatorResult = null
        this.client.simulatorWebgl.delete({ where: { id } }).then((result) => {
            if (!result) {
                return
            }
            // Simulator deleted
            simulatorResult = result
        })
        return simulatorResult
    }
}
