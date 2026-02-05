import { FeatureRepository } from "../../../features/application/feature.repository";
import { Feature } from "../../../features/domain/feature.type";
import prisma from "../db";

export class PrismaFeatureRepository implements FeatureRepository {
	async create(feature: Feature): Promise<Feature> {
		const data = await prisma.feature.create({ data: feature });
		return data;
	}

	async findByKey(key: string): Promise<Feature | null> {
		const data = await prisma.feature.findUnique({ where: { key } });
		return data;
	}

	async findAll(): Promise<Feature[]> {
		return await prisma.feature.findMany();
	}
}
