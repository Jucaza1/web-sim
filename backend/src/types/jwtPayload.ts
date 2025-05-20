import { Role } from "./db"

export type Payload = {
    id: number
    name: string
    role: Role
    company: number | null
}
