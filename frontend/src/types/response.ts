export interface Simulator {
    id:          number
    name:        string
    companyId:   number
    description: string
    thumbnail:   string
    createdAt:   Date
    updatedAt:   Date
}
export interface SimulatorWebgl {
    id:          number
    kind:        string
    simulatorId: number
    data:        string
    loader:      string
    wasm:        string
    framework:   string
    createdAt:   Date
    updatedAt:   Date
}