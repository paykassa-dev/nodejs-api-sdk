# Paykassa SCI & API

## Installation

```
npm i paykassa-api-sdk
```

## Payment API

### Initialize Client

```js
import { PaymentApi } from 'paykassa-api-sdk/lib/payment.js';

const paymentApi = new PaymentApi(API_ID, API_KEY);
```

### Check Balance

```js
import { CheckBalanceRequest } from 'paykassa-api-sdk/lib/dto.js';
import { Currency, System } from 'paykassa-api-sdk/lib/struct.js';

const request = new CheckBalanceRequest().setShopId('12345');

paymentApi.checkBalance(request).then((response) => {
  console.log(response.getBalance(System.BITCOIN, Currency.BTC));
  console.log(response.getBalance(System.ETHEREUM, Currency.ETH));
});
```

### Make Payment

```js
import { MakePaymentRequest } from 'paykassa-api-sdk/lib/dto.js';
import {
  CommissionPayer,
  Currency,
  System,
  TransactionPriority,
} from 'paykassa-api-sdk/lib/struct.js';

const request = new MakePaymentRequest()
  .setShopId('12345')
  .setAmount('1.02')
  .setPriority(TransactionPriority.MEDIUM)
  .setSystem(System.BITCOIN)
  .setCurrency(Currency.BTC)
  .setPaidCommission(CommissionPayer.SHOP)
  .setNumber('3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy');

paymentApi.makePayment(request).then((response) => {
  console.log(response.getTransaction());
  console.log(response.getPaidCommission());
});
```

## Merchant API

### Initialize Client

```js
import { MerchantApi } from 'paykassa-api-sdk/lib/merchant.js';

const merchantApi = new MerchantApi(MERCHANT_ID, MERCHANT_KEY);
```

### Check Payment (IPN)

```js
import { CheckPaymentRequest } from 'paykassa-api-sdk/lib/dto.js';

const request = new CheckPaymentRequest().setPrivateHash('hash');

merchantApi.checkPayment(request).then((response) => {
  console.log(response.getAmount());
  console.log(response.getTransaction());
  console.log(response.getTag());
});
```

### Check Transaction (IPN)

```js
import { CheckTransactionRequest } from 'paykassa-api-sdk/lib/dto.js';

const request = new CheckTransactionRequest().setPrivateHash('hash');

merchantApi.checkTransaction(request).then((response) => {
  console.log(response.getAddressFrom());
  console.log(response.getConfirmations());
  console.log(response.getTag());
});
```

### Generate Address

```js
import { GenerateAddressRequest } from 'paykassa-api-sdk/lib/dto.js';
import {
  CommissionPayer,
  Currency,
  System,
} from 'paykassa-api-sdk/lib/struct.js';

const request = new GenerateAddressRequest()
  .setOrderId('123456789')
  .setAmount('1.123456')
  .setCurrency(Currency.DOGE)
  .setSystem(System.DOGECOIN)
  .setPaidCommission(CommissionPayer.CLIENT)
  .setComment('test');

merchantApi.generateAddress(request).then((response) => {
  console.log(response.getOrderId());
  console.log(response.getWallet());
  console.log(response.getTag());
});
```

### Get Payment Url

```js
import { GetPaymentUrlRequest } from 'paykassa-api-sdk/lib/dto.js';
import {
  CommissionPayer,
  Currency,
  System,
} from 'paykassa-api-sdk/lib/struct.js';

const request = new GetPaymentUrlRequest()
  .setSystem(System.TRON_TRC20)
  .setCurrency(Currency.USDT)
  .setPaidCommission(CommissionPayer.CLIENT)
  .setAmount('110')
  .setComment('test');

merchantApi.getPaymentUrl(request).then((response) => {
  console.log(response.getUrl());
  console.log(response.getMethod());
  console.log(response.getParams());
});
```

## References

- [Devs Documentation](https://paykassa.pro/en/developers)
- [API Documentation](https://paykassa.pro/docs/)
