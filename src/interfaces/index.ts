import type {
  CardNetworks,
  Currencies,
  CustomerType,
  DisbursementMode,
  ECIFlags,
  Intent,
  ItemCategory,
  LandingPage,
  Mode,
  PayPalShippingType,
  PaymentDataType,
  PaymentInitiator,
  PaymentMethodPreference,
  PaymentStatus,
  PaymentTokenType,
  PaymentType,
  PaymentUsage,
  PhoneType,
  RequestMethod,
  ShippingPreference,
  StoreInVault,
  TaxIdType,
  UpdateOPCodes,
  UserAction,
} from "../constants";

export interface PayPalOptions {
  clientId: string;
  clientSecret: string;
  mode: Mode;
}

export type FunctionArgs<T> = T extends (...args: infer Args) => any
  ? Args
  : never;

export type Json = {
  [x: string]: any;
};

/**
 * A string with a number inside
 */
export type whole_number = `${number}`;

export interface PayPalPurchaseValue {
  /**
   * The [three-character ISO-4217 currency code](https://developer.paypal.com/api/rest/reference/currency-codes/) that identifies the currency.
   */
  currencyCode: Currencies;
  /**
   * The value, which might be:
   *
   * - An integer for currencies like `JPY` that are not typically fractional.
   * - A decimal fraction for currencies like `TND` that are subdivided into thousandths.
   *
   * For the required number of decimal places for a currency code, see [Currency Codes](https://developer.paypal.com/api/rest/reference/currency-codes/).
   */
  value: whole_number | number;
}

export interface PayPalPurchaseAmountBreakdown {
  /**
   * The subtotal for all items. Required if the request includes `purchaseUnits[].items[].unitAmount`. Must equal the sum of `(items[].unitAmount * items[].quantity)` for all items. `itemTotal.value` can not be a negative number.
   */
  itemTotal?: PayPalPurchaseValue;
  /**
   * The shipping fee for all items within a given `purchaseUnit`. `shipping.value` can not be a negative number.
   */
  shipping?: PayPalPurchaseValue;
  /**
   * The handling fee for all items within a given `purchaseUnit`. `handling.value` can not be a negative number.
   */
  handling?: PayPalPurchaseValue;
  /**
   * The total tax for all items. Required if the request includes `purchaseUnits.items.tax`. Must equal the sum of `(items[].tax * items[].quantity)` for all items. `taxTotal.value` can not be a negative number.
   */
  taxTotal?: PayPalPurchaseValue;
  /**
   * The insurance fee for all items within a given `purchaseUnit`. `insurance.value` can not be a negative number.
   */
  insurance?: PayPalPurchaseValue;
  /**
   * The shipping discount for all items within a given `purchaseUnit`. `shippingDiscount.value` can not be a negative number.
   */
  shippingDiscount?: PayPalPurchaseValue;
  /**
   * The discount for all items within a given `purchaseUnit`. `discount.value` can not be a negative number.
   */
  discount?: PayPalPurchaseValue;
}

export interface PayPalPurchaseAmount extends PayPalPurchaseValue {
  /**
   * The breakdown of the amount. Breakdown provides details such as total item amount, total tax amount, shipping, handling, insurance, and discounts, if any.
   */
  breakdown?: PayPalPurchaseAmountBreakdown;
}

export interface PayPalItem {
  /**
   * The item name or title.
   */
  name: string;
  /**
   * The item quantity. Must be a whole number.
   */
  quantity: whole_number | number;
  /**
   * The detailed item description.
   */
  description?: string;
  /**
   * The stock keeping unit (SKU) for the item.
   */
  sku?: string;
  /**
   * The item category type.
   */
  category?: ItemCategory;
  /**
   * The item price or rate per unit. If you specify `unit_amount`, `purchase_units[].amount.breakdown.item_total` is required. Must equal `unit_amount * quantity` for all items. `unit_amount.value` can not be a negative number.
   */
  unitAmount?: PayPalPurchaseValue;
  /**
   * The item tax for each unit. If `tax` is specified, `purchase_units[].amount.breakdown.tax_total` is required. Must equal `tax * quantity` for all items. `tax.value` can not be a negative number.
   */
  tax?: PayPalPurchaseValue;
}

export interface PayPalPayee {
  /**
   * The email address of merchant.
   */
  emailAddress?: string;
  /**
   * The encrypted PayPal account Id of the merchant.
   */
  merchantId?: string;
}

