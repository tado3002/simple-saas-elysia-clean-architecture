import Elysia, { status, t } from "elysia";
import { RegisterDto } from "../dto/register.dto";
import { RegisterUseCase } from "../application/use-cases/register.use-cases";
import { PrismaUserRepository } from "../../shared/infrastructure/prisma/PrismaUserRepository";

const userRepository = new PrismaUserRepository();

export const AuthController = new Elysia({ prefix: "auth" }).post(
	"register",
	async ({ body }) => {
		const { name, email, password } = body;
		const useCase = new RegisterUseCase(userRepository);
		const data = await useCase.execute({ name, email, password });
		return status(200, { id: data.id });
	},
	{
		body: RegisterDto,
	},
);
