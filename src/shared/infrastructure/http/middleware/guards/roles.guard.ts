import { Context, status } from "elysia";
import { UserRole } from "../../../../../../generated/prisma/enums";
import { User } from "../../../../../users/domain/user.type";

type AuthContext = {
	user?: User | null;
} & Context;

export const RoleGuard = (role: UserRole) => {
	return (ctx: AuthContext) => {
		if (!ctx.user) throw status(401, { message: "user unauthorized" });

		if (ctx.user.role != role)
			throw status(403, { message: `resource for ${role} only` });
	};
};
