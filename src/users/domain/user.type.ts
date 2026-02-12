import { UserRole } from "../../../generated/prisma/enums";

export type User = {
	id: string;
	name: string;
	role: UserRole;
	email: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;
};
