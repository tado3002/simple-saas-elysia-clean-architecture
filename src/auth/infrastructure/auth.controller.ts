import Elysia, { status, t } from "elysia";
import { RegisterDto } from "../dto/register.dto";
import { RegisterUseCase } from "../application/use-cases/register.use-cases";
import { PrismaUserRepository } from "../../shared/infrastructure/prisma/PrismaUserRepository";
import { LoginDto } from "../dto/login.dto";
import { LoginUseCase } from "../application/use-cases/login.user-case";
import { JwtPlugin } from "../../shared/infrastructure/jwt/jwt.plugin";
import { ElysiaJwtTokenService } from "../../shared/infrastructure/jwt/ElysiaJwtTokenService";

const userRepository = new PrismaUserRepository();

export const AuthController = new Elysia({ prefix: "auth" })
	.use(JwtPlugin)
	.post(
		"register",
		async ({ body }) => {
			const useCase = new RegisterUseCase(userRepository);
			const data = await useCase.execute(body);
			return status(200, { id: data.id });
		},
		{
			body: RegisterDto,
		},
	)
	.post(
		"/login",
		async ({ body, jwt }) => {
			const tokenService = new ElysiaJwtTokenService(jwt);
			const useCase = new LoginUseCase(userRepository, tokenService);
			const data = await useCase.exec(body);

			return status(200, { data });
		},
		{ body: LoginDto },
	);
