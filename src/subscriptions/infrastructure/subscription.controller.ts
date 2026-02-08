import Elysia, { status } from "elysia";
import { CreateSubscriptionUseCase } from "../application/use-cases/create-subscription.use-case";
import { PrismaUserRepository } from "../../shared/infrastructure/prisma/PrismaUserRepository";
import { PrismaPlanRepository } from "../../shared/infrastructure/prisma/PrismaPlanRepository";
import { PrismaSubscriptionRepository } from "../../shared/infrastructure/prisma/PrismaSubscriptionRepository";
import { CreateSubscriptionDto } from "../dto/createSubscription.dto";
import { MidtransGatewayRepository } from "../../shared/infrastructure/midtrans/MidtransGatewayRepository";
import { PrismaOrderRepository } from "../../shared/infrastructure/prisma/PrismaOrderRepository";

const userRepository = new PrismaUserRepository();
const planRepository = new PrismaPlanRepository();
const subscriptionRepository = new PrismaSubscriptionRepository();
const orderRepository = new PrismaOrderRepository();
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
			orderRepository,
			paymentGatewayRepository,
		);
		const data = await useCase.exec(body);
		return status(200, { data });
	},
	{ body: CreateSubscriptionDto },
);
