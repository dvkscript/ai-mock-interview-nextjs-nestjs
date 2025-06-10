import { z } from "zod";

export const UpdateUserSchema = z.object({
    fullName: z.string({
        required_error: "Full name is required",
        invalid_type_error: "Full name must be a string",
    }).min(2, {
        message: "Full name must be at least 2 characters long",
    }),

    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    }).email("Invalid email address"),

    password: z.string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
    }).min(8, {
        message: "Password must be at least 8 characters long",
    }).optional().or(z.literal("")),

    confirmPassword: z.string().optional().or(z.literal("")),

    roles: z.array(z.string({
        required_error: "Role is required",
        invalid_type_error: "Role must be a string",
    }), {
        required_error: "Roles are required",
        invalid_type_error: "Roles must be an array of strings",
    }),

    userPro: z.object({
        startTime: z.coerce.date({
            required_error: "Start time is required",
            invalid_type_error: "Start time must be a date",
        }).refine((d) => d >= new Date(), {
            message: "Start time must be in the future",
        }),
        endTime: z.coerce.date({
            required_error: "End time is required",
            invalid_type_error: "End time must be a date",
        }),
    }).refine(data => data.endTime > data.startTime, {
        message: "End time must be after start time",
        path: ["endTime"],
    }).optional(),
})
    .refine((data) => {
        if (data.password || data.confirmPassword) {
            return data.password === data.confirmPassword;
        }
        return true;
    }, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

export type TUpdateUser = z.infer<typeof UpdateUserSchema>