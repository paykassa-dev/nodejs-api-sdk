import dotenv from 'dotenv';

dotenv.config();

import { MakePaymentRequest } from '../lib/dto.js';
import { Currency, System, TransactionPriority } from '../lib/struct.js';
import { PaymentApi } from '../lib/payment.js';

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
