import { Role } from "./db"

export type Payload = {
    id: number
    role: Role
    company: number | null
}
