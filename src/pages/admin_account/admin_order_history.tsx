import { useEffect, useRef, useState } from "react";
import ThePulseLoader from "../../components/pulse-loader";
import { useAuthorizedFutureBuilder } from "../../hooks/future_builder_hook";
import { useAppSelector } from "../../hooks/hooks";
import Order from "../../models/order";
import LoadError from "../home/load-error";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "../../styles/home.css";

import "react-datepicker/dist/react-datepicker.css";

export type OrderType = {};

const AdminOrderHistory: React.FC = () => {
  const themeState = useAppSelector((state) => {
    return state.theme;
  });

  const darkMode = themeState.darkMode;
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const authState = useAppSelector((state) => {
    return state.auth;
  });
  const { isLoading, error, data } = useAuthorizedFutureBuilder(
    `http://localhost:8080/orders/order-history?filterBy=dsc&page=${currentPage}&date=${selectedDate}`,
    authState.token!
  );

  const totalItems = data ? data.totalItems : 0;

  const scrollRef = useRef(0);

  useEffect(() => {
    setCurrentPage(1);

    window.scrollTo(0, scrollRef.current);
  }, [selectedDate]);

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-col w-full items-start mb-3">
        <p className="tracking-wider font-semibold mb-5"> My Orders </p>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="MMMM d, yyyy"
          placeholderText="Select date"
          className={`shadow-sm border border-solid text-center ${
            darkMode
              ? "text-white bg-zinc-800 shadow-slate-200 border-slate-300"
              : "text-black bg-purple-50 shadow-black border-black"
          } px-3 py-2`}
        />
      </div>
      {isLoading && (
        <div className="h-52 w-full flex flex-row items-center justify-center">
          <ThePulseLoader color="purple"></ThePulseLoader>
        </div>
      )}
      {error && <LoadError message={error.message}></LoadError>}
      {data && !error && (
        <div className="w-full flex flex-col gap-y-4">
          {" "}
          {data.orders.map((order: any) => {
            return (
              <OrderItem key={order._id} order={new Order(order)}></OrderItem>
            );
          })}{" "}
        </div>
      )}
      <ReactPaginate
        key={selectedDate?.toISOString()}
        pageCount={Math.ceil(totalItems / 6)}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={(selectedItem) => {
          setCurrentPage(selectedItem.selected + 1);
          window.scrollTo(0, scrollRef.current);
        }}
        containerClassName={darkMode ? "pagination-darkmode" : "pagination"}
        activeClassName={"active"}
        previousLabel={<FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>}
        nextLabel={<FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>}
        breakLabel={"..."}
        disabledClassName={"disabled"}
        pageClassName={""}
        pageLinkClassName={""}
        previousClassName={"previous"}
        nextClassName={"next"}
        previousLinkClassName={""}
        nextLinkClassName={""}
        breakClassName={"ellipsis"}
      />
    </div>
  );
};

export default AdminOrderHistory;

const OrderItem: React.FC<{ order: Order }> = (props) => {
  
  const navigate = useNavigate();
  const themeState = useAppSelector((state) => {
    return state.theme;
  });
  const darkMode = themeState.darkMode;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              "header-data-active",
              "header-image-3-active"
            );
          } else {
          }
        });
      },
      { threshold: 0.8, root: null }
    );
    const hiddenElements = document.querySelectorAll(
      ".header-data, .header-image-3"
    );
    hiddenElements.forEach((el) => observer.observe(el));
  }, []);

  return (
    <div
      onClick={() => {
        navigate(`/orders/${props.order._id}`);
      }}
      className={`header-image-3 relative overflow-hidden w-full flex flex-row justify-between border border-solid rounded-md px-4 py-3 hover:cursor-pointer hover:scale-105 transition-all ease-out duration-500 ${
        darkMode
          ? "border-white bg-zinc-900 shadow-sm shadow-slate-600"
          : "border-black bg-slate-50 shadow-sm shadow-black"
      }`}
    >
      <div
        className={`transition-all ease-in-out duration-500 absolute h-36 w-36 rounded-full -top-6 -left-12 -z-50 ${
          darkMode ? "bg-purple-600" : "bg-purple-300"
        }`}
      ></div>
      <div
        className={`transition-all ease-in-out duration-500 absolute h-36 w-36 rounded-full top-6 right-1/2 -z-50 ${
          darkMode ? "bg-purple-600" : "bg-purple-300"
        }`}
      ></div>
      <div className="flex flex-col gap-y-2 items-start">
        <p className="text-lg tracking-wider font-semibold"> Order number</p>
        <p className="tracking-wider text-sm"> #{props.order._id} </p>
      </div>

      <div className="flex flex-col gap-y-2 items-end">
        <p className="font-semibold"> Rs. {props.order.totalPrice} </p>
        <p className="tracking-wider font-serif">
          {props.order.paymentMethod} (
          <span
            className={`${
              props.order.paid ? "text-purple-600" : "text-red-500"
            }`}
          >
            {props.order.paid ? "Paid" : "Not-paid"}
          </span>
          )
        </p>
      </div>
    </div>
  );
};
