import { Static, t } from "elysia";

const BillingInterval = t.Union([
	t.Literal("weekly"),
	t.Literal("monthly"),
	t.Literal("yearly"),
]);

export const CreatePlanDto = t.Object({
	featureIds: t.Array(t.String()),
	name: t.String({ minLength: 5, maxLength: 100 }),
	price: t.Number({ minimum: 0 }),
	billingInterval: BillingInterval,
});

export type CreatePlanDtoType = Static<typeof CreatePlanDto>;
