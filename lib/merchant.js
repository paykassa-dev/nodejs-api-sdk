import { ApiException } from './error.js';
import {
  CheckPaymentResponse,
  CheckTransactionResponse,
  GenerateAddressResponse,
  GetPaymentUrlResponse,
} from './dto.js';
import fetch from 'node-fetch';

class MerchantApiBase {
  BASE_URL = 'https://paykassa.app/sci/';
  API_VERSION = 0.4;

  /**
   * @param sciId {string}
   * @param sciKey {string}
   */
  constructor(sciId, sciKey) {
    this._sciId = sciId;
    this._sciKey = sciKey;
    this._test = false;
  }

  /**
   * @param sciId {string}
   */
  setSciId(sciId) {
    this._sciId = sciId;

    return this;
  }

  /**
   * @param sciKey {string}
   */
  setSciKey(sciKey) {
    this._sciKey = sciKey;
  }

  /**
   * @param test {boolean}
   */
  setTest(test) {
    this._test = test;
    return this;
  }

  /**
   * @protected
   */
  _getApiUrl() {
    return this.BASE_URL + this.API_VERSION + '/index.php';
  }

  /**
   * @protected
   */
  _setMethodData(endpoint, request) {
    request['func'] = endpoint;
    request['sci_id'] = this._sciId;
    request['sci_key'] = this._sciKey;
    request['test'] = this._test;
  }

  /**
   * @protected
   */
  async _makeRequest(endpoint, request) {
    this._setMethodData(endpoint, request);

    const response = await fetch(this._getApiUrl(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(request),
    });

    const data = await response.json();

    if (data.error) {
      throw new ApiException(data.message);
    }

    return data;
  }
}

export class MerchantApi extends MerchantApiBase {
  /**
   *
   * @param request {CheckPaymentRequest}
   * @return {Promise<CheckPaymentResponse>}
   */
  async checkPayment(request) {
    return new CheckPaymentResponse(
      await this._makeRequest('sci_confirm_order', request.normalize())
    );
  }

  /**
   *
   * @param request {CheckTransactionRequest}
   * @return {Promise<CheckTransactionResponse>}
   */
  async checkTransaction(request) {
    return new CheckTransactionResponse(
      await this._makeRequest(
        'sci_confirm_transaction_notification',
        request.normalize()
      )
    );
  }

  /**
   *
   * @param request {GenerateAddressRequest}
   * @return {Promise<GenerateAddressResponse>}
   */
  async generateAddress(request) {
    return new GenerateAddressResponse(
      await this._makeRequest('sci_create_order_get_data', request.normalize())
    );
  }

  /**
   *
   * @param request {GetPaymentUrlRequest}
   * @return {Promise<GetPaymentUrlResponse>}
   */
  async getPaymentUrl(request) {
    return new GetPaymentUrlResponse(
      await this._makeRequest('sci_create_order', request.normalize())
    );
  }
}
