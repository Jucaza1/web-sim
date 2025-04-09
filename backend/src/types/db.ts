import {
    Prisma,
    User as User_prisma,
    Company as Company_prisma,
    Simulator as Simulator_prisma,
    SimulatorModel as SimulatorModel_prisma,

} from "@prisma/client"

export type User = User_prisma
export type Company = Company_prisma
export type Simulator = Simulator_prisma
export type SimulatorModel = SimulatorModel_prisma

export type UserCreate = Omit<Prisma.UserCreateInput, "company"> & { companyId: string }
export type CompanyCreate = Prisma.CompanyCreateInput
export type SimulatorCreate = Omit<Prisma.SimulatorCreateInput, "company"> & { companyId: string }
export type SimulatorModelCreate = Omit<Prisma.SimulatorModelCreateInput, "company" | "simulator"> & { companyId: string, simulatorId: string }


// Prisma creation type converter functions

export function UserCreatePrismaConverter(user: UserCreate): Prisma.UserCreateInput{
    return {
        name: user.name,
        email: user.email,
        password: user.password,
        isActive: true,
        profession: user.profession,
        company:{
            connect: {
                id: user.companyId
            }
        }
    }
}

export function SimulatorCreatePrismaConverter(simulator: SimulatorCreate): Prisma.SimulatorCreateInput{
    return {
        name: simulator.name,
        description: simulator.description,
        company:{
            connect: {
                id: simulator.companyId
            }
        }
    }
}

export function SimulatorModelCreatePrismaConverter(simulatorModel: SimulatorModelCreate): Prisma.SimulatorModelCreateInput{
    return {
        name: simulatorModel.name,
        description: simulatorModel.description,
        image: simulatorModel.image,
        webglUrl: simulatorModel.webglUrl,
        company:{
            connect: {
                id: simulatorModel.companyId
            }
        },
        simulator:{
            connect: {
                id: simulatorModel.simulatorId
            }
        },
    }
}
