import { SimulatorModel, SimulatorModelCreate, SimulatorModelCreatePrismaConverter } from '../types/db'
import { PrismaClient } from '@prisma/client'
import { SimulatorModelStore } from "./simulator_model"

export class SimulatorModelPrismaStore implements SimulatorModelStore {
    private client: PrismaClient
    constructor(client: PrismaClient) {
        this.client = client
    }
    getSimulatorModel(id: string): SimulatorModel | null {
        let simulatorModel = null
        this.client.simulatorModel.findUnique({ where: { id } }).then((result) => {
            if (!result) {
                return
            }
            simulatorModel = result
        })
        return simulatorModel
    }
    getSimulatorModelsByCompanyId(companyId: string): SimulatorModel[] {
        let simulatorModels: SimulatorModel[] = []
        this.client.simulatorModel.findMany({ where: { companyId } }).then((result) => {
            if (!result) {
                return
            }
            simulatorModels = result
        })
        return simulatorModels
    }
    getSimulatorModelsBySimulatorId(simulatorId: string): SimulatorModel[] {
        let simulatorModels: SimulatorModel[] = []
        this.client.simulatorModel.findMany({ where: { simulatorId } }).then((result) => {
            if (!result) {
                return
            }
            simulatorModels = result
        })
        return simulatorModels
    }
    getSimulatorModels(): SimulatorModel[] {
        let simulatorModels: SimulatorModel[] = []
        this.client.simulatorModel.findMany().then((result) => {
            if (!result) {
                return
            }
            simulatorModels = result
        })
        return simulatorModels
    }
    createSimulatorModel(simulator: SimulatorModelCreate): SimulatorModel | null {
        // Create the simulator
        let simulatorResult = null
        let simulatorPrisma = SimulatorModelCreatePrismaConverter(simulator)
        this.client.simulatorModel.create({ data: simulatorPrisma }).then((result) => {
            if (!result) {
                return
            }
            simulatorResult = result
        })
        return simulatorResult
    }
    updateSimulatorModel(id: string, simulator: Partial<SimulatorModel>): SimulatorModel | null {
        let simulatorResult = null
        this.client.simulatorModel.update({ where: { id }, data: simulator }).then((result) => {
            if (!result) {
                return
            }
            simulatorResult = result
        })
        return simulatorResult
    }
    deleteSimulatorModel(id: string): SimulatorModel | null {
        let simulatorResult = null
        this.client.simulatorModel.delete({ where: { id } }).then((result) => {
            if (!result) {
                return
            }
            // Simulator deleted
            simulatorResult = result
        })
        return simulatorResult
    }
}
