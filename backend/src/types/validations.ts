import { z } from "zod"

export const idSchema = z.number({ message: "invalid id" })
.int({ message: "invalid id" })
.positive({ message: "invalid id" })
export const intCoerceSchema = z.coerce.number({ message: "invalid id" })

export const UserCreateDTOSchema = z.object({
    name: z.string()
        .min(1)
        .max(50, { message: "name must be at most 50 characters" }),
    email: z.string()
        .email(),
    password: z.string()
        .min(8, { message: "password must be at least 8 characters" })
        .max(25, { message: "password must be at most 25 characters" })
        .regex(/^[A-Za-z\d@$!%*?&]+$/, { message: "password can only contain letters, numbers and special characters @$!%*?&" }),
    profession: z.string()
        .min(5, { message: "profession must be at least 5 characters" })
        .max(25, { message: "Profession must be at most 25 characters" }),
    companyId: z.number()
        .int({ message: "invalid company ID" }).positive().optional(),
}).strict()

export const UserUpdateDTOSchema = UserCreateDTOSchema.partial()

export type UserCreateDTO = z.infer<typeof UserCreateDTOSchema>
export type UserUpdateDTO = z.infer<typeof UserUpdateDTOSchema>


export const CompanyCreateDTOSchema = z.object({
    name: z.string()
        .min(1)
        .max(50, { message: "name must be at most 50 characters" }),
    image: z.string()
        .url(),
    styleId: z.string(),
}).strict()

export const CompanyUpdateDTOSchema = CompanyCreateDTOSchema.partial()

export type CompanyCreateDTO = z.infer<typeof CompanyCreateDTOSchema>
export type CompanyUpdateDTO = z.infer<typeof CompanyUpdateDTOSchema>

export const SimulatorCreateDTOSchema = z.object({
    name: z.string()
        .min(1)
        .max(50, { message: "name must be at most 50 characters" }),
    description: z.string()
        .min(1)
        .max(250, { message: "description must be at most 250 characters" }),
    companyId: z.number({ message: "invalid company ID" })
        .int({ message: "invalid company ID" }).positive({ message: "invalid company ID" }),
}).strict()
export const SimulatorUpdateDTOSchema = SimulatorCreateDTOSchema.partial()
export type SimulatorCreateDTO = z.infer<typeof SimulatorCreateDTOSchema>
export type SimulatorUpdateDTO = z.infer<typeof SimulatorUpdateDTOSchema>
export const SimulatorWebglCreateDTOSchema = z.object({
    simulatorId: z.number().int().positive(),
    kind: z.string(),
    data: z.string(),
    wasm: z.string(),
    framework: z.string(),
    loader: z.string(),
}).strict()

export const SimulatorWebglUpdateDTOSchema = SimulatorWebglCreateDTOSchema.partial()
export type SimulatorWebglCreateDTO = z.infer<typeof SimulatorWebglCreateDTOSchema>
export type SimulatorWebglUpdateDTO = z.infer<typeof SimulatorWebglUpdateDTOSchema>
