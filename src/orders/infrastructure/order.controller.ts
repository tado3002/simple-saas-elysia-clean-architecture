import Elysia from "elysia";

import { FindAllOrderUseCase } from "../application/use-cases/findAll-order.use-case";
import { PrismaOrderRepository } from "../../shared/infrastructure/prisma/PrismaOrderRepository";

const orderRepository = new PrismaOrderRepository();

export const OrderController = new Elysia({ prefix: "orders" }).get(
	"/",
	async () => {
		const useCase = new FindAllOrderUseCase(orderRepository);
		const data = await useCase.exec();
		return { data };
	},
);
