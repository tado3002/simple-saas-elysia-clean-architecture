export interface TokenService {
	signAccessToken(payload: { userId: string }): Promise<string>;
	verifyAccessToken(token: string): Promise<{ userId: string }>;
}
