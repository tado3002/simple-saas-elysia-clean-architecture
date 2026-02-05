import { User } from "../domain/user.type";

export interface UserRepository {
	findAll(): Promise<User[]>;
	findByEmail(email: string): Promise<User | null>;
	create(user: User): Promise<User>;
}
