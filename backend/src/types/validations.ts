import { z } from "zod"

// model User {
// id         String   @id @default(cuid())
// name       String
// email      String   @unique
// password   String
// profession String
// companyId  String   @map("company_id")
// createdAt  DateTime @default(now()) @map("created_at")
// isActive   Boolean  @default(true) @map("is_active")
// }

export const UserCreateDTOSchema = z.object({
    name: z.string()
        .min(1)
        .max(50, { message: "Name must be at most 50 characters" }),
    email: z.string()
        .email(),
    password: z.string()
        .min(8, { message: "Password must be at least 8 characters" })
        .max(25, { message: "Password must be at most 25 characters" })
        .regex(/^[A-Za-z\d@$!%*?&]+$/, { message: "Password can only contain letters, numbers and special characters @$!%*?&" }),
    profession: z.string()
        .min(5, { message: "Profession must be at least 5 characters" })
        .max(25, { message: "Profession must be at most 25 characters" }),
    companyId: z.string()
        .uuid({ message: "Invalid company ID" }),
}).strict()

export const UserUpdateDTOSchema = UserCreateDTOSchema.partial()

export type UserCreateDTO = z.infer<typeof UserCreateDTOSchema>
export type UserUpdateDTO = z.infer<typeof UserUpdateDTOSchema>

// model Company {
    // id              String           @id @default(cuid())
    // name            String           @unique
    // image           String
    // styleId         String           @map("style_id")
    //
    // users           User[]
    // simulatorModels SimulatorModel[]
    // simulators      Simulator[]
    //
//}

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