export interface PlatformFee {
  amount: PayPalPurchaseValue;
  payee?: PayPalPayee;
}

export interface PaymentInstruction {
  /**
   * An array of various fees, commissions, tips, or donations. This field is only applicable to merchants that been enabled for PayPal Commerce Platform for Marketplaces and Platforms capability.
   */
  platformFees?: PlatformFee[];
  /**
   * This field is only enabled for selected merchants/partners to use and provides the ability to trigger a specific pricing rate/plan for a payment transaction. The list of eligible 'payee_pricing_tier_id' would be provided to you by your Account Manager. Specifying values other than the one provided to you by your account manager would result in an error.
   */
  payeePricingTierId?: string;
  /**
   * FX identifier generated returned by PayPal to be used for payment processing in order to honor FX rate (for eligible integrations) to be used when amount is settled/received into the payee account.
   */
  payeeReceivableFxRateId?: string;
  /**
   * The funds that are held payee by the marketplace/platform. This field is only applicable to merchants that been enabled for PayPal Commerce Platform for Marketplaces and Platforms capability.
   *
   * @default "INSTANT"
   */
  disbursementMode?: DisbursementMode;
}

export interface PayPalName {
  /**
   * When the party is a person, the party's given, or first, name.
   */
  givenName?: string;
  /**
   * When the party is a person, the party's surname or family name. Also known as the last name. Required when the party is a person. Use also to store multiple surnames including the matronymic, or mother's, surname.
   */
  surname?: string;
}

export interface PayPalAddress {
  /**
   *The first line of the address, such as number and street, for example, `173 Drury Lane`. Needed for data entry, and Compliance and Risk checks. This field needs to pass the full address.
   */
  addressLine1?: string;
  /**
   * The second line of the address, for example, a suite or apartment number.
   */
  addressLine2?: string;
  /**
   * The highest-level sub-division in a country, which is usually a province, state, or **ISO-3166-2** subdivision. This data is formatted for postal delivery, for example, `CA` and not `California`. Value, by country, is:
   *
   * - UK. A county.
   * - US. A state.
   * - Canada. A province.
   * - Japan. A prefecture.
   * - Switzerland. A kanton.
   */
  adminArea1?: string;
  /**
   * A city, town, or village. Smaller than `adminAreaLevel1`.
   */
  adminArea2?: string;
  /**
   * The postal code, which is the ZIP code or equivalent. Typically required for countries with a postal code or an equivalent. See [postal code](https://en.wikipedia.org/wiki/Postal_code).
   */
  postalCode?: string;
  /**
   * The [2-character ISO 3166-1 code](https://developer.paypal.com/api/rest/reference/country-codes/) that identifies the country or region.
   *
   *
   * ***Note:*** The country code for Great Britain is `GB` and not `UK` as used in the top-level domain names for that country. Use the `C2` country code for China worldwide for comparable uncontrolled price (CUP) method, bank card, and cross-border transactions.
   */
  countryCode: string;
}

export interface PayPalShipping {
  /**
   * The method by which the payer wants to get their items from the payee e.g shipping, in-person pickup. Either type or options but not both may be present.
   */
  type?: PayPalShippingType;
  /**
   * The name of the person to whom to ship the items. Supports only the `fullName` property.
   */
  name?: PayPalName;
  /**
   * The address of the person to whom to ship the items. Supports only the `addressLine1`, `addressLine2`, `adminArea1`, `adminArea2`, `postalCode`, and `countryCode` properties.
   */
  address: PayPalAddress;
}

/**
 * The level 2 card processing data collections. If your merchant account has been configured for Level 2 processing this field will be passed to the processor on your behalf. Please contact your PayPal Technical Account Manager to define level 2 data for your business.
 */
export interface PayPalCardLevel2 {
  /**
   * Use this field to pass a purchase identification value of up to 12 ASCII characters for AIB and 17 ASCII characters for all other processors.
   */
  invoiceId?: string;
  /**
   * Use this field to break down the amount of tax included in the total purchase amount. The value provided here will not add to the total purchase amount. The value can't be negative, and in most cases, it must be greater than zero in order to qualify for lower interchange rates. Value, by country, is:
   *
   * ```txt
   * UK. A county.
   * US. A state.
   * Canada. A province.
   * Japan. A prefecture.
   * Switzerland. A kanton.
   * ```
   */
  taxTotal?: PayPalPurchaseValue;
}

