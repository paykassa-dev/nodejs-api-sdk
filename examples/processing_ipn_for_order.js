import dotenv from 'dotenv';

dotenv.config();

import { CheckPaymentRequest } from '../lib/dto.js';

import { MerchantApi } from '../lib/merchant.js';

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
