import { Address } from "./address";
import { Product } from "./product";
import { ShippingMethod } from "./shippingMethods";

export interface TestData {
  products: Product[];
  labels: Record<string, string>;
  categories: Record<string, string>;
  shipping: {
    default: string;
    methods: ShippingMethod[];
    address: Address;
  };
}