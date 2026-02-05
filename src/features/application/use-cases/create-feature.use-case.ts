import { status } from "elysia";
import { CreateFeatureDtoType } from "../../dto/createFeature.dto";
import { FeatureRepository } from "../feature.repository";
import { Feature } from "../../domain/feature.type";

export class CreateFeatureUseCase {
	constructor(private readonly featureRepository: FeatureRepository) {}

	async exec(dto: CreateFeatureDtoType): Promise<Feature> {
		// find exist key feature
		const exist = await this.featureRepository.findByKey(dto.key);
		// throw 409 if exist
		if (exist) throw status(409, { message: "key is exist, use another key" });
		// create new feature
		const feature: Feature = {
			id: Bun.randomUUIDv7(),
			key: dto.key,
			description: dto.description,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		const data = await this.featureRepository.create(feature);
		return data;
	}
}
