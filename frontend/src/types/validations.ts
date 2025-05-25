import { z } from "zod"

const UserCreateDTOSchema = z.object({
    name: z.string()
        .min(1,{ message: "Name must be at least 1 character"})
        .max(50, { message: "Name must be at most 50 characters" }),
    email: z.string()
        .email({message: "Invalid email address"}),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters" })
        .max(25, { message: "Password must be at most 25 characters" })
        .regex(/^[A-Za-z\d@$!%*?&]+$/, { message: "Password can only contain letters, numbers and special characters @$!%*?&" }),
    confirmPassword: z.string(),
    profession: z.string()
        .min(5, { message: "Profession must be at least 5 characters" })
        .max(25, { message: "Profession must be at most 25 characters" }),
    companyId: z.number({ message: "Invalid company ID" }).optional(),
})
export const UserCreateSchema = UserCreateDTOSchema
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"], // Optional: points error at confirmPassword
});
// Aplico la validación en un nuevo esquema para evitar que se repita el código
//export const UserCreateDTOSchema = UserCreateDTOSchema.strict()
export const UserUpdateDTOSchema = UserCreateDTOSchema.partial()
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"], // Optional: points error at confirmPassword
});

export type UserCreateDTO = z.infer<typeof UserCreateSchema>
export type UserUpdateDTO = z.infer<typeof UserUpdateDTOSchema>


export const CompanyCreateDTOSchema = z.object({
    name: z.string()
        .min(1)
        .max(50, { message: "Name must be at most 50 characters" }),
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
        .max(50, { message: "Name must be at most 50 characters" }),
    description: z.string()
        .min(1)
        .max(250, { message: "Description must be at most 250 characters" }),
    companyId: z.string({ message: "Invalid company ID" }),
}).strict()
export const SimulatorUpdateDTOSchema = SimulatorCreateDTOSchema.partial()
export type SimulatorCreateDTO = z.infer<typeof SimulatorCreateDTOSchema>
export type SimulatorUpdateDTO = z.infer<typeof SimulatorUpdateDTOSchema>
export const SimulatorWebglCreateDTOSchema = z.object({
    simulatorId: z.string().uuid(),
    kind: z.string(),
    data: z.string(),
    wasm: z.string(),
    framework: z.string(),
    loader: z.string(),
}).strict()

export const SimulatorWebglUpdateDTOSchema = SimulatorWebglCreateDTOSchema.partial()
export type SimulatorWebglCreateDTO = z.infer<typeof SimulatorWebglCreateDTOSchema>
export type SimulatorWebglUpdateDTO = z.infer<typeof SimulatorWebglUpdateDTOSchema>
