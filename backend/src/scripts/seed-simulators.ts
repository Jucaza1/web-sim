import { simulatorService, simulatorWebglService } from "../app"
import simulatordata from "./simulators.json"
import { SimulatorCreate, SimulatorWebglCreate } from "../types/db"

type SimulatorData = Array<{
    simulator: SimulatorCreate,
    webgl: SimulatorWebglCreate
}>
const simulatorData: SimulatorData = simulatordata as SimulatorData

export async function seedSimulators() {
    if (simulatorData.length = 0) {
        console.log("error no simulators to seed")
        return
    }
    for (const data of simulatorData) {
        const { simulator, webgl } = data
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
