import { SubscriptionStatus } from "../../../generated/prisma/enums";

export type Subscription = {
	id: string;
	userId: string;
	planId: string;
	price: bigint;
	status: SubscriptionStatus;
	startAt: Date | null;
	endAt: Date | null;
	createdAt: Date;
	updatedAt: Date;
};
