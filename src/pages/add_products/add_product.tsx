import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import ThePulseLoader from "../../components/pulse-loader";
import NewBeautyProduct from "../../models/product";
import toast from "react-hot-toast";
import { addProduct } from "../../action_creators/admin_product_action";
import { useAppSelector } from "../../hooks/hooks";
import { useNavigate } from "react-router-dom";

const AddBeautyProduct = () => {
  const [images, setImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const navigate = useNavigate();

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const fileList = Array.from(event.currentTarget.files!);
    const selectedImages = fileList.map((file) => URL.createObjectURL(file));
    setImages(selectedImages);
    setImageFiles(fileList);
    setFieldValue("images", selectedImages);
  };

  type FormValues = {
    productName: string;
    brand: string;
    category: string;
    description: string;
    price: number | null;
    quantity: number | null;
    images: string[];
    skinType: string;
  };

  const initialValues = {
    productName: "",
    brand: "",
    category: "Skincare",
    description: "",
    price: null,
    quantity: null,
    images: images,
    skinType: "NORMAL SKIN", // Default value
  } as FormValues;

  const validationSchema = Yup.object().shape({
    productName: Yup.string().required("Product name is required"),
    brand: Yup.string().required("Brand is required"),
    category: Yup.string().required("Category is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number()
      .required("Price is required")
      .min(0, "Price must be greater than or equal to 0"),
    quantity: Yup.number()
      .required("Quantity is required")
      .min(0, "Quantity must be greater than or equal to 0"),
    images: Yup.array().min(1, "At least one image is required").nullable(),
    skinType: Yup.string().required("Skin type is required"), // Add validation for skinType
  });


  const authState = useAppSelector((state) => {
    return state.auth;
  });

  const token = authState.token;

  const handleSubmit = async (
    values: FormValues,
    { resetForm, setSubmitting }: FormikHelpers<any>
  ) => {
    await addProduct(
      new NewBeautyProduct(
        new Date().toISOString(),
        "Beauty Product",
        values.productName,
        values.brand,
        values.category,
        values.description,
        values.price!,
        values.quantity!,
        imageFiles,
        values.skinType // Include skinType in product creation
      ),
      token ?? ""
    )
      .then((data) => {
        toast.success(data.message);
        navigate(-1);
      })
      .catch((e) => {
        toast.error(e.message);
      });
    setSubmitting(false);
  };


  const themeState = useAppSelector((state) => {
    return state.theme;
  });
  const darkMode = themeState.darkMode;
  const primaryColor = themeState.primaryColor;
  const primaryTextColor = themeState.primaryTextColor;

  return (
    <div className="flex flex-col items-start w-full">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting, setFieldValue }) => (
          <Form className=" w-full md:w-2/3 lg:w-1/2">
            <div className="mb-5 flex flex-col items-start w-full">
              <label
                className="mb-2 font-semibold tracking-wider text-lg"
                htmlFor="productName"
              >
                Product Name
              </label>
              <Field
                placeholder="Enter product name"
                type="text"
                name="productName"
                className={` ${
                  darkMode
                    ? "bg-zinc-800 shadow-sm shadow-white"
                    : "bg-purple-50 shadow-black shadow-sm"
                } px-3 py-3 rounded-lg w-full`}
              />
              <ErrorMessage
                name="productName"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="mb-5 flex flex-col items-start w-full">
              <label
                className="mb-2 font-semibold tracking-wider text-lg"
                htmlFor="brand"
              >
                Brand
              </label>
              <Field
                placeholder="Enter brand"
                type="text"
                name="brand"
                className={` ${
                  darkMode
                    ? "bg-zinc-800 shadow-sm shadow-white"
                    : "bg-purple-50 shadow-black shadow-sm"
                } px-3 py-3 rounded-lg w-full`}
              />
              <ErrorMessage
                name="brand"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="mb-5 flex flex-col items-start w-full ">
              <label
                className="mb-2 font-semibold tracking-wider text-lg"
                htmlFor="category"
              >
                Category
              </label>
              <Field
                as="select"
                name="category"
                className={` ${
                  darkMode
                    ? "bg-zinc-800 shadow-sm shadow-white"
                    : "bg-purple-50 shadow-black shadow-sm"
                } px-3 py-3 rounded-lg w-full`}
              >
                <option value="Foundation">Foundation</option>
                <option value="Blush">Blush</option>
                <option value="Concealer">Concealer</option>
                <option value="Bronzer">Bronzer</option>
                <option value="Primer">Primer</option>
                <option value="Mascara">Mascara</option>
                <option value="Eyeliner">Eyeliner</option>
                <option value="Eyeshadow">Eyeshadow</option>
                <option value="Liquid Lipstick">Liquid Lipstick</option>
                <option value="Lip Liner">Lip Liner</option>
                <option value="Lip Balm">Lip Balm</option>
                <option value="Lipstick">Lipstick</option>
                <option value="Skincare">Skincare</option>
                <option value="Deodorant">Deodorant</option>
                <option value="Body Wash">Body Wash</option>
                <option value="Blending Sponge">Blending Sponge</option>
                <option value="Makeup Brush">Makeup Brush</option>
              </Field>
              <ErrorMessage
                name="category"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="mb-5 flex flex-col items-start w-full ">
              <label
                className="mb-2 font-semibold tracking-wider text-lg"
                htmlFor="skinType"
              >
                Skin Type
              </label>
              <Field
                as="select"
                name="skinType"
                className={`${darkMode
                    ? "bg-zinc-800 shadow-sm shadow-white"
                    : "bg-purple-50 shadow-black shadow-sm"
                  } px-3 py-3 rounded-lg w-full`}
              >
                <option value="NORMAL SKIN">Normal Skin</option>
                <option value="OILY SKIN">Oily Skin</option>
                <option value="DRY SKIN">Dry Skin</option>
              </Field>
              <ErrorMessage
                name="skinType"
                component="div"
                className="text-red-500"
              />
            </div>


            <div className="mb-5 flex flex-col items-start w-full">
              <label
                className="mb-2 font-semibold tracking-wider text-lg"
                htmlFor="description"
              >
                Description
              </label>
              <Field
                as="textarea"
                rows={5}
                placeholder="Enter description"
                type="text"
                name="description"
                className={` ${
                  darkMode
                    ? "bg-zinc-800 shadow-sm shadow-white"
                    : "bg-purple-50 shadow-black shadow-sm"
                } px-3 py-3 rounded-lg w-full`}
              />
              <ErrorMessage
                name="description"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="mb-5 flex flex-col items-start w-full">
              <label
                htmlFor="price"
                className="mb-2 font-semibold tracking-wider text-lg"
              >
                Price
              </label>
              <Field
                type="number"
                name="price"
                placeholder="Enter price"
                className={` ${
                  darkMode
                    ? "bg-zinc-800 shadow-sm shadow-white"
                    : "bg-purple-50 shadow-black shadow-sm"
                } px-3 py-3 rounded-lg w-full`}
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="mb-5 flex flex-col items-start w-full">
              <label
                htmlFor="quantity"
                className="mb-2 font-semibold tracking-wider text-lg"
              >
                Quantity
              </label>
              <Field
                type="number"
                name="quantity"
                placeholder="Enter quantity"
                className={` ${
                  darkMode
                    ? "bg-zinc-800 shadow-sm shadow-white"
                    : "bg-purple-50 shadow-black shadow-sm"
                } px-3 py-3 rounded-lg w-full`}
              />
              <ErrorMessage
                name="quantity"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="mb-5 flex flex-col items-start w-full">
              <label
                className="mb-2 font-semibold tracking-wider text-lg"
                htmlFor="images"
              >
                Images
              </label>
              <input
                id="images"
                name="images"
                type="file"
                onChange={(event) => handleImageChange(event, setFieldValue)}
                multiple // Allow multiple file selection
                accept="image/*"
                className={` ${
                  darkMode
                    ? "bg-zinc-800 shadow-sm shadow-white"
                    : "bg-purple-50 shadow-black shadow-sm"
                } px-3 py-3 rounded-lg w-full text-zinc-500`}
              />
              <ErrorMessage
                name="images"
                component="div"
                className="text-red-500"
              />
            </div>
            {/* Display selected images */}
            <div className="mt-4 flex flex-row flex-wrap gap-x-4 gap-y-4">
              {images.map((imageUrl, index) => (
                <a
                  key={index}
                  href={imageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`tag ${index + 1}`}
                    className="w-32 h-32 rounded object-cover border border-solid border-white"
                  />
                </a>
              ))}
            </div>
            <div className="flex flex-row justify-end">
              <button
                type="submit"
                className="bg-purple-600 text-white rounded mt-8 h-10 w-44"
              >
                {isSubmitting ? (
                  <ThePulseLoader color="white"></ThePulseLoader>
                ) : (
                  "Add Product"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddBeautyProduct;
