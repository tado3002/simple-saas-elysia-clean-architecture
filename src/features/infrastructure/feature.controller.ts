import Elysia, { status } from "elysia";
import { CreateFeatureDto } from "../dto/createFeature.dto";
import { PrismaFeatureRepository } from "../../shared/infrastructure/prisma/PrismaFeatureRepository";
import { CreateFeatureUseCase } from "../application/use-cases/create-feature.use-case";
import { GetAllFeatureUseCase } from "../application/use-cases/getAll-feature.use-case";

const featureRepository = new PrismaFeatureRepository();

export const FeatureController = new Elysia({ prefix: "features" })
	.post(
		"/",
		async ({ body }) => {
			const useCase = new CreateFeatureUseCase(featureRepository);
			const data = await useCase.exec(body);
			return status(200, { data });
		},
		{ body: CreateFeatureDto },
	)
	.get("/", async () => {
		const useCase = new GetAllFeatureUseCase(featureRepository);
		const data = await useCase.exec();
		return status(200, { data });
	});
