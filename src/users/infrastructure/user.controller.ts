import Elysia, { status } from "elysia";
import { ListUserUseCase } from "../application/use-cases/list-user.use-case";
import { PrismaUserRepository } from "../../shared/infrastructure/prisma/PrismaUserRepository";

const userRepository = new PrismaUserRepository();

export const UserController = new Elysia({ prefix: "users" }).get(
	"/",
	async () => {
		const useCase = new ListUserUseCase(userRepository);
		const data = await useCase.exec();
		return status(200, { data });
	},
);
