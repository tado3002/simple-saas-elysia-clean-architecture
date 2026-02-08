import { PaymentRepository } from "../../../payments/application/payment.repository";
import { Payment } from "../../../payments/domain/payment.type";
import prisma from "../db";

export class PrismaPaymentRepository implements PaymentRepository {
	async create(payment: Payment): Promise<Payment> {
		return await prisma.payments.create({ data: payment });
	}
	async findAll(): Promise<Payment[]> {
		return await prisma.payments.findMany();
	}
}
