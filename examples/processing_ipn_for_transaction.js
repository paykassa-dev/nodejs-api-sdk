import dotenv from 'dotenv';

dotenv.config();

import { CheckTransactionRequest } from '../lib/dto.js';
import { MerchantApi } from '../lib/merchant.js';

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
