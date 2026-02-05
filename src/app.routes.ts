import Elysia from "elysia";
import { TodoController } from "./todos/infrastructure/todo.controller";
import { AuthController } from "./auth/infrastructure/auth.controller";
import { UserController } from "./users/infrastructure/user.controller";
import { FeatureController } from "./features/infrastructure/feature.controller";
import { PlansController } from "./plans/infrastructure/plans.controller";
import { PaymentController } from "./payments/infrastructure/payment.controller";
import { SubscriptionController } from "./subscriptions/infrastructure/subscription.controller";

const routes = new Elysia({ prefix: "/api/v1" })
	.use(AuthController)
	.use(UserController)
	.use(FeatureController)
	.use(PlansController)
	.use(TodoController)
	.use(PaymentController)
	.use(SubscriptionController);

export { routes as AppRoutes };
