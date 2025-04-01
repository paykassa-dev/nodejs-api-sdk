import dotenv from 'dotenv';

dotenv.config();

import { CheckBalanceRequest } from '../lib/dto.js';
import { Currency, PsCurList, System } from '../lib/struct.js';
import { PaymentApi } from '../lib/payment.js';

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
