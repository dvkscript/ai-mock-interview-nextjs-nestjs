import { z } from "zod";

export const GenerateQuestionSchema = z.object({
    position: z.string({
        required_error: "Position is required",
        invalid_type_error: "Position must be a string"
    }).min(1, {
        message: "Position must be at least 1 character"
    }).max(225, {
        message: "Position must be at most 225 characters"
    }),
    description: z.string({
        required_error: "Description is required",
        invalid_type_error: "Description must be a string"
    }).min(1, {
        message: "Description must be at least 1 character"
    }).max(500, {
        message: "Description must be at most 500 characters"
    }),
    yearsOfExperience: z.number({
        required_error: "Year experience is required",
        invalid_type_error: "Year experience must be a number"
    }).min(0, {
        message: "Year experience must be at least 0"
    }).max(50, {
        message: "Year experience must be at most 50"
    }),
    // voice: z.string({
    //     required_error: "Voice is required",
    //     invalid_type_error: "Voice must be a string"
    // }),
})

export type TGenerateQuestion = z.infer<typeof GenerateQuestionSchema>