import React, { useEffect, useRef } from "react";
import CartItem from "../../components/cart-item";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { cartSliceActions } from "../../slices/cart-slice";

const CartPage = () => {
  const navigate = useNavigate();

  const authState = useAppSelector((state) => {
    return state.auth;
  });

  const user = authState.user;

  const cartState = useAppSelector((state) => {
    return state.cart;
  });
  let totalItems = cartState.totalItemCount;

  let totalPrice = cartState.totalPrice;

  let items = cartState.items;

  const scrollRef = useRef(0);

  const dispatch = useAppDispatch();

  useEffect(() => {
    document.title = "Account - My Cart";
    window.scrollTo(0, scrollRef.current);
  }, []);

  return (
    <div className="flex flex-col items-start justify-start px-10 md:px-36">
      {totalItems > 0 && (
        <p
          onClick={() => {
            dispatch(cartSliceActions.clearCart());
          }}
          className="fixed -right-10 top-1/3 text-white font-semibold hover:cursor-pointer bg-red-600 hover:bg-red-800 transition-all duration-300 px-5 py-3 rotate-90 tracking-widest rounded-b-xl"
        >
          {" "}
          Clear Cart{" "}
        </p>
      )}
      <p className="text-lg tracking-wider font-semibold text-zinc-500 mb-5">
        {" "}
        <span
          className="hover:text-purple-400 hover:cursor-pointer"
          onClick={() => {
            navigate("/home");
          }}
        >
          Home
        </span>{" "}
        / Cart
      </p>
      <div className="flex flex-col items-start justify-start w-full">
        {items.length === 0 && (
          <div className="flex flex-row justify-center w-full my-10 tracking-widest">
            <p> You have no items in your cart.</p>
          </div>
        )}
        {items.length !== 0 &&
          items.map((item) => {
            return <CartItem item={item}></CartItem>;
          })}
      </div>
      <div className="flex flex-row justify-between items-center mt-5 w-full">
        <p className="text-zinc-500"> Subtotal</p>
        <p className="font-semibold"> Rs. {totalPrice} </p>
      </div>
      <div className="flex flex-row justify-between items-center mt-5 mb-6 w-full">
        <p className="text-zinc-500"> Total</p>
        <p className="font-semibold"> Rs. {totalPrice} </p>
      </div>
      <div className="flex flex-col items-start md:flex-row md:justify-end md:items-center mt-5 w-full gap-x-4 gap-y-4">
        <div
          onClick={() => {
            navigate("/home");
          }}
          className="text-white font-semibold rounded-lg px-4 py-2 cursor-pointer hover:bg-pink-gradient transition-all ease-out duration-700 hover:scale-105"
          style={{
            backgroundImage: "linear-gradient(to right, #ff7eb9, #ff758c)",
          }}
        >
          Continue Shopping
        </div>

        <button
          disabled={items.length === 0}
          onClick={() => {
            navigate(`/${user._id}/check-out`);
          }}
          className={`${
            items.length === 0 ? "cursor-not-allowed" : "cursor-pointer"
          } text-white font-semibold rounded-lg px-4 py-2  hover:bg-purple-800 transition-all ease-out duration-700 hover:scale-105 `}
          style={{
            background: "linear-gradient(to right,  #9932CC, #9B30FF, #8A2BE2)",
          }}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
