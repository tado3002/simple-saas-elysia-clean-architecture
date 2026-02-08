import { Payment } from "../domain/payment.type";

export interface PaymentRepository {
	create(payment: Payment): Promise<Payment>;
	findAll(): Promise<Payment[]>;
}
