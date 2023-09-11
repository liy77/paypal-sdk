import { PayPalClient, PayPalOptions } from "./src/paypal";

export * as Constants from "./src/constants";
export * as Errors from "./src/error";
export * as Orders from "./src/orders";
export * as PayPal from "./src/paypal";
export * as Utils from "./src/utils";

export async function initPaypal(options: PayPalOptions) {
  const self = new PayPalClient(options);
  return self.getToken();
}
