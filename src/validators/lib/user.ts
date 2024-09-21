import { z } from "zod";

export const createUserFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});
