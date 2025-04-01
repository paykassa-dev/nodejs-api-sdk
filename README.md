# Paykassa SCI & API (node)

## Installation

```
npm i paykassa-api-sdk
```

**To run examples:**

```bash
cp ./.env.example ./.env
```

### Get a deposit address

```js
import dotenv from 'dotenv';

dotenv.config();

import { GenerateAddressRequest } from 'paykassa-api-sdk/lib/dto.js';
import { Currency, System } from 'paykassa-api-sdk/lib/struct.js';
import { MerchantApi } from 'paykassa-api-sdk/lib/merchant.js';

const testMode = false;

const merchantApi = new MerchantApi(
  process.env.MERCHANT_ID,
  process.env.MERCHANT_PASSWORD
).setTest(testMode);

const request = new GenerateAddressRequest()
  .setOrderId('1005000')
  .setSystem(System.TON)
  .setCurrency(Currency.USDT)
  .setComment('test comment');

merchantApi
  .generateAddress(request)
  .then((response) => {
    let ext = '';
    if (response.getIsTag()) {
      ext = ' ' + response.getTagName() + ': ' + response.getTag();
    }
    console.log('Invoice ID: ', response.getInvoiceId());
    console.log('Wallet: ', response.getWallet(), ext);

    if (testMode) {
      console.log('Test URL: ', response.getUrl());
    }
  })
  .catch((error) => {
    console.error('Error:', error.toString());
  });
```

**Example:**

```bash
node ./examples/create_address.js
```

### Check an IPN of a transaction

```js
import dotenv from 'dotenv';

dotenv.config();

import { CheckTransactionRequest } from 'paykassa-api-sdk/lib/dto.js';
import { MerchantApi } from 'paykassa-api-sdk/lib/merchant.js';

const testMode = false;

const merchantApi = new MerchantApi(
  process.env.MERCHANT_ID,
  process.env.MERCHANT_PASSWORD
).setTest(testMode);

const request = new CheckTransactionRequest().setPrivateHash(
  '607e40c901bd3df89464ea7394b0b46eb7a876c14c5bcc705da4d1703d5274c4'
);

merchantApi
  .checkTransaction(request)
  .then((response) => {
    console.log(response);
    console.log('Order ID in your system:', response.getOrderId());
    console.log('Transaction Number:', response.getTransaction());
    console.log('Txid:', response.getTxid());
    console.log('Amount:', response.getAmount());
    console.log('Fee:', response.getFee());
    console.log('System:', response.getSystem());
    console.log('Currency:', response.getCurrency());
    console.log('Address from:', response.getAddressFrom());
    console.log('Address:', response.getAddress());
    console.log('Tag:', response.getTag());
    console.log('Confirmations:', response.getConfirmations());
    console.log('Required confirmations:', response.getRequiredConfirmations());
    console.log('Status:', response.getStatus());

    // The applied amount may differ from the received amount if partial payment mode is enabled.
    // Default is 'no'.
    if (response.getStatus() === 'yes') {
      console.log(
        'You can credit this amount: ',
        response.getSystem(),
        response.getAmount(),
        response.getCurrency()
      );
      // your code...
    }

    //You should confirm that you’ve credited the funds to avoid repeated IPNs.
    console.log(response.getOrderId() + '|success');
  })
  .catch((error) => {
    console.error('Error:', error.toString());
  });
```

**Example:**

```bash
node ./examples/processing_ipn_for_transaction.js
```

### Get a payment link(create an order)

```js
import dotenv from 'dotenv';

dotenv.config();

import { GetPaymentUrlRequest } from 'paykassa-api-sdk/lib/dto.js';
import { Currency, System } from 'paykassa-api-sdk/lib/struct.js';
import { MerchantApi } from 'paykassa-api-sdk/lib/merchant.js';

const testMode = false;

const merchantApi = new MerchantApi(
  process.env.MERCHANT_ID,
  process.env.MERCHANT_PASSWORD
).setTest(testMode);

const request = new GetPaymentUrlRequest()
  .setOrderId('1005000')
  .setAmount('110')
  .setSystem(System.BITCOIN)
  .setCurrency(Currency.BTC)
  .setComment('test comment');

merchantApi
  .getPaymentUrl(request)
  .then((response) => {
    console.log('Url: ', response.getUrl());
  })
  .catch((error) => {
    console.error('Error:', error.toString());
  });
```

**Example:**

```bash
node ./examples/create_payment_link.js
```

### Check an IPN of an order

```js
import dotenv from 'dotenv';

dotenv.config();

import { CheckPaymentRequest } from 'paykassa-api-sdk/lib/dto.js';

import { MerchantApi } from 'paykassa-api-sdk/lib/merchant.js';

const testMode = false;

const merchantApi = new MerchantApi(
  process.env.MERCHANT_ID,
  process.env.MERCHANT_PASSWORD
).setTest(testMode);

const request = new CheckPaymentRequest().setPrivateHash(
  '72ea64dae378eeeebc9dc8f2d79c89ac2c0bd6f6e2c4ab7b3aa08655dd2e34e4'
);

merchantApi
  .checkPayment(request)
  .then((response) => {
    console.log('Order ID in your system:', response.getOrderId());
    console.log('Transaction Number:', response.getTransaction());
    console.log('Amount:', response.getAmount());
    console.log('System:', response.getSystem());
    console.log('Currency:', response.getCurrency());
    console.log('Wallet:', response.getAddress());
    console.log('Tag:', response.getTag());
    console.log('Partial?', response.isPartial() ? 'yes' : 'no');

    if (response.isPartial()) {
      console.log(
        'Verify the amount: ',
        response.getSystem(),
        response.getAmount(),
        response.getCurrency()
      );
    } else {
      console.log(
        'You can credit this amount: ',
        response.getSystem(),
        response.getAmount(),
        response.getCurrency()
      );
    }

    //You should confirm that you’ve credited the funds to avoid repeated IPNs.
    console.log(response.getOrderId() + '|success');
  })
  .catch((error) => {
    console.error('Error:', error.toString());
  });
```