/**
 * The level 3 card processing data collections, If your merchant account has been configured for Level 3 processing this field will be passed to the processor on your behalf. Please contact your PayPal Technical Account Manager to define level 3 data for your business.
 */
export interface PayPalCardLevel3 {
  /**
   * Use this field to specify the postal code of the shipping location.
   */
  shipsFromPostalCode?: string;
  /**
   * A list of the items that were purchased with this payment. If your merchant account has been configured for Level 3 processing this field will be passed to the processor on your behalf.
   */
  lineItems?: PayPalItem[];
  /**
   * Use this field to break down the shipping cost included in the total purchase amount. The value provided here will not add to the total purchase amount. The value cannot be negative.
   */
  shippingAmount?: PayPalPurchaseValue;
  /**
   * Use this field to break down the duty amount included in the total purchase amount. The value provided here will not add to the total purchase amount. The value cannot be negative.
   */
  dutyAmount?: PayPalPurchaseValue;
  /**
   * Use this field to break down the discount amount included in the total purchase amount. The value provided here will not add to the total purchase amount. The value cannot be negative.
   */
  discountAmount?: PayPalPurchaseValue;
  /**
   * The address of the person to whom to ship the items. Supports only the `addressLine1`, `addressLine2`, `adminArea1`, `adminArea2`, `postalCode`, and `countryCode` properties.
   */
  shippingAddress?: PayPalAddress;
}

/**
 * Merchants and partners can add Level 2 and 3 data to payments to reduce risk and payment processing costs. For more information about processing payments, see checkout or multiparty checkout.
 */
export interface PayPalCard {
  /**
   * The level 2 card processing data collections. If your merchant account has been configured for Level 2 processing this field will be passed to the processor on your behalf. Please contact your PayPal Technical Account Manager to define level 2 data for your business.
   */
  level2: PayPalCardLevel2;
  /**
   * The level 3 card processing data collections, If your merchant account has been configured for Level 3 processing this field will be passed to the processor on your behalf. Please contact your PayPal Technical Account Manager to define level 3 data for your business.
   */
  level3: PayPalCardLevel3;
}

export interface PayPalSupplementaryData {
  /**
   * Merchants and partners can add Level 2 and 3 data to payments to reduce risk and payment processing costs. For more information about processing payments, see checkout or multiparty checkout.
   */
  card?: PayPalCard;
}

export interface PayPalPurchaseUnit {
  /**
   * The API caller-provided external Id for the purchase unit. Required for multiple purchase units when you must update the order through ` PATCH` . If you omit this value and the order contains only one purchase unit, PayPal sets this value to ` default` .
   */
  referenceId?: string;
  /**
   * The purchase description. The maximum length of the character is dependent on the type of characters used. The character length is specified assuming a US ASCII character. Depending on type of character; (e.g. accented character, Japanese characters) the number of characters that that can be specified as input might not equal the permissible max length.
   */
  description?: string;
  /**
   * The API caller-provided external Id. Used to reconcile client transactions with PayPal transactions. Appears in transaction and settlement reports but is not visible to the payer.
   */
  customId?: string;
  /**
   * The API caller-provided external invoice number for this order. Appears in both the payer's transaction history and the emails that the payer receives.
   */
  invoiceId?: string;
  /**
   * An array of items that the customer purchases from the merchant.
   */
  items?: PayPalItem[];
  /**
   * The total order amount with an optional breakdown that provides details, such as the total item amount, total tax amount, shipping, handling, insurance, and discounts, if any.
   * If you specify `amount.breakdown`, the amount equals `item_total` + `tax_total` + `shipping` + `handling` + `insurance` - `shipping_discount` - `discount`.
   * The amount must be a positive number. The `amount.value` field supports up to 15 digits preceding the decimal. For a list of supported currencies, decimal precision, and maximum charge amount, see the PayPal REST APIs [Currency Codes](https://developer.paypal.com/api/rest/reference/currency-codes/).
   */
  amount: PayPalPurchaseAmount;
  /**
   * The merchant who receives payment for this transaction.
   */
  payee?: PayPalPayee;
  /**
   * Any additional payment instructions to be consider during payment processing.
   * This processing instruction is applicable for Capturing an order or Authorizing an Order.
   */
  paymentInstruction?: PaymentInstruction;
  /**
   * The name and address of the person to whom to ship the items.
   */
  shipping?: PayPalShipping;
  /**
   * Contains Supplementary Data.
   */
  supplementaryData?: PayPalSupplementaryData;
}

