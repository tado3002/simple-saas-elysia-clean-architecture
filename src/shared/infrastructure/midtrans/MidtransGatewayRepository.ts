import { PaymentGatewaysRepository } from "../../../payment-gateways/application/payment-gateways.repository";
import axios from "axios";
import { env } from "../../env";
import { status } from "elysia";
import { User } from "../../../users/domain/user.type";
import { Payment } from "../../../payments/domain/payment.type";
import { Order } from "../../../orders/domain/order.type";

export class MidtransGatewayRepository implements PaymentGatewaysRepository {
	private midtransTransactionUrl = env.MIDTRANS_TRANSACTION_URL;
	private midtransServerKey = env.MIDTRANS_SERVER_KEY;
	private midtransPassword = env.MIDTRANS_PASSWORD;
	async create(order: Order, customer: User): Promise<string> {
		const parameter = {
			transaction_details: {
				order_id: order.id,
				gross_amount: Number(order.amount),
			},
			customer_details: {
				first_name: customer.name,
				email: customer.email,
			},
		};
		// midtrans authorization header encoding base64
		const authorization =
			"Basic " + btoa(`${this.midtransServerKey}:${this.midtransPassword}`);
		// fetch midtrans url to create token
		try {
			const { data } = await axios.post(
				this.midtransTransactionUrl,
				parameter,
				{
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json",
						Authorization: authorization,
					},
				},
			);
			return data.token;
		} catch (error) {
			console.log(error);
			throw status(403, { data: error.message });
		}
	}
}
