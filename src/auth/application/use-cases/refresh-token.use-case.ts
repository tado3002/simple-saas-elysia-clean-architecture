import { TokenService } from "../../../shared/application/services/token.service";
import { JwtPayloadType } from "../../../shared/infrastructure/jwt/jwt.plugin";

export class RefreshTokenUseCase {
	constructor(
		private readonly refreshTokenService: TokenService,
		private readonly accessTokenService: TokenService,
	) {}
	async exec(token: string) {
		// validate refresh token
		const refreshToken =
			await this.refreshTokenService.verifyAccessToken(token);
		// refresh access token
		const payload: JwtPayloadType = {
			userId: refreshToken.userId,
		};
		const accessToken = await this.accessTokenService.signAccessToken(payload);
		return { accessToken };
	}
}
