import NewBeautyProduct from "../models/product";

export const addProduct = async (product: NewBeautyProduct, token: string) => {
  console.log(product);
  console.log(token);
  const url = "http://localhost:8080/products/add-product";

  const formData = new FormData();

  formData.append("name", product.productName);
  formData.append("brand", product.brand);
  formData.append("category", product.category);
  formData.append("price", product.price.toString());
  formData.append("quantityAvailable", product.quantity.toString());
  formData.append("description", product.description);
  formData.append("rating", "1"); // Assuming rating is hardcoded for now
  formData.append("skinType", product.skinType); // Append skinType to formData

  // Append all images
  for (let i = 0; i < product.images.length; i++) {
    formData.append("images", product.images[i]);
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response.status);
    const jsonData = await response.json();
    console.log(jsonData);

    if (response.status === 201) {
      return jsonData;
    } else {
      throw new Error(jsonData.message);
    }
  } catch (e: any) {
    throw e;
  }
};


export const updateProduct = async (
  product: NewBeautyProduct,
  token: string
) => {
  const url = `http://localhost:8080/products/edit-product/${product.id}`;

  if (product.images.length === 0) {
    try {
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify({
          name: product.productName,
          brand: product.brand,
          category: product.category,
          price: product.price,
          quantityAvailable: product.quantity,
          images: product.images,
          description: product.description,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.status);
      const jsonData = await response.json();
      console.log(jsonData);

      if (response.status === 200) {
        return jsonData;
      } else {
        throw new Error(jsonData.message);
      }
    } catch (e: any) {
      throw new Error(e.message);
    }
  } else {
    console.log(product);
    console.log(token);

    const formData = new FormData();

    formData.append("name", product.productName);
    formData.append("brand", product.brand);
    formData.append("category", product.category);
    formData.append("price", product.price.toString());
    formData.append("quantityAvailable", product.quantity.toString());
    formData.append("description", product.description);
    for (let i = 0; i < product.images.length; i++) {
      formData.append("images", product.images[i]);
    }

    try {
      const response = await fetch(url, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.status);
      const jsonData = await response.json();
      console.log(jsonData);

      if (response.status === 200) {
        return jsonData;
      } else {
        throw new Error(jsonData.message);
      }
    } catch (e: any) {
      throw e;
    }
  }
};
