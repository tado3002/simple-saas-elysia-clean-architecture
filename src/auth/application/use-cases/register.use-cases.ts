import { status } from "elysia";
import { UserRepository } from "../../../users/application/user.repository";
import { RegisterDtoType } from "../../dto/register.dto";
import { User } from "../../../users/domain/user.type";

export class RegisterUseCase {
	constructor(private readonly userRepository: UserRepository) {}

	async execute(dto: RegisterDtoType): Promise<User> {
		// email validation
		const existedUser = await this.userRepository.findByEmail(dto.email);
		if (existedUser) throw status(409);
		// hash password
		// create user
		const user: User = {
			id: Bun.randomUUIDv7(),
			name: dto.name,
			email: dto.email,
			password: dto.password,
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		const data = await this.userRepository.create(user);
		return data;
	}
}
