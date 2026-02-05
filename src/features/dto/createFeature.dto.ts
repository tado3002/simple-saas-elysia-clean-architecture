import { Static, t } from "elysia";

export const CreateFeatureDto = t.Object({
	key: t.String({ minLength: 3, maxLength: 100 }),
	description: t.String({ minLength: 3, maxLength: 255 }),
});

export type CreateFeatureDtoType = Static<typeof CreateFeatureDto>;