export interface PayPalPhoneNumber {
  /**
   * The national number, in its canonical international [E.164 numbering plan format](https://www.itu.int/rec/T-REC-E.164/en). The combined length of the country calling code (CC) and the national number must not be greater than 15 digits. The national number consists of a national destination code (NDC) and subscriber number (SN).
   */
  nationalNumber: string;
}

export interface PayPalPhone {
  /**
   * The phone type.
   */
  phoneType?: PhoneType;
  /**
   * The phone number, in its canonical international [E.164 numbering plan format](https://www.itu.int/rec/T-REC-E.164/en). Supports only the nationalNumber property.
   */
  phoneNumber: PayPalPhoneNumber;
}

export interface PayPalCustomer {
  /**
   * The unique ID for a customer generated by PayPal.
   */
  id?: string;
  /**
   * Email address of the buyer as provided to the merchant or on file with the merchant. Email Address is required if you are processing the transaction using PayPal Guest Processing which is offered to select partners and merchants. For all other use cases we do not expect partners/merchant to send `emailAddress` of their customer.
   */
  emailAddress?: string;
  /**
   * The phone number of the buyer as provided to the merchant or on file with the merchant. The `phone.phoneNumber` supports only `nationalNumber`.
   */
  phone?: PayPalPhone;
}

export interface PayPalVault {
  /**
   * Defines how and when the payment source gets vaulted.
   */
  storeInVault?: StoreInVault;
  /**
   * The description displayed to PayPal consumer on the approval flow for PayPal, as well as on the PayPal payment token management experience on PayPal.com.
   */
  description?: string;
  /**
   * Expected business/pricing model for the billing agreement.
   */
  usagePattern?: string;
  /**
   * The usage type associated with the PayPal payment token.
   */
  usageType: string;
  /**
   * The customer type associated with the PayPal payment token. This is to indicate whether the customer acting on the merchant / platform is either a business or a consumer.
   * @default "CONSUMER"
   */
  customerType?: CustomerType;
  /**
   * Create multiple payment tokens for the same payer, merchant/platform combination. Use this when the customer has not logged in at merchant/platform. The payment token thus generated, can then also be used to create the customer account at merchant/platform. Use this also when multiple payment tokens are required for the same payer, different customer at merchant/platform. This helps to identify customers distinctly even though they may share the same PayPal account. This only applies to PayPal payment source.
   * @default false
   */
  permitMultiplePaymentTokens?: boolean;
}

export interface PaymentCardAttributes {
  /**
   * The details about a customer in PayPal's system of record.
   */
  customer?: PayPalCustomer;
  /**
   * Instruction to vault the card based on the specified strategy.
   */
  vault?: Pick<PayPalVault, "storeInVault">;
}

export interface PreviousNetworkTransactionReference {
  /**
   * Transaction reference id returned by the scheme. For Visa and Amex, this is the "Tran id" field in response. For MasterCard, this is the "BankNet reference id" field in response. For Discover, this is the "NRID" field in response. The pattern we expect for this field from Visa/Amex/CB/Discover is numeric, Mastercard/BNPP is alphanumeric and Paysecure is alphanumeric with special character -.
   */
  id: string;
  /**
   * The date that the transaction was authorized by the scheme. This field may not be returned for all networks. MasterCard refers to this field as "BankNet reference date.
   */
  date?: string;
  /**
   * Reference ID issued for the card transaction. This ID can be used to track the transaction across processors, card brands and issuing banks.
   */
  acquirerReferenceNumber?: string;
  /**
   * Name of the card network through which the transaction was routed.
   */
  network?: CardNetworks;
}

export interface PayPalStoredCredential {
  /**
   * The person or party who initiated or triggered the payment.
   */
  paymentInitiator: PaymentInitiator;
  /**
   * Indicates the type of the stored payment_source payment.
   */
  paymentType: PaymentType;
  /**
   * Indicates if this is a `first` or `subsequent` payment using a stored payment source (also referred to as stored credential or card on file).
   * @default "FIRST"
   */
  usage?: PaymentUsage;
  /**
   * Reference values used by the card network to identify a transaction.
   */
  previousNetworkTransactionReference?: PreviousNetworkTransactionReference;
}

