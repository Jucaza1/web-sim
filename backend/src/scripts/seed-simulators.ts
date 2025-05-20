import { simulatorService, simulatorWebglService } from "../app"
import { simulatorData } from "./simulators"
import { SimulatorCreate, SimulatorWebglCreate } from "../types/db"

type SimulatorData = Array<{
    simulator: SimulatorCreate,
    webgl: SimulatorWebglCreate
}>
const data: SimulatorData = simulatorData as SimulatorData

export async function seedSimulators() {
    if (data.length == 0) {
        console.log("error no simulators to seed")
        return
    }
    for (const d of data) {
        const { simulator, webgl } = d
        const createdSimulator = await simulatorService.createSimulator(simulator)
        if (!createdSimulator.ok) {
            console.log(`error creating simulator with name ${simulator.name}`, createdSimulator.err)
            continue
        }
        const createdWebgl = await simulatorWebglService.createWebgl({ ...webgl, simulatorId: createdSimulator.data!.id })
        if (!createdWebgl.ok) {
            console.log(`error creating webgl for simulator with id ${createdSimulator.data!.id}`, createdWebgl.err)
            continue
        }
    }
}
