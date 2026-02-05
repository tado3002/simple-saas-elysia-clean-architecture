import Elysia, { status } from "elysia";

export const PaymentController = new Elysia({ prefix: "payments" }).post(
	"/callback",
	({ body }) => {
		console.log("update payment success");
		return status(201);
	},
);
