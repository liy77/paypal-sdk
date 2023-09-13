import { Intent, PaymentStatus, RequestMethod } from "./constants";
import PayPalError from "./error";
import {
  PayPalClient,
  PayPalOrderLink,
  PayPalOrderOptions,
  PayPalPayer,
  PayPalPurchaseUnit,
  PaymentSource,
} from "./paypal";
import { camelCase, circularJSONResolver, snake_case } from "./utils";

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
  /**
   * The date and time when the transaction occurred, in [Internet date and time format](https://datatracker.ietf.org/doc/html/rfc3339#section-5.6).
   */
  createTime?: string;
  /**
   * The date and time when the transaction was last updated, in [Internet date and time format](https://datatracker.ietf.org/doc/html/rfc3339#section-5.6).
   */
  updateTime?: string;
  /**
   * The instruction to process an order.
   * @default "NO_INSTRUCTION"
   */
  processingInstruction?: ProcessingInstruction;
  /**
   * An array of purchase units. Each purchase unit establishes a contract between a customer and merchant. Each purchase unit represents either a full or partial order that the customer intends to purchase from the merchant.
   */
  purchaseUnits?: PayPalPurchaseUnit[];
  /**
   * The order status.
   */
  status?: PaymentStatus;
  /**
   * The customer who approves and pays for the order. The customer is also known as the payer.
   */
  payer?: PayPalPayer;
  /**
   * The payment source used to fund the payment.
   */
  paymentSource?: PaymentSource;
}

export class PayPalOrders {
  paypal: PayPalClient;
  constructor(paypal: PayPalClient) {
    this.paypal = paypal;
  }

  async create(data: PayPalOrderOptions): Promise<PayPalOrderResponse> {
    const res = await this.paypal._fetch("ORDER_CHECKOUT", {
      method: RequestMethod.POST,
      body: JSON.stringify(circularJSONResolver(data, snake_case)),
      headers: this.paypal._headers({
        "Content-Type": "application/json",
      }),
    });

    const json = (await res.json()) as Record<string, any>;

    if (!res.ok) {
      throw new PayPalError(json.name, json.message);
    }

    return circularJSONResolver(json, camelCase);
  }

  view() {}
}
