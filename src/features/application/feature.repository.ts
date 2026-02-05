import { Feature } from "../domain/feature.type";

export interface FeatureRepository {
	create(feature: Feature): Promise<Feature>;
	findByKey(key: string): Promise<Feature | null>;
	findAll(): Promise<Feature[]>;
}
