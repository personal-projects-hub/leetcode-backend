import { DIFFICULTY } from "@/constants";
import { z } from "zod";

// Form schema for creating a Problem
export const createProblemFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  difficulty: z.union([
    z.literal(DIFFICULTY.EASY),
    z.literal(DIFFICULTY.MEDIUM),
    z.literal(DIFFICULTY.HARD),
  ]),
  tags: z.array(z.string()).optional(),
});

export const createProblemBodySchema = createProblemFormSchema;
export const updateProblemFormSchema = createProblemFormSchema;

export type CreateProblemFormSchema = z.infer<typeof createProblemFormSchema>;
export type UpdateProblemFormSchema = z.TypeOf<typeof updateProblemFormSchema>;
