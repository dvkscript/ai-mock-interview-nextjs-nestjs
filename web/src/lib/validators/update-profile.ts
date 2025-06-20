import { z } from "zod";

export const UpdateProfileSchema = z.object({
    fullName: z.string({
        required_error: "Full name is required",
        invalid_type_error: "Full name must be a string",
    }).min(2, {
        message: "Full name must be at least 2 characters long",
    }),
})

export type TUpdateProfile = z.infer<typeof UpdateProfileSchema>