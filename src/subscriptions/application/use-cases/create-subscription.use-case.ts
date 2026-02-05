import { status } from "elysia";
import { PlanRepository } from "../../../plans/application/plans.repository";
import { UserRepository } from "../../../users/application/user.repository";
import { CreateSubscriptionType } from "../../dto/createSubscription.dto";
import { SubscriptionRepository } from "../subscription.repository";
import { Subscription } from "../../domain/subscription.type";
import { SubscriptionStatus } from "../../../../generated/prisma/enums";

export class CreateSubscriptionUseCase {
	constructor(
		private readonly subscriptionRepository: SubscriptionRepository,
		private readonly userRepository: UserRepository,
		private readonly planRepository: PlanRepository,
	) {}
	async exec(dto: CreateSubscriptionType): Promise<any> {
		// verify userId
		const user = await this.userRepository.findById(dto.userId);
		if (!user) throw status(404, { message: "user not found" });
		// verify planId
		const plan = await this.planRepository.findById(dto.planId);
		if (!plan) throw status(404, { message: "plan not found" });

		// create new subscription
		const subscription: Subscription = {
			id: Bun.randomUUIDv7(),
			userId: user.id,
			planId: plan.id,
			status: SubscriptionStatus.pending,
			price: plan.price,
			startAt: null,
			endAt: null,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		const data = await this.subscriptionRepository.create(subscription);
		return {
			...data,
			price: data.price.toString(),
		};
	}
}
