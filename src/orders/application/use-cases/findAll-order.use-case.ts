import { Order } from "../../domain/order.type";
import { OrderRepository } from "../order.repository";

export class FindAllOrderUseCase {
	constructor(private readonly orderRepository: OrderRepository) {}
	async exec(): Promise<Order[]> {
		return await this.orderRepository.all();
	}
}
