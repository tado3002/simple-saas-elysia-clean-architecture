import { Elysia } from "elysia";
import { AppRoutes } from "./app.routes";
import { env } from "./shared/env";
import staticPlugin from "@elysiajs/static";
import { file } from "bun";
import cors from "@elysiajs/cors";

const app = new Elysia()
	.use(cors())
	.use(AppRoutes)
	.use(staticPlugin())
	.get("/plans", () => file("public/home.html"));

app.listen({ port: env.PORT });

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