**Example:**

```bash
node ./examples/processing_ipn_for_order.js
```

### Send money

```js
import dotenv from 'dotenv';

dotenv.config();

import { MakePaymentRequest } from 'paykassa-api-sdk/lib/dto.js';
import {
  Currency,
  System,
  TransactionPriority,
} from 'paykassa-api-sdk/lib/struct.js';
import { PaymentApi } from 'paykassa-api-sdk/lib/payment.js';

const testMode = true;

const paymentApi = new PaymentApi(
  process.env.API_ID,
  process.env.API_PASSWORD
).setTest(testMode);

const request = new MakePaymentRequest()
  .setShopId(process.env.MERCHANT_ID)
  .setAmount('0.05')
  .setSystem(System.TON)
  .setCurrency(Currency.TON)
  .setNumber('EQBkmfJlIjxZqB8xndrlDX05gGLKFPy84PKT4NRcmWy0PCaL')
  .setComment('test_transfer');

request.setTag('100501'); //Ripple, Stellar, TON
request.setPriority(TransactionPriority.MEDIUM); //Bitcoin, Litecoin, Dogecoin, Dash, BitcoinCash

paymentApi
  .makePayment(request)
  .then((response) => {
    console.log(
      'Status txid is not ready! Safe the invoice id %s to get the txid later',
      response.getSystem(),
      response.getAmountPay(),
      response.getCurrency(),
      response.getNumber(),
      response.getTxid()
    );

    if (response.getPaymentId() === response.getTxid()) {
      console.log(
        'Status txid is not ready! Safe the invoice id %s to get the txid later',
        response.getTransaction()
      );
    }

    console.log('Deducted amount is %s', response.getAmount());
    console.log('Address link is %s', response.getExplorerAddressLink());
    console.log(
      'Transaction link is %s',
      response.getExplorerTransactionLink()
    );
  })
  .catch((error) => {
    console.error('Error:', error.toString());
  });
```

**Example:**

```bash
node ./examples/send_money.js
```

### Get a merchant balance

```js
import dotenv from 'dotenv';

dotenv.config();

import { CheckBalanceRequest } from 'paykassa-api-sdk/lib/dto.js';
import { Currency, PsCurList, System } from 'paykassa-api-sdk/lib/struct.js';
import { PaymentApi } from 'paykassa-api-sdk/lib/payment.js';

const testMode = false;

const paymentApi = new PaymentApi(
  process.env.API_ID,
  process.env.API_PASSWORD
).setTest(testMode);

const request = new CheckBalanceRequest().setShopId(process.env.MERCHANT_ID);

paymentApi
  .checkBalance(request)
  .then((response) => {
    for (const v of PsCurList) {
      console.log('Balance', v, '=', response.getRawData()[v]);
    }
    console.log('');

    console.log(
      "Balance by constant value 'binancesmartchain_bep20_btc' = ",
      response.getBalance(System.BINANCESMARTCHAIN_BEP20, Currency.BTC)
    );
  })
  .catch((error) => {
    console.error('Error:', error.toString());
  });
```

**Example:**

```bash
node ./examples/get_merchant_balance.js
```

### Get a txid of a payment

```js
import dotenv from 'dotenv';

dotenv.config();

import { GetTxidsOfInvoicesRequest } from 'paykassa-api-sdk/lib/dto.js';

import { PaymentApi } from 'paykassa-api-sdk/lib/payment.js';

const testMode = false;

const paymentApi = new PaymentApi(
  process.env.API_ID,
  process.env.API_PASSWORD
).setTest(testMode);

const invoices = [
  '37433236',
  '32531999', //for test not found
  '37433238',
  '37433220',
  '37433196',
];

const request = new GetTxidsOfInvoicesRequest()
  .setShopId(process.env.MERCHANT_ID)
  .setInvoices(invoices);

paymentApi
  .getTxidsOfInvoices(request)
  .then((response) => {
    for (const i of invoices) {
      if (response.isReady(i)) {
        for (const tx of response.getRawData()[i]) {
          console.log('Invoice %s: %s', i, tx);
        }
      } else {
        console.log('Invoice is not found: %s', i);
      }
    }
  })
  .catch((error) => {
    console.error('Error:', error.toString());
  });
```

**Example:**

```bash
node ./examples/get_payment_txid.js
```

## References

- [Devs Documentation](https://paykassa.pro/en/developers)
- [API Documentation](https://paykassa.pro/docs/)

## Contributing

If during your work with this wrapper you encounter a bug or have a suggestion to help improve it for others, you are welcome to open a Github issue on this repository and it will be reviewed by one of our development team members. The Paykassa.pro bug bounty does not cover this wrapper.

## License

MIT - see LICENSE
