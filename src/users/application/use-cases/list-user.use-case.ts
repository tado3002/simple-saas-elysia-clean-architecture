import { User } from "../../domain/user.type";
import { UserRepository } from "../user.repository";

export class ListUserUseCase {
	constructor(private readonly userRepository: UserRepository) {}

	async exec(): Promise<User[]> {
		return await this.userRepository.findAll();
	}
}
