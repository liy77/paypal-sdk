<p align="left" style="display: flex; align-items: center;">
  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/PayPal_Logo_Icon_2014.svg" alt="PayPal Logo" width="35" height="35">
  <span style="font-size: 30px;"> PayPal 2</span>
</p>

## Installation

<details>
  <summary><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Npm-logo.svg/540px-Npm-logo.svg.png" alt="NPM Logo" width=22> Installing with npm</summary>

```bash
npm install paypal2
```

</details>

<details>
  <summary><img src="https://equk.co.uk/media/logos/pnpm.svg" alt="PNPM Logo" width=13> Installing with pnpm</summary>

```bash
pnpm add paypal2
```

</details>

<details>
  <summary><img src="https://seeklogo.com/images/Y/yarn-logo-F5E7A65FA2-seeklogo.com.png" alt="Yarn Logo" width=16> Installing with yarn</summary>

```bash
yarn add paypal2
```

</details>

## Example

```js
const paypal = require("paypal2");
const { Mode } = paypal.Constants;
const env = process.env;

paypal.initPaypal({
  clientId: env.PAYPAL_ID,
  clientSecret: env.PAYPAL_SECRET,
  mode: Mode.SANDBOX
}).then((client) => {
    const order = await client.orders.create({
      intent: paypal.Constants.Intent.CAPTURE,
      purchaseUnits: [
        {
          amount: {
            currencyCode: "USD",
            value: 10,
          },
        },
      ],
    });

    // Print order response in console
    console.log(order);
});
```