export interface ThreePartyNetwork {
  /**
   * Third party network token number.
   */
  number: string;
  /**
   * An Encrypted one-time use value that's sent along with Network Token. This field is not required to be present for recurring transactions.
   */
  cryptogram?: string;
  /**
   * A TRID, or a Token Requestor ID, is an identifier used by merchants to request network tokens from card networks. A TRID is a precursor to obtaining a network token for a credit card primary account number (PAN), and will aid in enabling secure card on file (COF) payments and reducing fraud.
   */
  tokenRequestorId?: string;
  /**
   * The card expiration year and month, in [Internet date format](https://datatracker.ietf.org/doc/html/rfc3339#section-5.6).
   */
  expiry: string;
  /**
   * Electronic Commerce Indicator (ECI). The ECI value is part of the 2 data elements that indicate the transaction was processed electronically. This should be passed on the authorization transaction to the Gateway/Processor.
   */
  eciFlag?: ECIFlags;
}

export interface PaymentCard {
  /**
   * The card holder's name as it appears on the card.
   */
  name?: string;
  /**
   * The primary account number (PAN) for the payment card.
   */
  number?: string;
  /**
   * The three- or four-digit security code of the card. Also known as the CVV, CVC, CVN, CVE, or CID. This parameter cannot be present in the request when `paymentInitiator=MERCHANT`.
   */
  securityCode?: string;
  /**
   * The card expiration year and month, in [Internet date format](https://datatracker.ietf.org/doc/html/rfc3339#section-5.6).
   */
  expiry?: string;
  /**
   * The billing address for this card. Supports only the `addressLine1`, `addressLine2`, `adminArea1`, `adminArea2`, `postalCode`, and `countryCode` properties.
   */
  billingAddress?: PayPalAddress;
  /**
   * Additional attributes associated with the use of this card.
   */
  attributes?: PaymentCardAttributes;
  /**
   * Provides additional details to process a payment using a `card` that has been stored or is intended to be stored (also referred to as stored_credential or card-on-file).
   *
   * Parameter compatibility:
   *
   * - `paymentType=ONE_TIME` is compatible only with `paymentInitiator=CUSTOMER`.
   * - `usage=FIRST` is compatible only with `paymentInitiator=CUSTOMER`.
   * - `previousTransactionReference` or `previousNetworkTransactionReference` is compatible only with `paymentInitiator=MERCHANT`.
   * - Only one of the parameters - `previousTransactionReference` and `previousNetworkTransactionReference` - can be present in the request.
   */
  storedCredential?: PayPalStoredCredential;
  /**
   * The PayPal-generated ID for the saved card payment source. Typically stored on the merchant's server.
   */
  vaultId?: string;
  /**
   * A 3rd party network token refers to a network token that the merchant provisions from and vaults with an external TSP (Token Service Provider) other than PayPal.
   */
  networkToken?: ThreePartyNetwork;
}

export interface PaymentSourceToken {
  /**
   * The PayPal-generated ID for the token.
   */
  id: string;
  /**
   * The tokenization method that generated the ID.
   */
  type: PaymentTokenType;
}

export interface PaymentSourcePayPalExperienceContext {
  /**
   * The label that overrides the business name in the PayPal account on the PayPal site. The pattern is defined by an external party and supports Unicode.
   */
  brandName?: string;
  /**
   * The location from which the shipping address is derived.
   * @default "GET_FROM_FILE"
   */
  shippingPreference?: ShippingPreference;
  /**
   * The type of landing page to show on the PayPal site for customer checkout.
   * @default "NO_PREFERENCE"
   */
  landingPage?: LandingPage;
  /**
   * Configures a **Continue** or **Pay Now** checkout flow.
   * @default "CONTINUE"
   */
  userAction?: UserAction;
  /**
   * The merchant-preferred payment methods.
   * @default "UNRESTRICTED"
   */
  paymentMethodPreference?: PaymentMethodPreference;
  /**
   * The BCP 47-formatted locale of pages that the PayPal payment experience shows. PayPal supports a five-character code.
   */
  locale?: string;
  /**
   * The URL where the customer is redirected after the customer approves the payment.
   */
  returnUrl?: string;
  /**
   * The URL where the customer is redirected after the customer cancels the payment.
   */
  cancelUrl?: string;
}

