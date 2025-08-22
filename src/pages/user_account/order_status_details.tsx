import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "../../hooks/hooks";
import Order from "../../models/order";
import {
  faCartShopping,
  faShoppingBag,
  faTruck,
  faTruckFast,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { useState } from "react";

const OrderStatusDetails: React.FC<{ order: Order }> = (props) => {
  const [orderStatus, setOrderStatus] = useState<number>(props.order.status);
  const themeState = useAppSelector((state) => {
    return state.theme;
  });

  const authState = useAppSelector((state) => {
    return state.auth;
  });

  const user = authState.user;

  const darkMode = themeState.darkMode;

  const updateOrderStatus = async (orderId: string, status: number) => {
    try {
      const url = `http://localhost:8080/orders/update-order-status/${orderId}`;

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authState.token}`,
        },
        body: JSON.stringify({ status }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message);
      }

      return responseData;
    } catch (error) {
      throw error;
    }
  };

  return (
    <div
      className={`py-4 ${
        darkMode ? "border-white" : "border-black"
      } rounded-xl border border-dashed w-full flex flex-col`}
    >
      <p className="font-mono tracking-wide ml-4"> Purchase Details</p>
      <div
        style={{
          height: "0.5px",
        }}
        className={`${darkMode ? "bg-white" : "bg-black"} w-full my-3`}
      ></div>
      <div className={`py-4 pl-4 w-full flex flex-col`}>
        <TimelineEvent
          status={orderStatus}
          order={props.order}
          value={0}
          icon={<FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>}
          event="Order Placed"
          date={props.order.createdAt}
        />
        <TimelineEvent
          status={orderStatus}
          order={props.order}
          value={1}
          icon={<FontAwesomeIcon icon={faWallet}></FontAwesomeIcon>}
          event="Payment Made"
          date={new Date(props.order.statusDetails.paymentMade.date)}
        />
        <TimelineEvent
          status={orderStatus}
          order={props.order}
          value={2}
          icon={<FontAwesomeIcon icon={faTruck}></FontAwesomeIcon>}
          event="Order Processed"
          date={new Date(props.order.statusDetails.processing.date)}
        />
        <TimelineEvent
          status={orderStatus}
          order={props.order}
          value={3}
          icon={<FontAwesomeIcon icon={faTruckFast}></FontAwesomeIcon>}
          event="Order Shipped"
          date={new Date(props.order.statusDetails.shipped.date)}
        />
        <TimelineEvent
          status={orderStatus}
          order={props.order}
          value={4}
          icon={<FontAwesomeIcon icon={faShoppingBag}></FontAwesomeIcon>}
          event="Order Delivered"
          date={new Date(props.order.statusDetails.delivered.date)}
        />
      </div>
      {user.status === "admin" && orderStatus !== 4 && orderStatus !== 0 && (
        <div className="flex flex-row items-center pl-4 pr-4 gap-x-4">
          <button
            onClick={() => {
              updateOrderStatus(props.order._id, orderStatus + 1)
                .then((data) => {
                  setOrderStatus(data.order.status);
                  toast.success(data.message);
                })
                .catch((e) => {
                  toast.error(e.message);
                });
            }}
            className={`shadow-sm px-5 py-2 rounded-md transition-all duration-500 ease-in-out hover:-translate-y-1 ${
              !darkMode
                ? "bg-gradient-to-r from-purple-800 to-violet-500 text-white shadow-black"
                : "bg-gradient-to-r from-violet-500 to-purple-700 text-black shadow-white"
            }`}
          >
            Update Status
          </button>
          <p className="font-mono font-light"> To </p>
          <div className="font-mono font-semibold flex justify-center">
            {orderStatus === 1 && (
              <p
                className={`border border-dashed ${
                  darkMode ? "border-white" : "border-black"
                } px-3 py-2 rounded-lg`}
              >
                Processed
              </p>
            )}
            {orderStatus === 2 && (
              <p
                className={`border border-dashed ${
                  darkMode ? "border-white" : "border-black"
                } px-3 py-2 rounded-lg`}
              >
                Shipped
              </p>
            )}
            {orderStatus === 3 && (
              <p
                className={`border border-dashed ${
                  darkMode ? "border-white" : "border-black"
                } px-3 py-2 rounded-lg`}
              >
                Delivered
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderStatusDetails;

const TimelineEvent: React.FC<{
  order: Order;
  value: number;
  icon: React.ReactNode;
  event: string;
  date: Date;
  status: number;
}> = ({ icon, event, date, value, order, status }) => {
  const themeState = useAppSelector((state) => {
    return state.theme;
  });

  const darkMode = themeState.darkMode;

  const theDate = new Date(date);
  const localDate = theDate.toLocaleString();

  return (
    <div
      className={`relative flex flex-row items-center gap-x-3 mb-6 w-full ${
        status >= value ? "text-purple-700 font-semibold" : "text-gray-500"
      }`}
    >
      {value !== 4 && (
        <div
          className={`h-10 w-1 absolute top-8 left-5 ${
            status >= value ? "bg-purple-700" : "bg-gray-500"
          }`}
        ></div>
      )}
      <div className={`flex flex-col justify-center  z-20`}>
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-full border ${
            status >= value
              ? "border-purple-700 font-semibold"
              : "border-gray-500"
          } ${darkMode ? "bg-black" : "bg-white"}`}
        >
          {icon}
        </div>
      </div>
      <div className="flex flex-col justify-center">
        <p className="font-mono tracking-wide">{event}</p>
        {status >= value && <p className="text-xs ">{localDate}</p>}
        {!(status >= value) && <p className="text-xs"> </p>}
      </div>
    </div>
  );
};
