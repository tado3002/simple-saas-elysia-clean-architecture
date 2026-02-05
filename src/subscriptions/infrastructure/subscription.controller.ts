import Elysia, { status } from "elysia";
import { CreateSubscriptionUseCase } from "../application/use-cases/create-subscription.use-case";
import { PrismaUserRepository } from "../../shared/infrastructure/prisma/PrismaUserRepository";
import { PrismaPlanRepository } from "../../shared/infrastructure/prisma/PrismaPlanRepository";
import { PrismaSubscriptionRepository } from "../../shared/infrastructure/prisma/PrismaSubscriptionRepository";
import { CreateSubscriptionDto } from "../dto/createSubscription.dto";
import { MidtransGatewayRepository } from "../../shared/infrastructure/midtrans/MidtransGatewayRepository";
import { PrismaPaymentRepository } from "../../shared/infrastructure/prisma/PrismaPaymentRepository";

const userRepository = new PrismaUserRepository();
const planRepository = new PrismaPlanRepository();
const subscriptionRepository = new PrismaSubscriptionRepository();
const paymentRepository = new PrismaPaymentRepository();
const paymentGatewayRepository = new MidtransGatewayRepository();

export const SubscriptionController = new Elysia({
	prefix: "subscriptions",
}).post(
	"/",
	async ({ body }) => {
		const useCase = new CreateSubscriptionUseCase(
			subscriptionRepository,
			userRepository,
			planRepository,
			paymentRepository,
			paymentGatewayRepository,
		);
		const data = await useCase.exec(body);
		return status(200, { data });
	},
	{ body: CreateSubscriptionDto },
);
