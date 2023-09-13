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

export enum PaymentTokenType {
  /**
   * The PayPal billing agreement ID. References an approved recurring payment for goods or services.
   */
  BILLING_AGREEMENT = "BILLING_AGREEMENT",
}

export enum ShippingPreference {
  /**
   * Get the customer-provided shipping address on the PayPal site.
   */
  GET_FROM_FILE = "GET_FROM_FILE",
  /**
   * Redacts the shipping address from the PayPal site. Recommended for digital goods.
   */
  NO_SHIPPING = "NO_SHIPPING",
  /**
   * Get the merchant-provided address. The customer cannot change this address on the PayPal site. If merchant does not pass an address, customer can choose the address on PayPal pages.
   */
  SET_PROVIDED_ADDRESS = "SET_PROVIDED_ADDRESS",
}

export enum LandingPage {
  /**
   * When the customer clicks **PayPal Checkout**, the customer is redirected to a page to log in to PayPal and approve the payment.
   */
  LOGIN = "LOGIN",
  /**
   * When the customer clicks **PayPal Checkout**, the customer is redirected to a page to enter credit or debit card and other relevant billing information required to complete the purchase. This option has previously been also called as 'BILLING'
   */
  GUEST_CHECKOUT = "GUEST_CHECKOUT",
  /**
   * When the customer clicks **PayPal Checkout**, the customer is redirected to either a page to log in to PayPal and approve the payment or to a page to enter credit or debit card and other relevant billing information required to complete the purchase, depending on their previous interaction with PayPal.
   */
  NO_PREFERENCE = "NO_PREFERENCE",
}

export enum UserAction {
  /**
   * After you redirect the customer to the PayPal payment page, a **Continue** button appears. Use this option when the final amount is not known when the checkout flow is initiated and you want to redirect the customer to the merchant page without processing the payment.
   */
  CONTINUE = "CONTINUE",
  /**
   * After you redirect the customer to the PayPal payment page, a **Pay Now** button appears. Use this option when the final amount is known when the checkout is initiated and you want to process the payment immediately when the customer clicks **Pay Now**.
   */
  PAY_NOW = "PAY_NOW",
}

export enum PaymentMethodPreference {
  /**
   * Accepts any type of payment from the customer.
   */
  UNRESTRICTED = "UNRESTRICTED",
  /**
   * Accepts only immediate payment from the customer. For example, credit card, PayPal balance, or instant ACH. Ensures that at the time of capture, the payment does not have the pending status.
   */
  IMMEDIATE_PAYMENT_REQUIRED = "IMMEDIATE_PAYMENT_REQUIRED",
}

export enum TaxIdType {
  /**
   * The individual tax ID type, typically is 11 characters long.
   */
  CPF = "BR_CPF",
  /**
   * The business tax ID type, typically is 14 characters long.
   */
  CNPJ = "BR_CNPJ",
}

export enum CustomerType {
  CONSUMER = "CONSUMER",
  BUSINESS = "BUSINESS",
}

export enum PaymentDataType {
  /**
   * The card was authenticated using 3D Secure (3DS) authentication scheme. While using this value make sure to populate cryptogram and eci_indicator as part of payment data..
   */
  THREE_DSECURE = "3DSECURE",
  /**
   * The card was authenticated using EMV method, which is applicable for China. While using this value make sure to pass emv_data and pin as part of payment data.
   */
  EMV = "EMV",
}

export enum StandardEntryClassCode {
  /**
   * The API caller (merchant/partner) accepts authorization and payment information from a consumer over the telephone.
   */
  TEL = "TEL",
  /**
   * The API caller (merchant/partner) accepts Debit transactions from a consumer on their website.
   */
  WEB = "WEB",
  /**
   * Cash concentration and disbursement for corporate debit transaction. Used to disburse or consolidate funds. Entries are usually Optional high-dollar, low-volume, and time-critical. (e.g. intra-company transfers or invoice payments to suppliers).
   */
  CCD = "CCD",
  /**
   * Prearranged payment and deposit entries. Used for debit payments authorized by a consumer account holder, and usually initiated by a company. These are usually recurring debits (such as insurance premiums).
   */
  PPD = "PPD",
}

export namespace Endpoints {
  export const ORDER_CHECKOUT = "checkout/orders";
}

export { default as Currencies } from "./currencies";
