import { Payment } from "../../payments/domain/payment.type";
import { Subscription } from "../../subscriptions/domain/subscription.type";
import { User } from "../../users/domain/user.type";

export interface PaymentGatewaysRepository {
	create(
		order: Subscription,
		payment: Payment,
		customer: User,
	): Promise<string>;
}
