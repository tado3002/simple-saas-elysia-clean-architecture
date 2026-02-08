import { status } from "elysia";
import { OrderRepository } from "../../../orders/application/order.repository";
import { PaymentRepository } from "../payment.repository";
import { Payment } from "../../domain/payment.type";
import { CallbackPaymentDtoType } from "../../dto/callbackPayment.dto";

export class CallbackPaymentUseCase {
	constructor(
		private readonly paymentRepository: PaymentRepository,
		private readonly orderRepository: OrderRepository,
	) {}
	async execute(data: CallbackPaymentDtoType): Promise<Payment> {
		// orderId validation
		console.log("find order", data.order_id);
		const order = await this.orderRepository.findById(data.order_id);
		if (!order) throw status(404, "order not found");
		console.log("order found", order.id);
		// order success status must false
		console.log("checking order status", order.isSuccess);
		if (order.isSuccess) throw status(403, "order is processed successfully");
		// update order
		console.log("updating order");
		try {
			const updatedOrder = await this.orderRepository.paymentCallback(
				order.id,
				BigInt(Number(data.gross_amount)),
			);

			// create payment
			const payment: Payment = {
				id: Bun.randomUUIDv7(),
				amount: updatedOrder.amount,
				status: "success",
				payedAt: new Date(),
				subscriptionId: updatedOrder.subscriptionId,
				paymentType: data.payment_type,
				createdAt: new Date(),
				updatedAt: new Date(),
			};
			console.log("creating payment", payment);
			const createdPayment = await this.paymentRepository.create(payment);
			console.log("created payment", createdPayment);
			return createdPayment;
		} catch (error) {
			console.log(error.message);
			throw status(500, error.message);
		}
	}
}