/**
 * The tax information of the PayPal account holder. Required only for Brazilian PayPal account holder's. Both `taxId` and `taxIdType` are required.
 */
export interface PayPalTaxInfo {
  /**
   * The customer's tax ID value.
   */
  taxId: string;
  /**
   * The customer's tax ID type.
   */
  taxIdType: TaxIdType;
}

export interface PaymentSourceAttributes {
  /**
   * The details about a customer in PayPal's system of record.
   */
  customer?: Pick<PayPalCustomer, "id">;
  /**
   * Attributes used to provide the instructions during vaulting of the PayPal Wallet.
   */
  vault?: PayPalVault;
}

export interface PaymentSourcePayPal {
  /**
   * Customizes the payer experience during the approval process for payment with PayPal.
   */
  experienceContext?: PaymentSourcePayPalExperienceContext;
  /**
   * The PayPal billing agreement ID. References an approved recurring payment for goods or services.
   */
  billingAgreementId?: string;
  /**
   * The PayPal-generated ID for the `paymentSource` stored within the Vault.
   */
  vaultId?: string;
  /**
   * The PayPal-generated ID for the `paymentSource` stored within the Vault.
   */
  emailAddress?: string;
  /**
   * The name of the PayPal account holder. Supports only the **givenName** and **surname** properties.
   */
  name?: PayPalName;
  /**
   * The phone number of the customer. Available only when you enable the **Contact Telephone Number** option in the [Profile & Settings](https://www.paypal.com/cgi-bin/customerprofileweb?cmd=_profile-website-payments&amp;_ga=2.2236598.702995990.1694442505-1664691600.1693059333) for the merchant's PayPal account. The **phone.phoneNumber** supports only **nationalNumber**.
   */
  phone?: PayPalPhone;
  /**
   * The birth date of the PayPal account holder in `YYYY-MM-DD` format.
   */
  birthDate?: string;
  /**
   * The tax information of the PayPal account holder. Required only for Brazilian PayPal account holder's. Both `taxId` and `taxIdType` are required.
   */
  taxInfo?: PayPalTaxInfo;
  /**
   * The address of the PayPal account holder. Supports only the `addressLine1`, `addressLine2`, `adminArea1`, `adminArea2`, `postalCode`, and `countryCode` properties.
   */
  address?: PayPalAddress;
  /**
   * Additional attributes associated with the use of this wallet.
   */
  attributes?: PaymentSourceAttributes;
}

export interface PayPalPayer
  extends Omit<
    PaymentSourcePayPal,
    "attributes" | "experienceContext" | "vaultId" | "billingAgreementId"
  > {
  /**
   * The PayPal-assigned ID for the payer.
   */
  payerId?: string;
}

export interface BasePaymentBankMethod {
  /**
   * The name of the account holder associated with this payment method.
   */
  name: string;
  /**
   * The two-character ISO 3166-1 country code.
   */
  countryCode: string;
  /**
   * Customizes the payer experience during the approval process for the payment.
   */
  experienceContext?: PaymentSourcePayPalExperienceContext;
}

export interface Bancontact extends BasePaymentBankMethod {}

export interface Blik extends BasePaymentBankMethod {
  /**
   * The email address of the account holder associated with this payment method.
   */
  email?: string;
}

export interface EPS extends BasePaymentBankMethod {}

export interface GiroPay extends BasePaymentBankMethod {}

export interface iDEAL extends BasePaymentBankMethod {
  /**
   * The bank identification code (BIC).
   */
  bic?: string;
}

export interface MyBank extends BasePaymentBankMethod {}

export interface P24 extends BasePaymentBankMethod {
  /**
   * The email address of the account holder associated with this payment method.
   */
  email: string;
}

export interface SOFORT extends BasePaymentBankMethod {}

export interface Trustly extends BasePaymentBankMethod {}

export interface ApplePayPaymentData {
  /**
   * Online payment cryptogram, as defined by 3D Secure. The pattern is defined by an external party and supports Unicode.
   */
  cryptogram?: string;
  /**
   * ECI indicator, as defined by 3- Secure. The pattern is defined by an external party and supports Unicode.
   */
  eciIndicator?: string;
  /**
   * Encoded Apple Pay EMV Payment Structure used for payments in China. The pattern is defined by an external party and supports Unicode.
   */
  emvData?: string;
  /**
   * Bank Key encrypted Apple Pay PIN. The pattern is defined by an external party and supports Unicode.
   */
  pin?: string;
}

