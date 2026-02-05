import { z } from "zod";

const envSchema = z.object({
	// Application
	NODE_ENV: z.enum(["dev", "prod"]).default("dev"),
	PORT: z.string().default("3000"),
	DATABASE_URL: z.string(),
});

export const env = envSchema.parse(process.env);
