import { PlanRepository } from "../../../plans/application/plans.repository";
import { Plan } from "../../../plans/domain/plans.types";
import prisma from "../db";

export class PrismaPlanRepository implements PlanRepository {
	async verifyFeatures(ids: string[]): Promise<boolean> {
		// select id where id = ids
		const featureIds: string[] = (
			await prisma.feature.findMany({
				where: { id: { in: ids } },
				select: { id: true },
			})
		).map((feature) => feature.id);
		// every ids must exist in featureIds
		const isIdsExist = ids.every((id) => featureIds.includes(id));
		return isIdsExist;
	}
	async create(plan: Plan): Promise<Plan> {
		const data = await prisma.plan.create({ data: plan });
		return data;
	}
	async createPivotPlanFeatures(
		planId: string,
		featureIds: string[],
	): Promise<void> {
		// mapping object each featureIds have planId
		const data = featureIds.map((featureId) => ({ featureId, planId }));
		// create many
		await prisma.plan_Features.createMany({ data });
	}
	async findAll(): Promise<any> {
		return await prisma.plan.findMany({
			include: { plan_features: { include: { feature: true } } },
		});
	}
}