export interface DecryptedToken {
  /**
   * Apple Pay Hex-encoded device manufacturer identifier. The pattern is defined by an external party and supports Unicode.
   */
  deviceManufacturerId?: string;
  /**
   * Indicates the type of payment data passed, in case of Non China the payment data is 3DSECURE and for China it is EMV.
   */
  paymentDataType?: PaymentDataType;
  /**
   * The transaction amount for the payment that the payer has approved on apple platform.
   */
  transactionAmount?: PayPalPurchaseValue;
  /**
   * Apple Pay tokenized credit card used to pay.
   */
  tokenizedCard: Omit<
    PaymentCard,
    "storedCredential" | "vaultId" | "networkToken"
  >;
  /**
   * Apple Pay payment data object which contains the cryptogram, eci_indicator and other data.
   */
  paymentData?: ApplePayPaymentData;
}

export interface ApplePay {
  /**
   * ApplePay transaction identifier, this will be the unique identifier for this transaction provided by Apple. The pattern is defined by an external party and supports Unicode.
   */
  id?: string;
  /**
   * Provides additional details to process a payment using a `card` that has been stored or is intended to be stored (also referred to as stored_credential or card-on-file).
   *
   * Parameter compatibility:
   *
   * - `paymentType=ONE_TIME` is compatible only with `paymentInitiator=CUSTOMER`.
   * - `usage=FIRST` is compatible only with `paymentInitiator=CUSTOMER`.
   * - `previousTransactionReference` or `previousNetworkTransactionReference` is compatible only with `paymentInitiator=MERCHANT`.
   * - Only one of the parameters - `previousTransactionReference` and `previousNetworkTransactionReference` - can be present in the request.
   */
  storedCredential?: PayPalStoredCredential;
  /**
   * Name on the account holder associated with apple pay.
   */
  name?: string;
  /**
   * The email address of the account holder associated with apple pay.
   */
  emailAddress?: string;
  /**
   * The phone number, in its canonical international [E.164 numbering plan format](https://www.itu.int/rec/T-REC-E.164/en). Supports only the `nationalNumber` property.
   */
  phoneNumber?: PayPalPhoneNumber;
  /**
   * The PayPal-generated ID for the saved apple pay paymentSource. This ID should be stored on the merchant's server so the saved payment source can be used for future transactions.
   */
  vaultId?: string;
  /**
   * The decrypted payload details for the apple pay token.
   */
  decryptedToken?: PaymentSourceToken;
}

export interface VenmoAttributes {
  /**
   * The details about a customer in PayPal's system of record.
   */
  customer?: Pick<PayPalCustomer, "id">;
  /**
   * Attributes used to provide the instructions during vaulting of the Venmo Wallet.
   */
  vault?: PayPalVault;
}

export interface Venmo
  extends Pick<BasePaymentBankMethod, "experienceContext"> {
  /**
   * The PayPal-generated ID for the saved Venmo wallet paymentSource. This ID should be stored on the merchant's server so the saved payment source can be used for future transactions.
   */
  vaultId?: string;
  /**
   * The email address of the payer.
   */
  emailAddress?: string;
  attributes?: VenmoAttributes;
}

