import Elysia, { Static, t } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { env } from "../../env";

const JwtPayload = t.Object({
	userId: t.String(),
});

export const JwtPlugin = new Elysia()
	.use(
		jwt({
			name: "jwtAccess",
			secret: env.JWT_ACCESS_SECRET_KEY,
			exp: env.JWT_ACCESS_EXPIRES_IN,
			schema: JwtPayload,
		}),
	)
	.use(
		jwt({
			name: "jwtRefresh",
			secret: env.JWT_REFRESH_SECRET_KEY,
			exp: env.JWT_REFRESH_EXPIRES_IN,
			schema: JwtPayload,
		}),
	);

export type JwtPayloadType = Static<typeof JwtPayload>;
