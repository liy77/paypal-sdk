export const PAYPAL_PRODUCTION_URL = "https://api-m.paypal.com/v2/";
/**
 * @deprecated Use api v2 instead
 */
export const PAYPAL_PRODUCTION_URL_V1 = "https://api-m.paypal.com/v1/";
export const PAYPAL_SANDBOX_URL = "https://api-m.sandbox.paypal.com/v2/";
/**
 * @deprecated Use api v2 instead
 */
export const PAYPAL_SANDBOX_URL_V1 = "https://api-m.sandbox.paypal.com/v1/";

export enum Mode {
  PRODUCTION = "production",
  SANDBOX = "sandbox",
}

export enum Intent {
  /**
   * The merchant intends to capture payment immediately after the customer makes a payment.
   */
  CAPTURE = "CAPTURE",
  /**
   * The merchant intends to authorize a payment and place funds on hold after the customer makes a payment. Authorized payments are best captured within three days of authorization but are available to capture for up to 29 days. After the three-day honor period, the original authorized payment expires and you must re-authorize the payment. You must make a separate request to capture payments on demand.
   */
  AUTHORIZE = "AUTHORIZE",
}

export enum ItemCategory {
  /**
   * Goods that are stored, delivered, and used in their electronic format.
   *
   * This value is not currently supported for API callers that leverage the [PayPal for Commerce Platform](https://www.paypal.com/us/business/platforms-and-marketplaces) product.
   */
  DIGITAL_GOODS = "DIGITAL_GOODS",
  /**
   * A tangible item that can be shipped with proof of delivery.
   */
  PHYSICAL_GOODS = "PHYSICAL_GOODS",
  /**
   * A contribution or gift for which no good or service is exchanged, usually to a not for profit organization
   */
  DONATION = "DONATION",
}

export enum DisbursementMode {
  /**
   * The funds are released to the merchant immediately.
   */
  INSTANT = "INSTANT",
  /**
   * The funds are held for a finite number of days. The actual duration depends on the region and type of integration. You can release the funds through a referenced payout. Otherwise, the funds disbursed automatically after the specified duration.
   */
  DELAYED = "DELAYED",
}

export enum PayPalShippingType {
  /**
   * The payer intends to receive the items at a specified address.
   */
  SHIPPING = "SHIPPING",
  /**
   * The payer intends to pick up the items from the payee in person.
   */
  PICKUP_IN_PERSON = "PICK_UP_IN_PERSON",
}

export enum RequestMethod {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  PUT = "PUT",
  DELETE = "DELETE",
  CONNECT = "CONNECT",
  HEAD = "HEAD",
  OPTIONS = "OPTIONS"
}

export namespace Endpoints {
  export const ORDER_CHECKOUT = "checkout/orders";
}
