import { status } from "elysia";
import { PlanRepository } from "../../../plans/application/plans.repository";
import { UserRepository } from "../../../users/application/user.repository";
import { CreateSubscriptionType } from "../../dto/createSubscription.dto";
import { SubscriptionRepository } from "../subscription.repository";
import { Subscription } from "../../domain/subscription.type";
import { SubscriptionStatus } from "../../../../generated/prisma/enums";
import { PaymentRepository } from "../../../payments/application/payment.repository";
import { Payment } from "../../../payments/domain/payment.type";
import { PaymentGatewaysRepository } from "../../../payment-gateways/application/payment-gateways.repository";

export class CreateSubscriptionUseCase {
	constructor(
		private readonly subscriptionRepository: SubscriptionRepository,
		private readonly userRepository: UserRepository,
		private readonly planRepository: PlanRepository,
		private readonly paymentRepository: PaymentRepository,
		private readonly paymentGatewayRepository: PaymentGatewaysRepository,
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
		const createdSubscription =
			await this.subscriptionRepository.create(subscription);

		// create payment
		const payment: Payment = {
			id: Bun.randomUUIDv7(),
			subscriptionId: createdSubscription.id,
			amount: BigInt(0),
			status: "pending",
			paymentType: null,
			payedAt: null,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		const createdPayment = await this.paymentRepository.create(payment);

		// create token payment midtrans
		const paymentGatewayToken = await this.paymentGatewayRepository.create(
			createdSubscription,
			createdPayment,
			user,
		);

		return {
			...createdSubscription,
			price: createdSubscription.price.toString(),
			token: paymentGatewayToken,
		};
	}
}
