import { status } from "elysia";
import { UserRepository } from "../../../users/application/user.repository";
import { LoginDtoType } from "../../dto/login.dto";
import { TokenService } from "../../../shared/application/services/token.service";

export class LoginUseCase {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly tokenService: TokenService,
	) {}

	async exec(data: LoginDtoType) {
		// search email
		const user = await this.userRepository.findByEmail(data.email);
		// compare encrypted password
		const isValidPassword: boolean = user?.password
			? await this.comparePassword(data.password, user.password)
			: false; // default false if user null

		if (!isValidPassword)
			throw status(401, { message: "email or password is invalid" });

		// create accessToken
		const payload = { userId: user!.id };
		const accessToken: string =
			await this.tokenService.signAccessToken(payload);
		return { accessToken };
	}

	async comparePassword(
		password: string,
		encryptedPassword: string,
	): Promise<boolean> {
		return await Bun.password.verify(password, encryptedPassword);
	}
}
