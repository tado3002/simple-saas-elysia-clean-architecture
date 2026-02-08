import { Order } from "../domain/order.type";

export interface OrderRepository {
	all(): Promise<Order[]>;
	create(data: Order): Promise<Order>;
	findById(id: string): Promise<Order | null>;
	paymentCallback(id: string, amount: bigint): Promise<Order>;
}
