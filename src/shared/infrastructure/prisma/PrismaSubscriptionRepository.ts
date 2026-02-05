import { SubscriptionRepository } from "../../../subscriptions/application/subscription.repository";
import { Subscription } from "../../../subscriptions/domain/subscription.type";
import prisma from "../db";

export class PrismaSubscriptionRepository implements SubscriptionRepository {
	async create(data: Subscription): Promise<Subscription> {
		return await prisma.subscriptions.create({ data });
	}
}
