import { useEffect, useRef, useState } from "react";
import ThePulseLoader from "../../components/pulse-loader";
import { useAuthorizedFutureBuilder } from "../../hooks/future_builder_hook";
import { useAppSelector } from "../../hooks/hooks";
import LoadError from "../home/load-error";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "../../styles/home.css";
import "react-datepicker/dist/react-datepicker.css";
import Payment from "../../models/payment";

export type OrderType = {};

const UserPayments: React.FC = () => {
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
    `http://localhost:8080/payments/my-payments?filterBy=dsc&page=${currentPage}&date=${selectedDate}`,
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
        <p className="tracking-wider font-semibold mb-5"> My Payments </p>
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
          {data.payments.map((payment: any, index: number) => {
            return (
              <PaymentItem
                key={payment._id}
                index={index}
                payment={new Payment(payment)}
              ></PaymentItem>
            );
          })}
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

export default UserPayments;

const PaymentItem: React.FC<{ payment: Payment; index: number }> = (props) => {
  const themeState = useAppSelector((state) => {
    return state.theme;
  });
  const darkMode = themeState.darkMode;

  const getFormattedDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

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
      className={`header-image-3 border border-solid ${
        darkMode ? "border-white" : "border-black"
      } w-full flex flex-col items-start lg:flex-row gap-y-2 justify-between lg:items-center px-4 py-4 hover:scale-105 transition-all duration-300 ease-in-out hover:cursor-pointer`}
    >
      <div className="flex flex-row items-center gap-x-4">
        <div
          className={`${
            props.index % 2 === 0 ? "bg-purple-600" : "bg-pink-400"
          } px-3 py-1.5 rounded-lg `}
        >
          <FontAwesomeIcon icon={faShoppingBag}></FontAwesomeIcon>
        </div>
        <div className="flex flex-col">
          <p className="text-sm tracking-wider font-semibold">
            {" "}
            Payment Order #{props.payment._id}{" "}
          </p>
          <p className="font-mono tracking-wider">
            {" "}
            {props.payment.transactionCode}{" "}
          </p>
        </div>
      </div>
      <p className="text-gray-500 font-mono tracking-wide">
        {" "}
        Rs. {props.payment.totalAmount}{" "}
      </p>
      <p className="text-gray-500 font-mono tracking-wide">
        {" "}
        {getFormattedDate(props.payment.createdAt)}{" "}
      </p>
    </div>
  );
};
