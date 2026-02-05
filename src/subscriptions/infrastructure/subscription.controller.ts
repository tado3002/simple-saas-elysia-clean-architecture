import Elysia, { status } from "elysia";
import { CreateSubscriptionUseCase } from "../application/use-cases/create-subscription.use-case";
import { PrismaUserRepository } from "../../shared/infrastructure/prisma/PrismaUserRepository";
import { PrismaPlanRepository } from "../../shared/infrastructure/prisma/PrismaPlanRepository";
import { PrismaSubscriptionRepository } from "../../shared/infrastructure/prisma/PrismaSubscriptionRepository";
import { CreateSubscriptionDto } from "../dto/createSubscription.dto";

const userRepository = new PrismaUserRepository();
const planRepository = new PrismaPlanRepository();
const subscriptionRepository = new PrismaSubscriptionRepository();

export const SubscriptionController = new Elysia({
	prefix: "subscriptions",
}).post(
	"/",
	async ({ body }) => {
		const useCase = new CreateSubscriptionUseCase(
			subscriptionRepository,
			userRepository,
			planRepository,
		);
		const data = await useCase.exec(body);
		return status(200, { data });
	},
	{ body: CreateSubscriptionDto },
);
