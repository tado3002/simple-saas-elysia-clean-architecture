import Elysia, { status } from "elysia";
import { CallbackPaymentDto } from "../dto/callbackPayment.dto";
import { CallbackPaymentUseCase } from "../application/use-cases/callback-payment.use-case";
import { PrismaPaymentRepository } from "../../shared/infrastructure/prisma/PrismaPaymentRepository";
import { PrismaOrderRepository } from "../../shared/infrastructure/prisma/PrismaOrderRepository";
import { FindAllPaymentUseCase } from "../application/use-cases/findAll-payment.use-case";

const paymentRepository = new PrismaPaymentRepository();
const orderRepository = new PrismaOrderRepository();

export const PaymentController = new Elysia({ prefix: "payments" })
	.get("/", async () => {
		const useCase = new FindAllPaymentUseCase(paymentRepository);
		const data = await useCase.execute();
		return { data };
	})
	.post(
		"/callback",
		async ({ body }) => {
			console.log(body);
			const useCase = new CallbackPaymentUseCase(
				paymentRepository,
				orderRepository,
			);
			const data = await useCase.execute(body);
			return status(201);
		},
		{
			body: CallbackPaymentDto,
		},
	);
