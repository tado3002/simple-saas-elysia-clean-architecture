export type Order = {
	id: string;
	amount: bigint;
	payed?: bigint;
	isSuccess?: boolean;
	subscriptionId: string;
	createdAt: Date;
	updatedAt: Date;
};
