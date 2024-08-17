import { z } from "zod"

export const SingupValidation = z.object({
    name: z.string().min(2, { message: "Too Short." }),
    username: z.string().min(3, { message: "Too Short." }).max(50, { message: "Too Long." }),
    email: z.string().email(),
    password: z.string().min(8, { message: "Password Must Be At Least 8 Characters." }),
})
export const SinginValidation = z.object({
    email: z.string().email(),
    password: z.string().min(8, { message: "Password Must Be At Least 8 Characters." }),
})
