export type Payment = {
	id: string;
	amount: bigint;
	status: string;
	paymentType: string | null;
	subscriptionId: string;
	payedAt: Date | null;
	createdAt: Date;
	updatedAt: Date;
};
