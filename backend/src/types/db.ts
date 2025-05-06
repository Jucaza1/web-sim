import {
    Prisma,
    User as User_prisma,
    Company as Company_prisma,
    Simulator as Simulator_prisma,
    SimulatorWebgl as SimulatorWebgl_prisma

} from "@prisma/client"

export type User = User_prisma
export type Company = Company_prisma
export type Simulator = Simulator_prisma
export type SimulatorWebgl = SimulatorWebgl_prisma

export type UserCreate = Omit<Prisma.UserCreateInput, "company"> & { companyId?: string }
export type CompanyCreate = Prisma.CompanyCreateInput
export type SimulatorCreate = Omit<Prisma.SimulatorCreateInput, "company" | "simulatorWebgl"> & { companyId: string }
export type SimulatorWebglCreate = Omit<Prisma.SimulatorWebglCreateInput, "simulator"> & { simulatorId: string }

export type CompanyIdName = {id: string, name: string}

// Prisma creation type converter functions

export function UserCreatePrismaConverter(user: UserCreate): Prisma.UserCreateInput {
    if (user.companyId === null || user.companyId === undefined) {
        return {
            name: user.name,
            email: user.email,
            password: user.password,
            isActive: true,
            profession: user.profession,
        }
    }
    return {
        name: user.name,
        email: user.email,
        password: user.password,
        isActive: true,
        profession: user.profession,
        company: {
            connect: {
                id: user.companyId
            }
        }
    }
}

export function SimulatorCreatePrismaConverter(simulator: SimulatorCreate): Prisma.SimulatorCreateInput {
    return {
        name: simulator.name,
        description: simulator.description,
        company: {
            connect: {
                id: simulator.companyId
            }
        }
    }
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
