import { Static, t } from "elysia";

export const CreateSubscriptionDto = t.Object({
	userId: t.String(),
	planId: t.String(),
});

export type CreateSubscriptionType = Static<typeof CreateSubscriptionDto>;
