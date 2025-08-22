import CryptoJS from "crypto-js";

const createOrder = async (
  token,
  products,
  shippingDetails,
  amount,
  totalItems
) => {
  try {
    const url = "http://localhost:8080/orders/create-order";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        orderItems: products,
        totalPrice: amount,
        totalItems: totalItems,
        houseNumber: shippingDetails.houseNumber,
        streetName: shippingDetails.streetName,
        city: shippingDetails.city,
        district: shippingDetails.district,
        zone: shippingDetails.zone,
        contactNumber: shippingDetails.phoneNumber,
        paymentMethod: shippingDetails.selectedPm,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const jsonData = await response.json();

    console.log(" here is status code : ", response.status);

    console.log(jsonData);

    if (response.status === 201 || response.status === 200) {
      if (jsonData.order.paymentMethod !== "E-sewa") {
        console.log("pachadi");
        return jsonData;
      }
      console.log("yeta");

      const tid = jsonData.order._id;
      console.log(tid);
      console.log(tid);
      const signature = createSignature(
        `total_amount=${amount},transaction_uuid=${tid},product_code=EPAYTEST`
      );

      console.log(signature);
      console.log("here");

      const formData = {
        amount: `${jsonData.order.totalPrice}`,
        failure_url: "http://localhost:3000/home",
        product_delivery_charge: "0",
        product_service_charge: "0",
        product_code: "EPAYTEST",
        signature: signature,
        signed_field_names: "total_amount,transaction_uuid,product_code",
        success_url: "http://localhost:3000/order/payment-success",
        tax_amount: "0",
        total_amount: `${jsonData.order.totalPrice}`,
        transaction_uuid: tid,
      };

      var path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

      var form = document.createElement("form");
      form.setAttribute("method", "POST");
      form.setAttribute("action", path);

      for (var key in formData) {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", formData[key]);
        form.appendChild(hiddenField);
      }

      document.body.appendChild(form);
      form.submit();
    } else {
      console.log("error tira");
      const error = new Error(jsonData.message);
      throw error;
    }
  } catch (e) {
    throw e;
  }
};

export default createOrder;

export const makePayment = (orderId, amount) => {
  try {
    const tid = orderId;
    console.log(tid);
    console.log(tid);
    const signature = createSignature(
      `total_amount=${amount},transaction_uuid=${tid},product_code=EPAYTEST`
    );

    console.log(signature);
    console.log("here");

    const formData = {
      amount: `${amount}`,
      failure_url: "http://localhost:3000/home",
      product_delivery_charge: "0",
      product_service_charge: "0",
      product_code: "EPAYTEST",
      signature: signature,
      signed_field_names: "total_amount,transaction_uuid,product_code",
      success_url: "http://localhost:3000/order/payment-success",
      tax_amount: "0",
      total_amount: `${amount}`,
      transaction_uuid: tid,
    };

    var path = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for (var key in formData) {
      var hiddenField = document.createElement("input");
      hiddenField.setAttribute("type", "hidden");
      hiddenField.setAttribute("name", key);
      hiddenField.setAttribute("value", formData[key]);
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  } catch (e) {
    throw e;
  }
};

export const createSignature = (message) => {
  const secret = "8gBm/:&EnhH.1/q";

  // Convert secret to bytes
  const secretBytes = CryptoJS.enc.Utf8.parse(secret);

  // Generate SHA-256 HMAC
  const hmac = CryptoJS.HmacSHA256(message, secretBytes);

  // Convert HMAC to base64
  const hashInBase64 = CryptoJS.enc.Base64.stringify(hmac);

  return hashInBase64;
};