export interface PaymentSource {
  /**
   * The payment card to use to fund a payment. Can be a credit or debit card.
   */
  card?: PaymentCard;
  /**
   * The tokenized payment source to fund a payment.
   */
  token?: PaymentSourceToken;
  /**
   * Indicates that PayPal Wallet is the payment source. Main use of this selection is to provide additional instructions associated with this choice like vaulting.
   */
  paypal?: PaymentSourcePayPal;
  /**
   * Bancontact is the most popular online payment in Belgium. [More Details](https://www.bancontact.com).
   */
  bancontact?: Bancontact;
  /**
   * BLIK is a mobile payment system, created by Polish Payment Standard in order to allow millions of users to pay in shops, payout cash in ATMs and make online purchases and payments. [More Details](https://blikmobile.pl).
   */
  blik?: Blik;
  /**
   * The eps transfer is an online payment method developed by many Austrian banks. [More Details](https://www.eps-ueberweisung.at).
   */
  eps?: EPS;
  /**
   * Giropay is an Internet payment System in Germany, based on online banking. [More Details](https://giropay.de).
   */
  giropay?: GiroPay;
  /**
   * The Dutch payment method iDEAL is an online payment method that enables consumers to pay online through their own bank. [More Details](https://www.ideal.nl).
   */
  ideal?: iDEAL;
  /**
   * MyBank is an e-authorisation solution which enables safe digital payments and identity authentication through a consumer’s own online banking portal or mobile application. [More Details](https://www.mybank.eu).
   */
  mybank?: MyBank;
  /**
   * P24 (Przelewy24) is a secure and fast online bank transfer service linked to all the major banks in Poland. [More Details](https://www.przelewy24.pl).
   */
  p24?: P24;
  /**
   * SOFORT Banking is a real-time bank transfer payment method that buyers use to transfer funds directly to merchants from their bank accounts. [More Details](https://www.klarna.com/sofort/).
   */
  sofort?: SOFORT;
  /**
   * Trustly is a payment method that allows customers to shop and pay from their bank account. [More Details](https://www.trustly.net).
   */
  trustly?: Trustly;
  /**
   * ApplePay payment source, allows buyer to pay using ApplePay, both on Web as well as on Native.
   */
  apple_pay?: ApplePay;
  /**
   * Information needed to indicate that Venmo is being used to fund the payment.
   */
  venmo?: Venmo;
}

export interface StoredPaymentSource extends PayPalStoredCredential {}

export interface PayPalOrderApplicationContext
  extends PaymentSourcePayPalExperienceContext {
  /**
   * Provides additional details to process a payment using a `paymentSource` that has been stored or is intended to be stored (also referred to as storedCredential or card-on-file).
   *
   * Parameter compatibility:
   *
   * - `paymentType=ONE_TIME` is compatible only with `paymentInitiator=CUSTOMER`.
   * - `usage=FIRST` is compatible only with `paymentInitiator=CUSTOMER`.
   * - `previousTransactionReference` or `previousNetworkTransactionReference` is compatible only with `paymentInitiator=MERCHANT`.
   * - Only one of the parameters - `previousTransactionReference` and `previousNetworkTransactionReference` - can be present in the request.
   */
  storedPaymentSource?: StoredPaymentSource;
}

export interface PayPalOrderOptions {
  /**
   * The intent to either capture payment immediately or authorize a payment for an order after order creation.
   */
  intent: Intent;
  /**
   * An array of purchase units. Each purchase unit establishes a contract between a payer and the payee. Each purchase unit represents either a full or partial order that the payer intends to purchase from the payee.
   */
  purchaseUnits: PayPalPurchaseUnit[];
  /**
   * The payment source definition.
   */
  paymentSource?: PaymentSource;
  /**
   * Customize the payer experience during the approval process for the payment with PayPal.
   */
  applicationContext?: PayPalOrderApplicationContext;
}

export interface PayPalOrderLink {
  /**
   * The complete target URL. To make the related call, combine the method with this [URI Template-formatted](https://datatracker.ietf.org/doc/html/rfc6570) link. For pre-processing, include the `$`, `(`, and `)` characters. The `href` is the key HATEOAS component that links a completed call with a subsequent call.
   */
  href: string;
  /**
   * The [link relation type](https://datatracker.ietf.org/doc/html/rfc5988#section-4), which serves as an ID for a link that unambiguously describes the semantics of the link. See [Link Relations](https://www.iana.org/assignments/link-relations/link-relations.xhtml).
   */
  rel: string;
  /**
   * The HTTP method required to make the related call.
   */
  method?: RequestMethod;
}

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

export interface PayPalOrderUpdate {
  /**
   * The operation
   */
  op: UpdateOPCodes;
  /**
   * The [JSON Pointer](https://datatracker.ietf.org/doc/html/rfc6901) to the target document location at which to complete the operation.
   */
  path?: string;
  /**
   * The value to apply. The `remove`, `copy`, and `move` operations do not require a value. Since [JSON Patch](https://www.rfc-editor.org/rfc/rfc69021) allows any type for `value`,, the `type` property is not specified.
   */
  value?: any;
  /**
   * The [JSON Pointer](https://datatracker.ietf.org/doc/html/rfc6901) to the target document location from which to move the value. Required for the move operation.
   */
  from?: string;
}
