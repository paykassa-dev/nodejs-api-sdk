import dotenv from 'dotenv';

dotenv.config();

import { GenerateAddressRequest } from '../lib/dto.js';
import { Currency, System } from '../lib/struct.js';
import { MerchantApi } from '../lib/merchant.js';

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
