import { Elysia } from "elysia";
import { AppRoutes } from "./app.routes";
import { env } from "./shared/env";

const app = new Elysia().use(AppRoutes);

app.listen({ port: env.PORT });

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
