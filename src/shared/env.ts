import { z } from "zod";

const envSchema = z.object({
	// Application
	NODE_ENV: z.enum(["dev", "prod"]).default("dev"),
	PORT: z.string().default("3000"),
	DATABASE_URL: z.string(),
	// Midtrans Payment Gateway
	MIDTRANS_TRANSACTION_URL: z.string(),
	MIDTRANS_SERVER_KEY: z.string(),
	MIDTRANS_PASSWORD: z.string(),
});

export const env = envSchema.parse(process.env);
