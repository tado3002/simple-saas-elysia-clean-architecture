import { Static, t } from "elysia";
// webhook from midtrans:
// {
//   transaction_time: "2026-02-08 22:52:28",
//   transaction_status: "capture",
//   transaction_id: "ef364797-fbed-45af-a846-3e5bde36002f",
//   status_message: "midtrans payment notification",
//   status_code: "200",
//   signature_key: "929b43a074ea43c6db4519ddc6d185ac9ce7d41665e6239ac7736048bd3111117d83dc8749fdb7cf61c39f59bcda45d140b41012c7bfe2212995b3354751bb3c",
//   payment_type: "credit_card",
//   order_id: "019c3df4-06a8-7000-a3ba-6bec74df7203",
//   metadata: {},
//   merchant_id: "G356223179",
//   masked_card: "48111111-1114",
//   gross_amount: "100000.00",
//   fraud_status: "accept",
//   expiry_time: "2026-02-16 22:52:28",
//   customer_details: {
// full_name: "tado",
// email: "muh.murtadlo@gmail.com",
//   },
//   currency: "IDR",
//   channel_response_message: "Approved",
//   channel_response_code: "00",
//   card_type: "credit",
//   bank: "bni",
//   approval_code: "1770565948650",
// }

export const CallbackPaymentDto = t.Object({
	fraud_status: t.String(),
	payment_type: t.String(),
	order_id: t.String(),
	gross_amount: t.String(),
});

export type CallbackPaymentDtoType = Static<typeof CallbackPaymentDto>;
