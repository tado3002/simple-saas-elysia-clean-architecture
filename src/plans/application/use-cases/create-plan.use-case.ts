import { status } from "elysia";
import { Plan } from "../../domain/plans.types";
import { CreatePlanDtoType } from "../../dto/createPlan.dto";
import { PlanRepository } from "../plans.repository";

export class CreatePlanUseCase {
	constructor(private readonly planRepository: PlanRepository) {}
	async exect(dto: CreatePlanDtoType): Promise<any> {
		// verify featureIds
		const isFeatureIdsExist: boolean = await this.planRepository.verifyFeatures(
			dto.featureIds,
		);
		if (!isFeatureIdsExist)
			throw status(422, { message: "featureIds not valid" });

		// create plan
		const plan: Plan = {
			id: Bun.randomUUIDv7(),
			name: dto.name,
			price: BigInt(dto.price),
			billingInterval: dto.billingInterval,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		const newPlan = await this.planRepository.create(plan);

		// create plan features pivot
		await this.planRepository.createPivotPlanFeatures(
			newPlan.id,
			dto.featureIds,
		);

		return {
			...plan,
			price: plan.price.toString(),
		};
	}
}
