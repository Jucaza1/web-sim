import z from "zod"




export const UserCredentialsSchema = z.object({
    email: z.string().email({message:"invalid email"}),
    password: z.string().min(1,{message:"invalid password"})
})
export type UserCredentials = z.infer<typeof UserCredentialsSchema>
