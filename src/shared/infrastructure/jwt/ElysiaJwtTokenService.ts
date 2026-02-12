import { status } from "elysia";
import { TokenService } from "../../application/services/token.service";

export type ElysiaJwt = {
	sign(payload: any): Promise<string>;
	verify(token?: string): Promise<any | false>;
};

export class ElysiaJwtTokenService implements TokenService {
	constructor(private readonly jwtService: ElysiaJwt) {}

	async signAccessToken(payload: { userId: string }): Promise<string> {
		return this.jwtService.sign(payload);
	}
	async verifyAccessToken(token: string): Promise<{ userId: string }> {
		const decode = await this.jwtService.verify(token);

		if (!decode) throw status(401, { message: "Invalid token" });

		return { userId: decode.userId };
	}
}
