import { Payment } from "../../domain/payment.type";
import { PaymentRepository } from "../payment.repository";

export class FindAllPaymentUseCase {
	constructor(private readonly paymentRepository: PaymentRepository) {}
	async execute(): Promise<any> {
		const payments = await this.paymentRepository.findAll();
		return payments.map((payment) => ({
			...payment,
			amount: payment.amount.toString(),
		}));
	}
}
