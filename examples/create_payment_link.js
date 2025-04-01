import dotenv from 'dotenv';

dotenv.config();

import { GetPaymentUrlRequest } from '../lib/dto.js';
import { Currency, System } from '../lib/struct.js';
import { MerchantApi } from '../lib/merchant.js';

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
