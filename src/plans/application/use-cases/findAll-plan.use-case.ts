import { Plan } from "../../domain/plans.types";
import { PlanRepository } from "../plans.repository";

export class FindAllPlanUseCase {
	constructor(private readonly planRepository: PlanRepository) {}
	async exec() {
		const plans = await this.planRepository.findAll();
		return plans.map((plan: Plan) => ({
			...plan,
			price: plan.price.toString(),
		}));
	}
}
