import { fetch } from "undici";
import { Endpoints, Intent } from "./constants";
import PayPalError from "./error";
import { PayPalClient, PayPalOrderLink, PayPalOrderOptions } from "./paypal";
import { buildUrl, circularJSONResolver } from "./utils";

// TODO: Implement all props
export interface PayPalOrderResponse {
  /**
   * The Id of the order.
   */
  id?: string;
  /**
   * An array of request-related HATEOAS links. To complete payer approval, use the `approve` link to redirect the payer. The API caller has 3 hours (default setting, this which can be changed by your account manager to 24/48/72 hours to accommodate your use case) from the time the order is created, to redirect your payer. Once redirected, the API caller has 3 hours for the payer to approve the order and either authorize or capture the order. If you are not using the PayPal JavaScript SDK to initiate PayPal Checkout (in context) ensure that you include `applicationContext.returnUrl` is specified or you will get "We're sorry, Things don't appear to be working at the moment" after the payer approves the payment.
   */
  links?: PayPalOrderLink[];
  /**
   * The intent to either capture payment immediately or authorize a payment for an order after order creation.
   */
  intent?: Intent;
}

export class PayPalOrders {
  paypal: PayPalClient;
  constructor(paypal: PayPalClient) {
    this.paypal = paypal;
  }

  async create(data: PayPalOrderOptions): Promise<PayPalOrderResponse> {
    const res = await fetch(
      buildUrl(this.paypal.baseUrl, Endpoints.ORDER_CHECKOUT),
      {
        method: "POST",
        body: JSON.stringify(circularJSONResolver(data)),
        headers: this.paypal._headers({
          "Content-Type": "application/json",
        }),
      }
    );

    const json = (await res.json()) as Record<string, any>;

    if (!res.ok) {
      throw new PayPalError(json.name, json.message);
    }

    return json;
  }

  view() {}
}
