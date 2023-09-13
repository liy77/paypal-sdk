import { Intent, PaymentStatus, RequestMethod } from "./constants";
import PayPalError from "./error";
import {
  PayPalOrderResponse as IPayPalOrderResponse,
  Json,
  PayPalClient,
  PayPalOrderLink,
  PayPalOrderOptions,
  PayPalOrderUpdate,
  PayPalPayer,
  PayPalPurchaseUnit,
  PaymentSource,
} from "./paypal";
import { camelCase, circularJSONResolver, impl, snake_case } from "./utils";

export class PayPalOrderResponse implements IPayPalOrderResponse {
  id?: string;
  links?: PayPalOrderLink[];
  intent?: Intent;
  createTime?: string;
  updateTime?: string;
  processingInstruction?: ProcessingInstruction;
  purchaseUnits?: PayPalPurchaseUnit[];
  status?: PaymentStatus;
  payer?: PayPalPayer;
  paymentSource?: PaymentSource;
  private _data: Json;

  constructor(private readonly paypal: PayPalClient, data: Json) {
    this._data = data;
    this.#impl();
  }

  #impl() {
    impl(this, this._data);

    return this;
  }

  async review() {
    if (!this.id) {
      throw new PayPalError(
        "CANNOT_REVIEW",
        "It will not be possible to review the data for this order because the id is missing"
      );
    }

    this._data = await this.paypal.orders._view(this.id);

    return this.#impl();
  }

  async update(data: PayPalOrderUpdate[]) {
    if (!this.id) {
      throw new PayPalError(
        "CANNOT_UPDATE",
        "It will not be possible to update this order because the id is missing"
      );
    }

    await this.paypal.orders.update(this.id, data);

    return this.review();
  }

  toJSON(): IPayPalOrderResponse {
    return circularJSONResolver(this._data, camelCase);
  }
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

    const json = (await res.json()) as Json;

    if (!res.ok) {
      throw new PayPalError(json.name, json.message);
    }

    return new PayPalOrderResponse(this.paypal, json);
  }

  /**
   * @private
   */
  async _view(orderId: string) {
    const res = await this.paypal._fetch(
      "ORDER_DETAILS",
      {
        method: RequestMethod.GET,
        headers: this.paypal._headers({
          "Content-Type": "application/json",
        }),
      },
      orderId
    );

    const json = (await res.json()) as Json;

    if (!res.ok) {
      throw new PayPalError(json.name, json.message);
    }

    return json;
  }

  async view(orderId: string) {
    return new PayPalOrderResponse(this.paypal, await this._view(orderId));
  }

  async update(orderId: string, data: PayPalOrderUpdate[]) {
    const res = await this.paypal._fetch(
      "ORDER_DETAILS",
      {
        method: RequestMethod.PATCH,
        body: JSON.stringify(data),
        headers: this.paypal._headers({
          "Content-Type": "application/json",
        }),
      },
      orderId
    );

    if (!res.ok) {
      const json = (await res.json()) as Json;

      throw new PayPalError(json.name, json.message);
    }
  }
}
