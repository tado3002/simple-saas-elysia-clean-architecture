import { Context, status } from "elysia";
import {
	ElysiaJwt,
	ElysiaJwtTokenService,
} from "../../../jwt/ElysiaJwtTokenService";
import { PrismaUserRepository } from "../../../prisma/PrismaUserRepository";
import { User } from "../../../../../users/domain/user.type";

type AuthContext = {
	user?: User | null;
	jwt: ElysiaJwt;
} & Context;

export const AuthGuard = async (ctx: AuthContext) => {
	const authHeader = ctx.request.headers.get("Authorization") ?? false;

	if (!authHeader || !authHeader.startsWith("Bearer "))
		throw status(401, "header authorization bearer needed");

	const token = authHeader.split(" ")[1];
	// verifiy token
	const tokenService = new ElysiaJwtTokenService(ctx.jwt);
	const payload = await tokenService.verifyAccessToken(token);
	// store user data
	const userRepository = new PrismaUserRepository();
	const user = await userRepository.findById(payload.userId);
	if (!user) throw status(404, "user not found");

	ctx.user = user;
};
