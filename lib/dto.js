import { Currency, System, TransactionPriority } from './struct.js';

class Response {
  constructor(data) {
    this._data = data['data'];
  }
}

class Request {
  normalize() {}
}

export class CheckPaymentResponse extends Response {
  getTransaction() {
    return this._data['transaction'];
  }

  getShopId() {
    return this._data['shop_id'];
  }

  getOrderId() {
    return this._data['order_id'];
  }

  getAmount() {
    return this._data['amount'];
  }

  getCurrency() {
    return this._data['currency'];
  }

  getSystem() {
    return this._data['system'];
  }

  getAddress() {
    return this._data['address'];
  }

  getTag() {
    return this._data['tag'];
  }

  getHash() {
    return this._data['hash'];
  }

  isPartial() {
    return this._data['partial'] === 'yes';
  }
}

export class CheckPaymentRequest extends Request {
  constructor() {
    super();

    this._privateHash = '';

    return this;
  }

  setPrivateHash(privateHash) {
    this._privateHash = privateHash;
    return this;
  }

  normalize() {
    return {
      private_hash: this._privateHash,
    };
  }
}

export class CheckTransactionRequest extends Request {
  constructor() {
    super();

    this._privateHash = '';
  }

  setPrivateHash(privateHash) {
    this._privateHash = privateHash;

    return this;
  }

  normalize() {
    return {
      private_hash: this._privateHash,
    };
  }
}

export class CheckTransactionResponse extends Response {
  getTransaction() {
    return this._data['transaction'];
  }

  getTxid() {
    return this._data['txid'];
  }

  getShopId() {
    return this._data['shop_id'];
  }

  getOrderId() {
    return this._data['order_id'];
  }

  getAmount() {
    return this._data['amount'];
  }

  getFee() {
    return this._data['fee'];
  }

  getCurrency() {
    return this._data['currency'];
  }

  getSystem() {
    return this._data['system'];
  }

  getAddressFrom() {
    return this._data['address_from'];
  }

  getAddress() {
    return this._data['address'];
  }

  getTag() {
    return this._data['tag'];
  }

  getConfirmations() {
    return this._data['confirmations'];
  }

  getRequiredConfirmations() {
    return this._data['required_confirmations'];
  }

  getStatus() {
    return this._data['status'];
  }

  getDateUpdate() {
    return this._data['date_update'];
  }

  getExplorerAddressLink() {
    return this._data['explorer_address_link'];
  }

  getExplorerTransactionLink() {
    return this._data['explorer_transaction_link'];
  }
}

export class GenerateAddressRequest extends Request {
  constructor() {
    super();

    this._orderId = '';
    this._amount = '1.0';
    this._currency = Currency.BTC;
    this._system = System.BITCOIN;
    this._comment = '';
  }

  setOrderId(orderId) {
    this._orderId = orderId;

    return this;
  }

  setCurrency(currency) {
    this._currency = currency;

    return this;
  }

  setSystem(system) {
    this._system = system;

    return this;
  }

  setComment(comment) {
    this._comment = comment;

    return this;
  }

  normalize() {
    return {
      order_id: this._orderId,
      amount: this._amount,
      currency: this._currency,
      system: this._system,
      comment: this._comment,
      phone: false,
    };
  }
}

export class GenerateAddressResponse extends Response {
  getInvoiceId() {
    return this._data['invoice_id'];
  }

  getStatus() {
    return this._data['status'];
  }

  getOrderId() {
    return this._data['order_id'];
  }

  getWallet() {
    return this._data['wallet'];
  }

  getAmount() {
    return this._data['amount'];
  }

  getSystem() {
    return this._data['system'];
  }

  getCurrency() {
    return this._data['currency'];
  }

  getUrl() {
    return this._data['url'];
  }

  getTag() {
    return this._data['tag'];
  }

  getTagName() {
    return this._data['tag_name'];
  }

  getIsTag() {
    return this._data['is_tag'];
  }
}

export class GetPaymentUrlRequest extends Request {
  constructor() {
    super();

    this._orderId = '';
    this._amount = '1.0';
    this._currency = Currency.BTC;
    this._system = System.BITCOIN;
    this._comment = '';
  }

  setOrderId(orderId) {
    this._orderId = orderId;

    return this;
  }

  setAmount(amount) {
    this._amount = amount;

    return this;
  }

