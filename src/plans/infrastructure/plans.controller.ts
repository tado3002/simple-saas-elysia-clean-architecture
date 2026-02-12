import Elysia, { status } from "elysia";
import { CreatePlanDto } from "../dto/createPlan.dto";
import { CreatePlanUseCase } from "../application/use-cases/create-plan.use-case";
import { PrismaPlanRepository } from "../../shared/infrastructure/prisma/PrismaPlanRepository";
import { FindAllPlanUseCase } from "../application/use-cases/findAll-plan.use-case";
import { RoleGuard } from "../../shared/infrastructure/http/middleware/guards/roles.guard";
import { JwtPlugin } from "../../shared/infrastructure/jwt/jwt.plugin";
import { AuthGuard } from "../../shared/infrastructure/http/middleware/guards/auth.guard";

const planRepository = new PrismaPlanRepository();

export const PlansController = new Elysia({ prefix: "plans" })
	.use(JwtPlugin)
	.post(
		"/",
		async ({ body }) => {
			const useCase = new CreatePlanUseCase(planRepository);
			const data = await useCase.exect(body);
			return status(200, { data });
		},
		{ body: CreatePlanDto, beforeHandle: [AuthGuard, RoleGuard("admin")] },
	)
	.get(
		"/",
		async () => {
			const useCase = new FindAllPlanUseCase(planRepository);
			const data = await useCase.exec();
			return status(200, {
				data,
			});
		},
		{ beforeHandle: AuthGuard },
	);
