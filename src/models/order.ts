class Order {
  _id: string;
  userId: string;
  houseNumber: string;
  streetName: string;
  city: string;
  district: string;
  zone: string;
  contactNumber: string;
  paymentMethod: string;
  orderItems: any[]; // You might want to define a type/interface for order items
  totalPrice: number;
  totalItems: number;
  paid: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  status: number;
  statusDetails: {
    delivered: { value: boolean; date: Date };
    paymentMade: { value: boolean; date: Date };
    processing: { value: boolean; date: Date };
    shipped: { value: boolean; date: Date };
  };

  constructor({
    _id,
    userId,
    houseNumber,
    streetName,
    city,
    district,
    zone,
    contactNumber,
    paymentMethod,
    orderItems,
    totalPrice,
    totalItems,
    paid,
    createdAt,
    updatedAt,
    __v,
    status,
    statusDetails,
  }: {
    _id: string;
    userId: string;
    houseNumber: string;
    streetName: string;
    city: string;
    district: string;
    zone: string;
    contactNumber: string;
    paymentMethod: string;
    orderItems: any[];
    totalPrice: number;
    totalItems: number;
    paid: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    status: number;
    statusDetails: {
      delivered: { value: boolean; date: string };
      paymentMade: { value: boolean; date: string };
      processing: { value: boolean; date: string };
      shipped: { value: boolean; date: string };
    };
  }) {
    this._id = _id;
    this.userId = userId;
    this.houseNumber = houseNumber;
    this.streetName = streetName;
    this.city = city;
    this.district = district;
    this.zone = zone;
    this.contactNumber = contactNumber;
    this.paymentMethod = paymentMethod;
    this.orderItems = orderItems;
    this.totalPrice = totalPrice;
    this.totalItems = totalItems;
    this.paid = paid;
    this.createdAt = new Date(createdAt);
    this.updatedAt = new Date(updatedAt);
    this.__v = __v;
    this.status = status;
    this.statusDetails = {
      delivered: {
        value: statusDetails.delivered.value,
        date: new Date(statusDetails.delivered.date),
      },
      paymentMade: {
        value: statusDetails.paymentMade.value,
        date: new Date(statusDetails.paymentMade.date),
      },
      processing: {
        value: statusDetails.processing.value,
        date: new Date(statusDetails.processing.date),
      },
      shipped: {
        value: statusDetails.shipped.value,
        date: new Date(statusDetails.shipped.date),
      },
    };
  }
}

export default Order;
