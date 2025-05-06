import { PrismaClient } from '@prisma/client'
import { SimulatorStore } from "./simulator"
import { Simulator, SimulatorCreate, SimulatorCreatePrismaConverter } from '../types/db'
import { ResultStore, StoreErrorCode } from '../types/result'
import { prismaCatchToStoreError } from '../types/exceptions'

export class SimulatorPrismaStore implements SimulatorStore {
    private client: PrismaClient
    constructor(client: PrismaClient) {
        this.client = client
        this.getSimulator = this.getSimulator.bind(this)
        this.getSimulators = this.getSimulators.bind(this)
        this.getSimulatorsByCompanyId = this.getSimulatorsByCompanyId.bind(this)
        this.createSimulator = this.createSimulator.bind(this)
        this.updateSimulator = this.updateSimulator.bind(this)
        this.deleteSimulator = this.deleteSimulator.bind(this)
    }
    async getSimulator(id: string): Promise<ResultStore<Simulator>> {
        let simulator: Simulator | null
        try {
            simulator = await this.client.simulator.findUnique({ where: { id } })
        }
        catch (e) {
            return { ok: false, err: { code: prismaCatchToStoreError(e), msg: "internal server error" }, exception: e as Error }
        }
        if (!simulator) {
            return { ok: false, err: { code: StoreErrorCode.notFound, msg: "simulator not found" } }
        }
        return { ok: true, data: simulator }
    }
    async getSimulatorsByCompanyId(companyId: string): Promise<ResultStore<Simulator[]>> {
        let simulators: Simulator[] = []
        try {
            simulators = await this.client.simulator.findMany({ where: { companyId } })
        }
        catch (e) {
            // TODO: handle wrong companyId
            return { ok: false, err: { code: prismaCatchToStoreError(e), msg: "internal server error" }, exception: e as Error }
        }
        return { ok: true, data: simulators }
    }
    async getSimulators(): Promise<ResultStore<Simulator[]>> {
        let simulators: Simulator[] = []
        try {
            simulators = await this.client.simulator.findMany()
        } catch (e) {
            return { ok: false, err: { code: prismaCatchToStoreError(e), msg: "internal server error" }, exception: e as Error }
        }
        return { ok: true, data: simulators }
    }
    async createSimulator(simulator: SimulatorCreate): Promise<ResultStore<Simulator>> {
        // Create the simulator
        let simulatorResult: Simulator | null
        const simulatorPrisma = SimulatorCreatePrismaConverter(simulator)
        try {
            simulatorResult = await this.client.simulator.create({ data: simulatorPrisma })
        }
        catch (e) {
            return { ok: false, err: { code: prismaCatchToStoreError(e), msg: "simulator already exists" }, exception: e as Error }
        }
        if (!simulatorResult) {
            return { ok: false, err: { code: StoreErrorCode.unknown, msg: "internal server error" } }
        }
        return { ok: true, data: simulatorResult }
    }
    async updateSimulator(id: string, simulator: Partial<Simulator>): Promise<ResultStore<Simulator>> {
        let simulatorResult: Simulator | null
        try {
            simulatorResult = await this.client.simulator.update({ where: { id }, data: simulator })
        }
        catch (e) {
            return { ok: false, err: { code: prismaCatchToStoreError(e), msg: "internal server error" }, exception: e as Error }
        }
        if (!simulatorResult) {
            return { ok: false, err: { code: StoreErrorCode.notFound, msg: "simulator not found" } }
        }
        return { ok: true, data: simulatorResult }
    }
    async deleteSimulator(id: string): Promise<ResultStore<Simulator>> {
        let simulatorResult: Simulator | null
        try {
            simulatorResult = await this.client.simulator.delete({ where: { id } })
        }
        catch (e) {
            return { ok: false, err: { code: prismaCatchToStoreError(e), msg: "internal server error" }, exception: e as Error }
        }
        if (!simulatorResult) {
            return { ok: false, err: { code: StoreErrorCode.notFound, msg: "simulator not found" } }
        }
        return { ok: true, data: simulatorResult }
    }
}
