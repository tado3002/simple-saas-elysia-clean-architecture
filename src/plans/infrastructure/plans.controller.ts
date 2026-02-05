import Elysia, { status } from "elysia";
import { CreatePlanDto } from "../dto/createPlan.dto";
import { CreatePlanUseCase } from "../application/use-cases/create-plan.use-case";
import { PrismaPlanRepository } from "../../shared/infrastructure/prisma/PrismaPlanRepository";
import { FindAllPlanUseCase } from "../application/use-cases/findAll-plan.use-case";

const planRepository = new PrismaPlanRepository();

export const PlansController = new Elysia({ prefix: "plans" })
	.post(
		"/",
		async ({ body }) => {
			const useCase = new CreatePlanUseCase(planRepository);
			const data = await useCase.exect(body);
			return status(200, { data });
		},
		{ body: CreatePlanDto },
	)
	.get("/", async () => {
		const useCase = new FindAllPlanUseCase(planRepository);
		const data = await useCase.exec();
		return status(200, {
			data,
		});
	});
