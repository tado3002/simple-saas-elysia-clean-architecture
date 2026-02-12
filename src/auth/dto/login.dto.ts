import { Static, t } from "elysia";

export const LoginDto = t.Object({
	email: t.String({ format: "email" }),
	password: t.String({ minLength: 8 }),
});

export type LoginDtoType = Static<typeof LoginDto>;
