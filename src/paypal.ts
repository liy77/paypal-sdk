import { fetch } from "undici";
import * as Constants from "./constants";
import PayPalError from "./error";
import { PayPalOptions } from "./interfaces";
import { PayPalOrders } from "./orders";

export * from "./interfaces";

interface PayPalPrivate {
  clientId: string;
  clientSecret: string;
  mode: Constants.Mode;
  token: string | null;
}

const PAYPAL_PRIVATE = Symbol("private");

export function getModeURL(mode: Constants.Mode, useV1 = false) {
  const production_url = useV1
    ? Constants.PAYPAL_PRODUCTION_URL_V1
    : Constants.PAYPAL_PRODUCTION_URL;
  const sandbox_url = useV1
    ? Constants.PAYPAL_SANDBOX_URL_V1
    : Constants.PAYPAL_SANDBOX_URL;

  return mode === Constants.Mode.PRODUCTION ? production_url : sandbox_url;
}

export class PayPalClient {
  [PAYPAL_PRIVATE]: PayPalPrivate;
  defaultCurrency: string;
  orders: PayPalOrders;
  baseUrl:
    | typeof Constants.PAYPAL_SANDBOX_URL
    | typeof Constants.PAYPAL_PRODUCTION_URL
    | typeof Constants.PAYPAL_PRODUCTION_URL_V1
    | typeof Constants.PAYPAL_SANDBOX_URL_V1;

  constructor(options: PayPalOptions) {
    if (!options || typeof options !== "object") {
      throw new PayPalError("INVALID_OPTIONS", "Invalid options provided.");
    }

    if (!options.clientId || typeof options.clientId !== "string") {
      throw new PayPalError(
        "INVALID_CLIENT_ID",
        "The client id must be a string"
      );
    }

    if (!options.clientSecret || typeof options.clientSecret !== "string") {
      throw new PayPalError(
        "INVALID_CLIENT_SECRET",
        "The client secret must be a string"
      );
    }

    if (
      !options.mode ||
      (options.mode !== "production" && options.mode !== "sandbox")
    ) {
      throw new PayPalError("INVALID_MODE", "Invalid mode provided in options");
    }

    this[PAYPAL_PRIVATE] = {
      clientId: options.clientId,
      clientSecret: options.clientSecret,
      mode: options.mode,
      token: null,
    };

    this.defaultCurrency = options.defaultCurrency || "USD";
    this.orders = new PayPalOrders(this);
    this.baseUrl = getModeURL(options.mode);
  }

  async getToken() {
    // Preparing base64
    const auth = Buffer.from(
      this[PAYPAL_PRIVATE].clientId + ":" + this[PAYPAL_PRIVATE].clientSecret
    ).toString("base64");

    const url = getModeURL(this[PAYPAL_PRIVATE].mode, true);
    const res = await fetch(url + "oauth2/token", {
      method: "POST",
      headers: {
        Authorization: "Basic " + auth,
      },
      body: "grant_type=client_credentials",
    });

    const data = (await res.json()) as Record<string, any>;

    // Verify if all it's ok
    if (res.ok) {
      this[PAYPAL_PRIVATE].token = data.access_token;
      return this;
    } else {
      throw new PayPalError(data.name, data.message);
    }
  }

  _defaultHeaders() {
    return {
      Authorization: `Bearer ${this[PAYPAL_PRIVATE].token}`,
    };
  }

  _headers<T extends Record<string, any>>(
    extra: T
  ) {
    return Object.assign(this._defaultHeaders(), extra);
  }
}
