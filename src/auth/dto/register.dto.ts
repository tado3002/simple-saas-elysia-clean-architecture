import { Static, t } from "elysia";

export const RegisterDto = t.Object({
	name: t.String({ minLength: 3, maxLength: 100 }),
	email: t.String({ format: "email" }),
	password: t.String({ minLength: 8, maxLength: 100 }),
});

export type RegisterDtoType = Static<typeof RegisterDto>;
