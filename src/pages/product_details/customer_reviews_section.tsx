import { Rating } from "@mui/material";
import ReviewItem from "./review_item";
import WriteReview from "../../components/write-review";
import { useEffect, useRef, useState } from "react";
import { TheProductType } from "../admin_account/admin_product_item";
import { useAppSelector } from "../../hooks/hooks";
import toast from "react-hot-toast";
import useFutureBuilder from "../../hooks/future_builder_hook";
import ThePulseLoader from "../../components/pulse-loader";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";

const CustomerReviews: React.FC<{ product: TheProductType }> = (props) => {
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [sortBy, setSortBy] = useState("recent");

  const authState = useAppSelector((state) => {
    return state.auth;
  });

  const user = authState.user;

  const toggleShowWriteReview = () => {
    setShowWriteReview(!showWriteReview);
  };
  const [page, setPage] = useState(1);

  const { isLoading, error, data } = useFutureBuilder(
    `http://localhost:8080/reviews/${props.product.id}?page=${page}&sortBy=${sortBy}`
  );

  const themeState = useAppSelector((state) => {
    return state.theme;
  });

  const darkMode = themeState.darkMode;

  const navigate = useNavigate();

  const totalReviews = data ? data.totalReviews : 0;

  return (
    <div className="mt-10 flex flex-col w-full">
      {showWriteReview && (
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(5px)",
          }}
          className="fixed top-0 right-0 left-0 h-full w-screen z-20"
          onClick={() => {
            setShowWriteReview(false);
          }}
        ></div>
      )}
      {showWriteReview && (
        <WriteReview
          id={props.product.id}
          showWriteReview={showWriteReview}
          close={toggleShowWriteReview}
        />
      )}
      <p className="text-lg font-semibold tracking-wide"> Customer Reviews </p>
      <p className="mt-3 font-bold text-xl"> {props.product.rating} </p>
      <Rating
        className=""
        name="simple-controlled"
        value={props.product.rating}
        readOnly
        size="medium"
      />
      <p className="text-sm"> Based on {props.product.totalReviews} reviews </p>
      <button
        onClick={() => {
          if (!user) {
            toast.success("Login to continue.");
            navigate("/login");
            return;
          }
          const productIdExists = user.orderedItems.some(
            (item: any) => item.productId === props.product.id
          );
          if (!productIdExists) {
            toast.error("Hmm, You don't seem to have purchased the product.");
            return;
          }
          toggleShowWriteReview();
        }}
        className="bg-purple-600 text-white px-4 py-2 mt-3 rounded-lg hover:bg-purple-800 transition-all duration-300 hover:translate-x-2 ease-in-out"
      >
        Add a Review
      </button>

      <div className="flex flex-row w-full justify-between items-center">
        <p className="mt-5 mb-3 text-xl font-semibold"> Reviews</p>

        <ReviewFilter setSortBy={setSortBy}></ReviewFilter>
      </div>
      {isLoading && (
        <div className="h-52 w-full flex flex-row items-center justify-center">
          <ThePulseLoader color="purple"></ThePulseLoader>
        </div>
      )}
      {error && <p> {error.message} </p>}
      {data && (
        <div className="flex flex-col w-full gap-y-4">
          {data.reviews.map((reviewData: any) => {
            return <ReviewItem reviewData={reviewData}></ReviewItem>;
          })}
        </div>
      )}
      <ReactPaginate
        // key={selectedDate?.toISOString()}
        pageCount={Math.ceil(totalReviews / 5)}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={(selectedItem) => {
          setPage(selectedItem.selected + 1);
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

export default CustomerReviews;

const ReviewFilter: React.FC<{ setSortBy: (sortBy: string) => void }> = (
  props
) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("Most Recent");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleFilterChange = (filter: string) => {
    switch (filter) {
      case "highest":
        setSelectedFilter("Highest Rating");
        break;
      case "lowest":
        setSelectedFilter("Lowest Rating");
        break;
      case "recent":
        setSelectedFilter("Most Recent");
        break;
      default:
        break;
    }
    props.setSortBy(filter);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const themeState = useAppSelector((state) => {  
    return state.theme;
  });

  const darkMode = themeState.darkMode;

  return (
    <div className="flex flex-row items-center gap-x-2">
      <p className="font-light"> {selectedFilter} </p>
      <div className="relative inline-block text-center" ref={dropdownRef}>
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer flex flex-row justify-center items-center px-1.5 py-1.5 border border-solid border-gray-700 rounded-sm"
        >
          <FontAwesomeIcon
            aria-haspopup="true"
            aria-expanded={isOpen}
            icon={faFilter}
            className={`${darkMode ? "text-white" : "text-black"} text-sm`}
          ></FontAwesomeIcon>
        </div>
        {isOpen && (
          <div
            className={`${
              darkMode ? "bg-zinc-800 text-white" : "bg-white text-black"
            } absolute right-0 mt-2 w-32 flex flex-col items-center rounded-md shadow-lg ring-1 ring-black ring-opacity-5`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              onClick={() => handleFilterChange("highest")}
              className={`${
                darkMode ? "hover:bg-slate-500" : "hover:bg-slate-200"
              } block px-4 py-2 text-sm  hover:rounded-md  w-full`}
              role="menuitem"
            >
              Highest Rating
            </button>
            <button
              onClick={() => handleFilterChange("lowest")}
              className={`${
                darkMode ? "hover:bg-slate-500" : "hover:bg-slate-200"
              } block px-4 py-2 text-sm  hover:rounded-md  w-full`}
              role="menuitem"
            >
              Lowest Rating
            </button>
            <button
              onClick={() => handleFilterChange("recent")}
              className={`${
                darkMode ? "hover:bg-slate-500" : "hover:bg-slate-200"
              } block px-4 py-2 text-sm  hover:rounded-md  w-full`}
              role="menuitem"
            >
              Most Recent
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
