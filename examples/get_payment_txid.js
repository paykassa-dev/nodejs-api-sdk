import dotenv from 'dotenv';

dotenv.config();

import { GetTxidsOfInvoicesRequest } from '../lib/dto.js';

import { PaymentApi } from '../lib/payment.js';

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
