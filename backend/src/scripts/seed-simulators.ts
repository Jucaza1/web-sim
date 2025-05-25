import { simulatorService, simulatorWebglService } from "../app"
import { simulatorData } from "./simulators"
import { SimulatorCreate, SimulatorWebglCreate } from "../types/db"
import pino from "pino"

type SimulatorData = Array<{
    simulator: SimulatorCreate,
    webgl: SimulatorWebglCreate
}>
const data: SimulatorData = simulatorData as SimulatorData

export async function seedSimulators(logger: pino.Logger) {
    if (data.length == 0) {
        logger.error("error no simulators to seed")
        return
    }
    for (const d of data) {
        const { simulator, webgl } = d
        let createdSimulator = await simulatorService.createSimulator(simulator)
        if (!createdSimulator.ok) {
            logger.error({ error: createdSimulator.err, exception: createdSimulator.exception }, `error creating simulator with name ${simulator.name}`)
            createdSimulator = await simulatorService.getSimulatorByName(d.simulator.name)
            if (createdSimulator.ok && createdSimulator.data?.ready === true) {
                logger.error(`skiping webgl insertion for ${simulator.name}`)
                continue
            }
        }
        if (d.webgl) {
            const createdWebgl = await simulatorWebglService.createWebgl({ ...webgl, simulatorId: createdSimulator.data!.id })
            if (!createdWebgl.ok) {
                logger.error({ error: createdWebgl.err, exception: createdWebgl.exception }, `error creating webgl for simulator with ${createdSimulator.data!.id}`)
                continue
            }
        }
    }
}
