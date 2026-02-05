import { Subscription } from "../domain/subscription.type";

export interface SubscriptionRepository {
	create(subscription: Subscription): Promise<Subscription>;
}
