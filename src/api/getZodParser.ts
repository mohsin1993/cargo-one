import { z } from "zod";

/**
 * Factory method to evaluate Zod schema
 */
export const getZodParser =
  <T extends z.ZodTypeAny>(zodSchema: T) =>
  (data: unknown): z.infer<T> => {
    try {
      return zodSchema.parse(data);
    } catch (e) {
      console.log(e);
      throw new Error("Received unexpected API response!");
    }
  };
