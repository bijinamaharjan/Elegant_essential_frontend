import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ThePulseLoader from "../../components/pulse-loader";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faDotCircle } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { cartSliceActions } from "../../slices/cart-slice";
import createOrder from "../../action_creators/order_action";
import { useNavigate } from "react-router-dom";

const CheckOut: React.FC = () => {
  const [selectedPm, setSelectedPm] = useState("Cash on Delivery");

  const paymentMethods = ["Cash on Delivery", "E-sewa"];

  const scrollRef = useRef(0);

  const themeState = useAppSelector((state) => {
    return state.theme;
  });
  const darkMode = themeState.darkMode;
  // const primaryColor = themeState.primaryColor;

  const cartState = useAppSelector((state) => {
    return state.cart;
  });
  let totalItems = cartState.totalItemCount;

  let totalPrice = cartState.totalPrice;

  let items = cartState.items;

  const authState = useAppSelector((state) => {
    return state.auth;
  });

  const token = authState.token;

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Account - Checkout";
    window.scrollTo(0, scrollRef.current);
  }, []);

  return (
    <div className="flex flex-col items-start px-10 md:px-36 w-full">
      <Formik
        initialValues={{
          houseNumber: "",
          streetName: "",
          city: "",
          district: "",
          zone: "",
          phoneNumber: "",
        }}
        validationSchema={Yup.object().shape({
          houseNumber: Yup.string().required("House Number is required"),
          streetName: Yup.string().required("Street Name is required"),
          city: Yup.string().required("City is required"),
          district: Yup.string().required("District is required"),
          zone: Yup.string().required("Zone is required"),
          phoneNumber: Yup.string()
            .required("Phone Number is required")
            .matches(/^\d{10}$/, "Phone Number must be 10 digits"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          if (totalItems === 0) {
            setSubmitting(false);
            return;
          }
          createOrder(
            token!,
            items,
            { ...values, selectedPm },
            totalPrice,
            totalItems,
            
          )
            .then((data: any) => {
              toast.success("Order created successfully.");
              if (selectedPm !== "E-sewa") {
                navigate('/accounts/user/orders');
              }
              dispatch(cartSliceActions.clearCart());
            })
            .catch((e: any) => {
              toast.error(e.message);
            })
            .finally(() => {
              setSubmitting(false);
            });
        }}
      >
        {({ isSubmitting }) => (
          <Form className="w-full md:w-2/3 lg:w-1/2">
            <div className="flex flex-col items-start w-full">
              <p className="font-bold text-xl tracking-wider mt-6 mb-5">
                {" "}
                Secure CheckOut
              </p>
              <p className="font-semibold text-lg tracking-wider mt-6 mb-5">
                {" "}
                Shipping Details
              </p>
              <div className="flex flex-row items-start justify-between gap-x-5 w-full">
                <div className="flex flex-col justify-between items-start gap-y-1 w-full tracking-wider my-2">
                  <label htmlFor="houseNumber" className="text-zinc-500">
                    House Number
                  </label>
                  <Field
                    placeholder="eg. AH-192"
                    type="text"
                    id="houseNumber"
                    name="houseNumber"
                    className={`${darkMode ? "bg-zinc-900" : "bg-white"} ${
                      darkMode ? "border border-solid border-gray" : ""
                    } shadow-sm shadow-black rounded-md px-3 py-2  w-full`}
                  />
                  <ErrorMessage
                    name="houseNumber"
                    component="div"
                    className="text-purple-500"
                  />
                </div>

                <div className="flex flex-col justify-between items-start gap-y-1 w-full tracking-wider my-2">
                  <label htmlFor="streetName" className="text-zinc-500">
                    Street Name
                  </label>
                  <Field
                    placeholder="eg. Dhobidhara"
                    type="text"
                    id="streetName"
                    name="streetName"
                    className={`${darkMode ? "bg-zinc-900" : "bg-white"} ${
                      darkMode ? "border border-solid border-gray" : ""
                    } shadow-sm shadow-black rounded-md px-3 py-2  w-full`}
                  />
                  <ErrorMessage
                    name="streetName"
                    component="div"
                    className="text-purple-500"
                  />
                </div>
              </div>
              <div className="flex flex-row items-start justify-between gap-x-5 w-full">
                <div className="flex flex-col justify-between items-start gap-y-1 w-full tracking-wider my-2">
                  <label htmlFor="city" className="text-zinc-500">
                    City
                  </label>
                  <Field
                    placeholder="eg. Kamalpokhari"
                    type="text"
                    id="city"
                    name="city"
                    className={`${darkMode ? "bg-zinc-900" : "bg-white"} ${
                      darkMode ? "border border-solid border-gray" : ""
                    } shadow-sm shadow-black rounded-md px-3 py-2  w-full`}
                  />
                  <ErrorMessage
                    name="city"
                    component="div"
                    className="text-purple-500"
                  />
                </div>

                <div className="flex flex-col justify-between items-start gap-y-1 w-full tracking-wider my-2">
                  <label htmlFor="district" className="text-zinc-500">
                    District
                  </label>
                  <Field
                    placeholder="eg. Kathmandu"
                    type="text"
                    id="district"
                    name="district"
                    className={`${darkMode ? "bg-zinc-900" : "bg-white"} ${
                      darkMode ? "border border-solid border-gray" : ""
                    } shadow-sm shadow-black rounded-md px-3 py-2  w-full`}
                  />
                  <ErrorMessage
                    name="district"
                    component="div"
                    className="text-purple-500"
                  />
                </div>
              </div>
              <div className="flex flex-row items-start justify-between gap-x-5 w-full">
                <div className="flex flex-col justify-between items-start gap-y-1 w-full tracking-wider my-2">
                  <label htmlFor="zone" className="text-zinc-500">
                    Zone
                  </label>
                  <Field
                    placeholder="eg. Bagmati"
                    type="text"
                    id="zone"
                    name="zone"
                    className={`${darkMode ? "bg-zinc-900" : "bg-white"} ${
                      darkMode ? "border border-solid border-gray" : ""
                    } shadow-sm shadow-black rounded-md px-3 py-2  w-full`}
                  />
                  <ErrorMessage
                    name="zone"
                    component="div"
                    className="text-purple-500"
                  />
                </div>

                <div className="flex flex-col justify-between items-start gap-y-1 w-full tracking-wider my-2">
                  <label htmlFor="phoneNumber" className="text-zinc-500">
                    Contact Number
                  </label>
                  <Field
                    placeholder="eg. 980#######"
                    type="number"
                    id="phoneNumber"
                    name="phoneNumber"
                    pattern="[0-9]{10}"
                    className={`${darkMode ? "bg-zinc-900" : "bg-white"} ${
                      darkMode ? "border border-solid border-gray" : ""
                    } shadow-sm shadow-black rounded-md px-3 py-2  w-full`}
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="text-purple-500"
                  />
                </div>
              </div>
            </div>

            <p className="font-semibold text-lg tracking-wider mt-8 mb-5">
              {" "}
              Payment Method
            </p>

            {paymentMethods.map((pm) => {
              return (
                <div
                  onClick={() => {
                    setSelectedPm(pm);
                  }}
                  className={` ${
                    selectedPm === pm ? "shadow-sm shadow-white" : ""
                  } flex flex-row items-center justify-between w-full  px-3 py-3 rounded-lg border border-solid border-zinc-700 mb-4 cursor-pointer`}
                >
                  <div className="flex flex-row items-center gap-x-4">
                    {selectedPm === pm && (
                      <FontAwesomeIcon
                        className="text-xl text-purple-800"
                        icon={faDotCircle}
                      ></FontAwesomeIcon>
                    )}
                    {selectedPm !== pm && (
                      <FontAwesomeIcon
                        className="text-xl text-zinc-700"
                        icon={faCircle}
                      ></FontAwesomeIcon>
                    )}
                    <p> {pm} </p>
                  </div>
                </div>
              );
            })}

            {/* order summary */}
            <p className="font-semibold text-lg tracking-wider mt-8 mb-5">
              {" "}
              Order Summary
            </p>
            <div className="flex flex-row items-center justify-between w-full mb-3">
              <p className="text-zinc-500"> Total Items</p>
              <p> {totalItems} items </p>
            </div>
            <div className="flex flex-row items-center justify-between w-full mb-3">
              <p className="text-zinc-500"> Subtotal</p>
              <p> Rs. {totalPrice} </p>
            </div>
            <div className="flex flex-row items-center justify-between w-full mb-3">
              <p className="text-zinc-500"> Shipping</p>
              <p> Rs. 0 </p>
            </div>
            <div className="flex flex-row items-center justify-between w-full mb-3">
              <p className="text-zinc-500"> Total</p>
              <p> Rs. {totalPrice} </p>
            </div>

            <div className="flex flex-row justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="h-10 w-44 tracking-wider bg-purple-500 hover:bg-purple-700 text-white font-semibold rounded mt-4 transition-all duration-700 ease-in"
              >
                {isSubmitting ? (
                  <ThePulseLoader color="white"></ThePulseLoader>
                ) : (
                  "Place Order"
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CheckOut;
