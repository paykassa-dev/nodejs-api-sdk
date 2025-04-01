import {ApiException} from "./error.js";
import {CheckBalanceResponse, MakePaymentResponse} from "./dto.js";
import fetch from "node-fetch";

class PaymentApiBase {
  BASE_URL = "https://paykassa.app/api/"
  API_VERSION = 0.9

  /**
   * @param apiId {string}
   * @param apiKey {string}
   */
  constructor(apiId, apiKey) {
    this._apiId = apiId
    this._apiKey = apiKey
    this._test = false
  }

  /**
   * @param apiId {string}
   */
  setApiId(apiId) {
    this._apiId = apiId
    return this
  }

  /**
   * @param apiKey {string}
   */
  setApiKey(apiKey) {
    this._apiKey = apiKey
    return this
  }

  /**
   * @param test {boolean}
   */
  setTest(test) {
    this._test = test
    return this
  }

  /**
   * @protected
   * @return {string}
   */
  _getApiUrl() {
    return this.BASE_URL + this.API_VERSION + '/index.php'
  }

  /**
   * @protected
   */
  _setMethodData(endpoint, request) {
    request['func'] = endpoint
    request['api_id'] = this._apiId
    request['api_key'] = this._apiKey
    request['test'] = this._test
  }

  /**
   * @protected
   */
  async _makeRequest(endpoint, request) {
    this._setMethodData(endpoint, request)

    const response = await fetch(this._getApiUrl(), {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams(request)
    })

    const data = await response.json()

    if (data.error) {
      throw new ApiException(data.message)
    }

    return data;
  }
}

export class PaymentApi extends PaymentApiBase {
  /**
   * @param request {CheckBalanceRequest}
   * @return {Promise<CheckBalanceResponse>}
   */
  async checkBalance(request) {
    return new CheckBalanceResponse(await this._makeRequest('api_get_shop_balance', request.normalize()));
  }

  /**
   * @param request {MakePaymentRequest}
   * @return {Promise<MakePaymentResponse>}
   */
  async makePayment(request) {
    return new MakePaymentResponse(await this._makeRequest('api_payment', request.normalize()))
  }
}
