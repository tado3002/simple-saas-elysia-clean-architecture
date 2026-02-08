import { OrderRepository } from "../../../orders/application/order.repository";
import { Order } from "../../../orders/domain/order.type";
import prisma from "../db";

export class PrismaOrderRepository implements OrderRepository {
	async create(data: Order): Promise<Order> {
		return await prisma.orders.create({ data });
	}
	async all(): Promise<Order[]> {
		return await prisma.orders.findMany();
	}
	async findById(id: string): Promise<Order | null> {
		return await prisma.orders.findUnique({ where: { id } });
	}
	async paymentCallback(id: string, amount: bigint): Promise<Order> {
		return await prisma.orders.update({
			where: { id },
			data: {
				payed: amount,
				isSuccess: true,
			},
		});
	}
}
