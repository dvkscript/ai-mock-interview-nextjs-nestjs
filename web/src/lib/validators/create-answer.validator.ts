import { z } from "zod";

export const CreateAnswerSchema = z.object({
    answer: z.string({
        required_error: "Answer is required",
        invalid_type_error: "Answer must be a string"
    }).min(1, {
        message: "Answer must be at least 1 character"
    }).max(500, {
        message: "Answer must be at most 500 characters"
    }),
    questionId: z.string({
        required_error: "Question ID is required",
        invalid_type_error: "Question ID must be a string"
    }).uuid({
        message: "Question ID must be a valid UUID"
    })
})

export type TCreateAnswer = z.infer<typeof CreateAnswerSchema>