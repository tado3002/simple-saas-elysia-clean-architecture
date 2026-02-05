import { Plan } from "../domain/plans.types";

export interface PlanRepository {
	create(plan: Plan): Promise<Plan>;
	verifyFeatures(ids: string[]): Promise<boolean>;
	createPivotPlanFeatures(planId: string, featureIds: string[]): Promise<void>;
	findAll(): Promise<any>;
}
