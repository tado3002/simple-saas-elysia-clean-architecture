import Elysia from "elysia";

export const TodoController = new Elysia({ prefix: "todos" }).get("/", () => {
	return { data: "get all todo" };
});
