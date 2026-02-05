import { Static, t } from "elysia";

export const TodoSchema = t.Object({
	id: t.String(),
	title: t.String(),
	isDone: t.String(),
	createdAt: t.String(),
	updatedAt: t.String(),
});

export type Todo = Static<typeof TodoSchema>;
