export interface Simulator {
    id:          number
    name:        string
    companyId:   number
    description: string
    thumbnail:   string
    createdAt:   Date
    updatedAt:   Date
    ready:       boolean
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
export type User = {
    id:         number;
    email:      string;
    name:       string;
    password:   string;
    profession: string;
    companyId:  number;
    createdAt:  Date;
    updatedAt:  Date;
    isActive:   boolean;
    role:       "USER" | "ADMIN" | "ADMIN_COMPANY";
}
