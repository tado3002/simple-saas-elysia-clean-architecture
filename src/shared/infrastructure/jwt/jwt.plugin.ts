import Elysia, { Static, t } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { env } from "../../env";

const JwtPayload = t.Object({
	userId: t.String(),
});

export const JwtPlugin = new Elysia().use(
	jwt({
		name: "jwt",
		secret: env.JWT_SECRET_KEY,
		exp: env.JWT_EXPIRES_IN,
		schema: JwtPayload,
	}),
);

export type JwtPayloadType = Static<typeof JwtPayload>;
