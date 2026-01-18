import { Address } from "./address";

export interface PaymentSummaryDetails {
  shippingAddress: Address;
  billingAddress: Address;
  cartTotal: string;
  shippingCost: string;
  grandTotal: string;
}