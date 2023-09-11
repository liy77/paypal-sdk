import type {
  DisbursementMode,
  Intent,
  ItemCategory,
  Mode,
  PayPalShippingType,
  RequestMethod,
} from "../constants";

export interface PayPalOptions {
  clientId: string;
  clientSecret: string;
  mode: Mode;
  defaultCurrency?: string;
}

/**
 * A string with a number inside
 */
export type whole_number = `${number}`;

export interface PayPalPurchaseValue {
  /**
   * The [three-character ISO-4217 currency code](https://developer.paypal.com/api/rest/reference/currency-codes/) that identifies the currency.
   */
  currencyCode: string;
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

// TODO: Implement all props
export interface PayPalOrderOptions {
  /**
   * The intent to either capture payment immediately or authorize a payment for an order after order creation.
   */
  intent: Intent;
  /**
   * An array of purchase units. Each purchase unit establishes a contract between a payer and the payee. Each purchase unit represents either a full or partial order that the payer intends to purchase from the payee.
   */
  purchaseUnits: PayPalPurchaseUnit[];
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
