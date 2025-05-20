import {
    Prisma,
    User as User_prisma,
    Company as Company_prisma,
    Simulator as Simulator_prisma,
    SimulatorWebgl as SimulatorWebgl_prisma,
    Role as Role_prisma

} from "@prisma/client"

export type User = User_prisma
export type Company = Company_prisma
export type Simulator = Simulator_prisma
export type SimulatorWebgl = SimulatorWebgl_prisma
export type Role = Role_prisma

type Pretty<T> = {
    [K in keyof T]: T[K]
}
export type UserCreate = Pretty<Omit<Prisma.UserCreateInput, "role" | "company" | "updateAt" | "createAt"> & { companyId?: number }>
export type UserUpdate = Pretty<Omit<Prisma.UserUpdateInput, "role" | "company" | "updateAt" | "createAt"> & { companyId?: number }>
export type CompanyCreate = Pretty<Omit<Prisma.CompanyCreateInput, "createdAt" | "updatedAt" | "users" | "simulators">>
export type CompanyUpdate = Pretty<Omit<Prisma.CompanyUpdateInput, "updateAt" | "createAt">>
export type SimulatorCreate = Pretty<Omit<Prisma.SimulatorCreateInput, "company" | "simulatorWebgl" | "updateAt" | "createAt"> & { companyId?: number }>
export type SimulatorUpdate = Pretty<Omit<Prisma.SimulatorUpdateInput, "company" | "simulatorWebgl" | "updateAt" | "createAt"> & { companyId?: number }>
export type SimulatorWebglCreate = Pretty<Omit<Prisma.SimulatorWebglCreateInput, "simulator"> & { simulatorId: number }>
export type SimulatorWebglUpdate = Pretty<Omit<Prisma.SimulatorWebglUpdateInput, "simulator"> & { simulatorId?: number }>

export type CompanyIdName = { id: number, name: string }

// Prisma creation type converter functions

export function UserCreatePrismaConverter(user: UserCreate, role: Role = "USER"): Prisma.UserCreateInput {
    let output: Prisma.UserCreateInput = {
        name: user.name,
        email: user.email,
        password: user.password,
        isActive: true,
        profession: user.profession,
        role: role,
    }
    if (user.companyId !== null && user.companyId !== undefined) {
        output.company = {
            connect: {
                id: user.companyId
            }
        }
    }
    return output
}
export function UserUpdatePrismaConverter(user: UserUpdate): Prisma.UserUpdateInput {
    let output: Prisma.UserUpdateInput = {}
    if (user.name) {
        output.name = user.name as string
    }
    if (user.email) {
        output.email = user.email as string
    }
    if (user.password) {
        output.password = user.password as string
    }
    if (user.profession) {
        output.profession = user.profession as string
    }
    if (user.companyId) {
        output.company = {
            connect: {
                id: user.companyId
            }
        }
    }
    return output
}

export function SimulatorCreatePrismaConverter(simulator: SimulatorCreate): Prisma.SimulatorCreateInput {
    let output: Prisma.SimulatorCreateInput = {
        name: simulator.name,
        description: simulator.description,
        thumbnail: simulator.thumbnail,
    }
    if (simulator.companyId) {
        output.company = {
            connect: {
                id: simulator.companyId
            }
        }
    }
    return output
}
export function SimulatorUpdatePrismaConverter(simulator: SimulatorUpdate): Prisma.SimulatorUpdateInput {
    let output: Prisma.SimulatorUpdateInput = {}
    if (simulator.name) {
        output.name = simulator.name as string
    }
    if (simulator.description) {
        output.description = simulator.description as string
    }
    if (simulator.companyId) {
        output.company = {
            connect: {
                id: simulator.companyId
            }
        }
    }
    if (simulator.thumbnail) {
        output.thumbnail = simulator.thumbnail
    }
    return output
}

export function SimulatorWebglCreatePrismaConverter(simulatorWebglCreate: SimulatorWebglCreate): Prisma.SimulatorWebglCreateInput {
    return {
        kind: simulatorWebglCreate.kind ?? "webgl",
        data: simulatorWebglCreate.data,
        wasm: simulatorWebglCreate.wasm,
        framework: simulatorWebglCreate.framework,
        loader: simulatorWebglCreate.loader,
        simulator: {
            connect: {
                id: simulatorWebglCreate.simulatorId
            }
        },
    }
}
export function SimulatorWebglUpdatePrismaConverter(simulatorWebglUpdate: SimulatorWebglUpdate): Prisma.SimulatorWebglUpdateInput {
    let output: Prisma.SimulatorWebglUpdateInput = {}
    if (simulatorWebglUpdate.kind) {
        output.kind = simulatorWebglUpdate.kind
    }
    if (simulatorWebglUpdate.data) {
        output.data = simulatorWebglUpdate.data
    }
    if (simulatorWebglUpdate.wasm) {
        output.wasm = simulatorWebglUpdate.wasm
    }
    if (simulatorWebglUpdate.framework) {
        output.framework = simulatorWebglUpdate.framework
    }
    if (simulatorWebglUpdate.loader) {
        output.loader = simulatorWebglUpdate.loader
    }
    if (simulatorWebglUpdate.simulatorId) {
        output.simulator = {
            connect: {
                id: simulatorWebglUpdate.simulatorId
            }
        }
    }
    return output
}
