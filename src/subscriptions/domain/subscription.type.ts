import { SubscriptionStatus } from "../../../generated/prisma/enums";

export type Subscription = {
	id: string;
	userId: string;
	planId: string;
	status: SubscriptionStatus;
	startAt: Date | null;
	endAt: Date | null;
	createdAt: Date;
	updatedAt: Date;
};
