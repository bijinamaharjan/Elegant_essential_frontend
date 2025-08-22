import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { CartItemType, cartSliceActions } from "../slices/cart-slice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { useNavigate } from "react-router-dom";

const CartItem: React.FC<{ item: CartItemType }> = (props) => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const themeState = useAppSelector((state) => {
    return state.theme;
  });

  const darkMode = themeState.darkMode;
  console.log(props.item);

  return (
    <div className="flex flex-row items-center justify-between w-full mb-5">
      <div
        onClick={() => {
          navigate(`/product-details/${props.item.productItem.id}`);
        }}
        className="flex flex-col items-start md:flex-row md:items-center gap-y-2 cursor-pointer"
      >
        <img
          className="h-20 w-20 rounded-md object-cover mr-4"
          src={`http://localhost:8080/images/${props.item.productItem.image}`}
          alt="paws-nepal"
        ></img>
        <div className="flex flex-col items-start justify-center text-sm tracking-wider gap-y-1">
          <p className="font-semibold"> {props.item.productItem.name} </p>
          <p className="text-zinc-500">
            {" "}
            {props.item.count}x ( Rs. {props.item.price} ){" "}
          </p>
        </div>
      </div>
      <div className="flex flex-row gap-x-10 items-center">
        <div className="flex flex-row items-center gap-x-4">
          <div
            onClick={() => {
              dispatch(
                cartSliceActions.removeItemFromCart({
                  item: {
                    productItem: props.item.productItem,
                    count: 1,
                    price: props.item.price,
                  },
                })
              );
            }}
            className={`${
              darkMode
                ? "bg-zinc-800 shadow-sm shadow-white"
                : "bg-zinc-300 shadow-sm shadow-black"
            } cursor-pointer bg h-8 w-8 rounded-lg text-center flex flex-row justify-center items-center`}
          >
            <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
          </div>
          <p className="font-semibold"> {props.item.count} </p>
          <div
            onClick={() => {
              dispatch(
                cartSliceActions.addItemToCart({
                  item: {
                    productItem: props.item.productItem,
                    count: 1,
                    price: props.item.price,
                  },
                })
              );
            }}
            className={`${
              darkMode
                ? "bg-zinc-800 shadow-sm shadow-white"
                : "bg-zinc-300 shadow-sm shadow-black"
            } cursor-pointer bg h-8 w-8 rounded-lg text-center flex flex-row justify-center items-center`}
          >
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
          </div>
        </div>
        <FontAwesomeIcon
          onClick={() => {
            dispatch(
              cartSliceActions.removeAllItemsFromcart({
                item: {
                  productItem: props.item.productItem,
                  count: props.item.count,
                  price: props.item.price,
                },
              })
            );
          }}
          className="hover:text-red-600 transition-all duration-150 ease-out cursor-pointer"
          icon={faTrash}
        />
      </div>
    </div>
  );
};

export default CartItem;
