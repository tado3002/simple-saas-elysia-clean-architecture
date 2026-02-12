import { UserRepository } from "../../../users/application/user.repository";
import { User } from "../../../users/domain/user.type";
import prisma from "../db";

export class PrismaUserRepository implements UserRepository {
	async findAll(): Promise<User[]> {
		return await prisma.user.findMany();
	}
	async create(user: User): Promise<User> {
		const data = await prisma.user.create({ data: user });
		return {
			id: data.id,
			name: data.name,
			email: data.email,
			password: data.password,
			createdAt: data.createdAt,
			updatedAt: data.updatedAt,
		};
	}

	async findByEmail(email: string): Promise<User | null> {
		return await prisma.user.findFirst({ where: { email } });
	}

	async findById(id: string): Promise<User | null> {
		return await prisma.user.findUnique({ where: { id } });
	}
}