  setCurrency(currency) {
    this._currency = currency;

    return this;
  }

  setSystem(system) {
    this._system = system;

    return this;
  }

  setComment(comment) {
    this._comment = comment;

    return this;
  }

  normalize() {
    return {
      order_id: this._orderId,
      amount: this._amount,
      currency: this._currency,
      system: this._system,
      comment: this._comment,
      phone: false,
    };
  }
}

export class GetPaymentUrlResponse extends Response {
  getUrl() {
    return this._data['url'];
  }

  getMethod() {
    return this._data['method'];
  }

  getParams() {
    return this._data['params'];
  }
}

export class CheckBalanceRequest extends Request {
  constructor() {
    super();
    this._shopId = '';
  }

  setShopId(shopId) {
    this._shopId = shopId;
    return this;
  }

  normalize() {
    return {
      shop_id: this._shopId,
    };
  }
}

export class CheckBalanceResponse extends Response {
  constructor(data) {
    super(data);
  }

  getBalance(systemId, currency) {
    const system = Object.keys(System).find((key) => System[key] === systemId);
    const pair = CheckBalanceResponse._getSystemCurrencyPair(currency, system);
    if (!(pair in this._data)) {
      throw new Error(
        "Can't get a balance by system " + system + ' and currency ' + currency
      );
    } else {
      return this._data[pair];
    }
  }

  getRawData() {
    return this._data;
  }

  static _getSystemCurrencyPair(currency, system) {
    return system.toLowerCase() + '_' + currency.toLowerCase();
  }
}

export class MakePaymentRequest extends Request {
  constructor() {
    super();
    this._priority = TransactionPriority.MEDIUM;
    this._tag = '0';
    this._number = '';
    this._comment = '';
    this._system = System.BITCOIN;
    this._currency = Currency.BTC;
    this._shopId = '';
    this._amount = '0.0';
  }

  setShopId(shopId) {
    this._shopId = shopId;
    return this;
  }

  setAmount(amount) {
    this._amount = amount;
    return this;
  }

  setCurrency(currency) {
    this._currency = currency;
    return this;
  }

  setSystem(system) {
    this._system = system;
    return this;
  }

  setNumber(number) {
    this._number = number;
    return this;
  }

  setTag(tag) {
    this._tag = tag;
    return this;
  }

  setPriority(priority) {
    this._priority = priority;
    return this;
  }

  setComment(comment) {
    this._comment = comment;
    return this;
  }

  normalize() {
    return {
      priority: this._priority,
      tag: this._tag,
      number: this._number,
      comment: this._comment,
      system: this._system,
      currency: this._currency,
      shop_id: this._shopId,
      amount: this._amount,
    };
  }
}

export class MakePaymentResponse extends Response {
  getShopId() {
    return this._data['shop_id'];
  }

  getPaymentId() {
    return this._data['payment_id'];
  }

  getTransaction() {
    return this._data['transaction'];
  }

  getExplorerTransactionLink() {
    return this._data['explorer_transaction_link'];
  }

  getExplorerAddressLink() {
    return this._data['explorer_address_link'];
  }

  getTxid() {
    return this._data['txid'];
  }

  getAmount() {
    return this._data['amount'];
  }

  getAmountPay() {
    return this._data['amount_pay'];
  }

  getSystem() {
    return this._data['system'];
  }

  getCurrency() {
    return this._data['currency'];
  }

  getNumber() {
    return this._data['number'];
  }

  getShopCommissionPercent() {
    return this._data['shop_commission_percent'];
  }

  getShopCommissionAmount() {
    return this._data['shop_commission_amount'];
  }

  getPaidCommission() {
    return this._data['paid_commission'];
  }
}

export class GetTxidsOfInvoicesRequest extends Request {
  constructor() {
    super();
    this._shopId = '';
    this._invoices = [];
  }

  setShopId(shopId) {
    this._shopId = shopId;
    return this;
  }

  setInvoices(invoices) {
    this._invoices = invoices;
    return this;
  }

  normalize() {
    return {
      shop_id: this._shopId,
      indirect_invoices_list: this._invoices,
    };
  }
}

export class GetTxidsOfInvoicesResponse extends Response {
  constructor(data) {
    super(data);
  }

  isReady(invoice) {
    return invoice in this._data;
  }

  getRawData() {
    return this._data;
  }
}
