import { Feature } from "../../domain/feature.type";
import { FeatureRepository } from "../feature.repository";

export class GetAllFeatureUseCase {
	constructor(private readonly featureRepository: FeatureRepository) {}
	async exec(): Promise<Feature[]> {
		return this.featureRepository.findAll();
	}
}
