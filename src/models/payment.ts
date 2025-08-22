class Payment {
    _id: string;
    userId: string;
    createdAt: Date;
    productCode: string;
    signature: string;
    signedFieldNames: string;
    status: string;
    totalAmount: number;
    transactionCode: string;
    transactionUUID: string;
    updatedAt: Date;
    __v: number;
  
    constructor({
      _id,
      userId,
      createdAt,
      productCode,
      signature,
      signedFieldNames,
      status,
      totalAmount,
      transactionCode,
      transactionUUID,
      updatedAt,
      __v,
    }: {
      _id: string;
      userId: string;
      createdAt: Date;
      productCode: string;
      signature: string;
      signedFieldNames: string;
      status: string;
      totalAmount: number;
      transactionCode: string;
      transactionUUID: string;
      updatedAt: Date;
      __v: number;
    }) {
      this._id = _id;
      this.userId = userId;
      this.createdAt = createdAt;
      this.productCode = productCode;
      this.signature = signature;
      this.signedFieldNames = signedFieldNames;
      this.status = status;
      this.totalAmount = totalAmount;
      this.transactionCode = transactionCode;
      this.transactionUUID = transactionUUID;
      this.updatedAt = updatedAt;
      this.__v = __v;
    }
  }
  
  export default Payment;
  