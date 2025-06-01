import { AdminRole } from "@/enums/role";
import { z } from "zod";

export const CreateRoleSchema = z.object({
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string"
    }).min(1, {
        message: "Answer must be at least 1 character"
    }).max(100, {
        message: "Answer must be at most 500 characters"
    }),
    permissions: z.array(z.nativeEnum(AdminRole, {
        message: "Invalid role"
    }), {
        required_error: "Roles is required",
        invalid_type_error: "Roles must be an array"
    })
})

export type TCreateRole = z.infer<typeof CreateRoleSchema>