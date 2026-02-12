import { Order } from "../../../orders/domain/order.type";
import { User } from "../../../users/domain/user.type";

export interface PaymentGatewayService {
	create(order: Order, user: User): Promise<string>;
}
