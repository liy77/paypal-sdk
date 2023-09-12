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
  OPTIONS = "OPTIONS",
}

export enum ProcessingInstruction {
  /**
   * API Caller expects the Order to be auto completed (i.e. for PayPal to authorize or capture depending on the intent) on completion of payer approval. This option is not relevant for payment_source that typically do not require a payer approval or interaction. This option is currently only available for the following payment_source: Alipay, Bancontact, BLIK, boletobancario, eps, giropay, GrabPay, iDEAL, Multibanco, MyBank, OXXO, P24, PayU, PUI, SafetyPay, SatisPay, Sofort, Trustly, Verkkopankki, WeChat Pay
   */
  ORDER_COMPLETE_ON_PAYMENT_APPROVAL = "ORDER_COMPLETE_ON_PAYMENT_APPROVAL",
  /**
   * The API caller intends to authorize `v2/checkout/orders/id/authorize` or capture `v2/checkout/orders/id/capture` after the payer approves the order.
   */
  NO_INSTRUCTION = "NO_INSTRUCTION",
}

export enum PaymentStatus {
  /**
   * The order was created with the specified context.
   */
  CREATED = "CREATED",
  /**
   * The order was saved and persisted. The order status continues to be in progress until a capture is made with `finalCapture = true` for all purchase units within the order.
   */
  SAVED = "SAVED",
  /**
   * The customer approved the payment through the PayPal wallet or another form of guest or unbranded payment. For example, a card, bank account, or so on.
   */
  APPROVED = "APPROVED",
  /**
   * All purchase units in the order are voided.
   */
  VOIDED = "VOIDED",
  /**
   * The payment was authorized or the authorized payment was captured for the order.
   */
  COMPLETED = "COMPLETED",
  /**
   * The order requires an action from the payer (e.g. 3DS authentication). Redirect the payer to the "rel":"payer-action" HATEOAS link returned as part of the response prior to authorizing or capturing the order.
   */
  PAYER_ACTION_REQUIRED = "PAYER_ACTION_REQUIRED",
}

export enum PhoneType {
  FAX = "FAX",
  HOME = "HOME",
  MOBILE = "MOBILE",
  OTHER = "OTHER",
  PAGER = "PAGER",
}

export enum StoreInVault {
  /**
   * Defines that the `paymentSource` will be vaulted only when at least one authorization or capture using that `paymentSource` is successful.
   */
  ON_SUCCESS = "ON_SUCCESS",
}

export enum PaymentInitiator {
  /**
   * Payment is initiated with the active engagement of the customer. e.g. a customer checking out on a merchant website.
   */
  CUSTOMER = "CUSTOMER",
  /**
   * Payment is initiated by merchant on behalf of the customer without the active engagement of customer. e.g. a merchant charging the monthly payment of a subscription to the customer.
   */
  MERCHANT = "MERCHANT",
}

export enum PaymentType {
  /**
   * One Time payment such as online purchase or donation. (e.g. Checkout with one-click).
   */
  ONE_TIME = "ONE_TIME",
  /**
   * Payment which is part of a series of payments with fixed or variable amounts, following a fixed time interval. (e.g. Subscription payments).
   */
  RECURRING = "RECURRING",
  /**
   * Payment which is part of a series of payments that occur on a non-fixed schedule and/or have variable amounts. (e.g. Account Topup payments).
   */
  UNSCHEDULED = "UNSCHEDULED",
}

export enum PaymentUsage {
  /**
   * Indicates the Initial/First payment with a paymentSource that is intended to be stored upon successful processing of the payment.
   */
  FIRST = "FIRST",
  /**
   * Indicates a payment using a stored paymentSource which has been successfully used previously for a payment.
   */
  SUBSEQUENT = "SUBSEQUENT",
  /**
   * Indicates that PayPal will derive the value of `FIRST` or `SUBSEQUENT` based on data available to PayPal.
   */
  DERIVED = "DERIVED",
}

export enum CardNetworks {
  VISA = "VISA",
  MASTERCARD = "MASTERCARD",
  DISCOVER = "DISCOVER",
  AMERICAN_EXPRESS = "AMEX",
  SOLO = "SOLO",
  JAPAN_CREDIT_BUREAU = "JCB",
  MILITARY_STAR = "STAR",
  DELTA_AIRLINES = "DELTA",
  SWITCH = "SWITCH",
  MAESTRO = "MAESTRO",
  CARTE_BANCAIRE_NATIONALE = "CB_NATIONALE",
  CONFIGOGA = "CONFIGOGA",
  CONFIDIS = "CONFIDIS",
  VISA_ELECTRON = "ELECTRON",
  CETELEM = "CETELEM",
  CHINA_UNION_PAY = "CHINA_UNION_PAY",
}

export enum ECIFlags {
  MASTERCARD_NON_3D_SECURE_TRANSACTION = "MASTERCARD_NON_3D_SECURE_TRANSACTION",
  MASTERCARD_ATTEMPTED_AUTHENTICATION_TRANSACTION = "MASTERCARD_ATTEMPTED_AUTHENTICATION_TRANSACTION",
  MASTERCARD_FULLY_AUTHENTICATED_TRANSACTION = "MASTERCARD_FULLY_AUTHENTICATED_TRANSACTION",
  FULLY_AUTHENTICATED_TRANSACTION = "FULLY_AUTHENTICATED_TRANSACTION",
  ATTEMPTED_AUTHENTICATION_TRANSACTION = "ATTEMPTED_AUTHENTICATION_TRANSACTION",
  NON_3D_SECURE_TRANSACTION = "NON_3D_SECURE_TRANSACTION",
}

export namespace Endpoints {
  export const ORDER_CHECKOUT = "checkout/orders";
}

export { default as Currencies } from "./currencies";
