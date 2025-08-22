import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import Rating from "@mui/material/Rating";
import { cartSliceActions } from "../../slices/cart-slice";
import toast from "react-hot-toast";
import { TheProductType } from "../admin_account/admin_product_item";
import "../../styles/animated_button.css";

const ProductDetailsSidebar: React.FC<{
  product: TheProductType;
  isOpen: boolean;
  toggleSidebar: () => void;
}> = (props) => {
  const images = props.product.images;

  const themeSlice = useAppSelector((state) => {
    return state.theme;
  });

  const primaryColor = themeSlice.primaryColor;
  const errorColor = themeSlice.errorColor;
  const errorTextColor = themeSlice.errorTextColor;
  const darkMode = themeSlice.darkMode;

  const authState = useAppSelector((state) => {
    return state.auth;
  });

  const user = authState.user;

  const dispatch = useAppDispatch();

  return (
    <div
      style={{
        scrollbarWidth: props.product.images.length > 1 ? "thin" : "none",
      }}
      className={` ${darkMode ? "bg-zinc-900" : "bg-slate-50"} ${
        props.isOpen ? "mx-5 my-5" : "my-5 mx-0"
      } fixed flex flex-row gap-x-5 z-50  w-full md:w-3/4 lg:w-4/6 top-0 bottom-0  right-0 transition-transform duration-1000 ${
        props.isOpen ? "translate-x-0" : "translate-x-full"
      } px-4 py-4 rounded-xl`}
    >
      <div
        style={{
          scrollbarWidth: "thin",
        }}
        className="flex flex-col overflow-y-scroll w-full gap-y-5"
      >
        {images.map((image) => {
          return (
            <img
              className="h-72 w-full rounded-xl border border-solid border-black object-cover"
              src={`http://localhost:8080/images/${image}`}
              alt="product"
            />
          );
        })}
      </div>
      <div className="flex flex-col w-full">
        <div className="flex flex-row justify-end">
          <div
            onClick={props.toggleSidebar}
            className={`cursor-pointer flex flex-row justify-center items-center h-10 w-10 rounded-full ${errorColor} ${errorTextColor}`}
          >
            <FontAwesomeIcon icon={faClose}></FontAwesomeIcon>
          </div>
        </div>
        <p className="text-2xl font-semibold mb-3 tracking-widest">
          {" "}
          {props.product.name}
        </p>
        <p className="text-gray-500 text-lg"> {props.product.brand} </p>
        <Rating
          className="my-3"
          name="simple-controlled"
          value={props.product.rating}
          readOnly
          size="small"
        />
        <p className="font-semibold text-xl tracking-wider my-5">
          {" "}
          Rs. {props.product.price}
        </p>
        <div
          onClick={() => {
            if (!user) {
              toast.error("Please login to add items to cart.");
              return;
            } else if (user.status === "admin") {
              toast.error("Action denied.");
              return;
            } else if (props.product.availableQuantity === 0) {
              toast.error(`${props.product.name} has been sold out.`);
              return;
            }
            dispatch(
              cartSliceActions.addItemToCart({
                item: {
                  productItem: {
                    id: props.product.id,
                    type: props.product.category,
                    image: props.product.images[0],
                    name: props.product.name,
                    price: props.product.price,
                  },
                  count: 1,
                  price: props.product.price,
                },
              })
            );
            toast.success("Item added to your cart.");
          }}
          className="relative w-full mt-7"
        >
          <button
            className={` w-full rounded-xl bg-gray-300 text-gray-300 px-5 py-3 font-semibold tracking-wider transition-all ease-in-out `}
          >
            Add to Cart
          </button>
          <button
            className={`text-white diagonal-translate w-full absolute rounded-xl button font-semibold tracking-wider  ${
              darkMode ? "bg-purple-500" : "bg-black"
            }  px-5 py-3 transition-all ease-in-out rounded-sm`}
          >
            {" "}
            <p className="button-content">Add to Cart</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSidebar;
