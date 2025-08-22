import React, { useState, useEffect, useRef } from "react";
import ProductItemShimmer from "../../utilities/shimmers/product-item-shimmer";
import { useAppSelector } from "../../hooks/hooks";
import { PaginatorComponent } from "../products_by_category/products_by_category";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useFutureBuilder from "../../hooks/future_builder_hook";
import ThePulseLoader from "../../components/pulse-loader";
import LoadError from "../home/load-error";
import ProductItem from "../home/product_item";
import SearchFilterBar from "../products_by_category/search_filter_bar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

const Search = () => {
  const { keyword } = useParams();
  const [searchText, setSearchText] = useState(keyword ?? "");
  const [theKeyword, setTheKeyword] = useState(keyword ?? "");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const filterBy = queryParams.get("filterBy") || "dsc";
  const minPrice = parseInt(queryParams.get("minPrice") || "0") || 0;
  const maxPrice = parseInt(queryParams.get("maxPrice") || "25000") || 25000;
  const page = parseInt(queryParams.get("page") || "1") || 1;
  console.log("page", page);
  console.log("filterby", filterBy);
  const instockFilter = queryParams.get("instockFilter") || "all";

  const { isLoading, error, data } = useFutureBuilder(
    `http://localhost:8080/products/products-by-search?name=${searchText}&filterBy=${filterBy}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=${page}&instockFilter=${instockFilter}`
  );

  const scrollRef = useRef(0);

  const themeState = useAppSelector((state) => {
    return state.theme;
  });
  const darkMode = themeState.darkMode;

  const navigate = useNavigate();

  const [showFilterBar, setShowFilterBar] = useState(false);

  const toggleFilterBar = () => {
    setShowFilterBar(false);
  };

  const filterBarRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      filterBarRef.current &&
      !filterBarRef.current.contains(event.target as Node)
    ) {
      setShowFilterBar(false);
    }
  };

  useEffect(() => {
    document.title = `${data ? data.totalCount : ""} Search Results`;
    window.scrollTo(0, scrollRef.current);
    window.scrollTo(0, scrollRef.current);
    setSearchText(keyword || "");
    setTheKeyword(keyword || "");
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [keyword, data, searchText]);
  return (
    <div className="flex flex-col items-start relative w-full py-4 md:py-12">
      <div
        onClick={() => {
          setShowFilterBar(!showFilterBar);
        }}
        className={`shadow-md cursor-pointer w-full border border-solid px-4 py-3 fixed bottom-0 left-0 right-0 flex flex-row items-center justify-center gap-x-5 md:hidden z-10 ${
          darkMode
            ? "border-black shadow-white bg-white text-black"
            : "border-white bg-black text-white shadow-black"
        }`}
      >
        <p> Filter By </p>
        <FontAwesomeIcon className="" icon={faSort}></FontAwesomeIcon>
      </div>
      <p className="tracking-wider text-2xl font-semibold mb-3">Search</p>
      <div className="flex mb-3 w-full">
        <input
          value={theKeyword}
          onChange={(e) => {
            setTheKeyword(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (theKeyword.trim().length === 0) {
                return;
              } else {
                navigate(
                  `/search/${theKeyword}?filterBy=${filterBy}&minPrice=${minPrice}&maxPrice=${maxPrice}&page=1&instockFilter=${instockFilter}`
                );
              }
            }
          }}
          placeholder="Start searching ..."
          className={`px-3 py-2 rounded-sm border border-solid ${
            darkMode ? "bg-zinc-800" : "bg-white"
          } border-zinc-600 w-full mr-2`}
        />
      </div>
      <div className="flex flex-row w-full gap-x-4 ">
        <div className="flex-col w-2/5 lg:w-2/6 hidden md:flex md:flex-col md:justify-start">
          <div className="sticky top-44 w-full">
            <SearchFilterBar
              toggleShowFilterBar={toggleFilterBar}
              currentPage={page}
              search={searchText!}
              filterBy={filterBy}
              minPrice={minPrice}
              maxPrice={maxPrice}
              instockFilter={instockFilter}
            ></SearchFilterBar>
          </div>
        </div>

        <div
          ref={filterBarRef}
          className={`w-full fixed bottom-0 right-0 left-0 z-10 transition-all duration-500 ease-out md:hidden ${
            showFilterBar ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <SearchFilterBar
            toggleShowFilterBar={toggleFilterBar}
            currentPage={page}
            search={searchText!}
            filterBy={filterBy}
            minPrice={minPrice}
            maxPrice={maxPrice}
            instockFilter={instockFilter}
          ></SearchFilterBar>
        </div>

        <div className="div-red flex flex-col w-full">
          {data && searchText?.length > 0 && (
            <p className="font-semibold tracking-wider text-xl mb-5">
              {data.totalCount} results found for "{searchText}"
            </p>
          )}
          <div className="w-full">
            {searchText?.length === 0 && <p> Search for products.</p>}
            {isLoading && (
              <div className="h-44 flex flex-row justify-center items-center">
                <ThePulseLoader color="purple"></ThePulseLoader>
              </div>
            )}
            {error && <LoadError message={error.message}></LoadError>}
            <div className="div-red"></div>
            {data && searchText?.length > 0 && !error && (
              <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-4">
                {data.products.map((product: any) => (
                  <ProductItem
                    key={product.id}
                    product={{
                      id: product._id,
                      brand: product.brand,
                      category: product.category,
                      name: product.name,
                      images: product.images,
                      price: product.price,
                      description: product.description,
                      availableQuantity: product.quantityAvailable,
                      rating: product.rating,
                      totalReviews: product.totalReviews,
                      skinType: product.skinType,
                    }}
                  />
                ))}
              </div>
            )}
            {data && data.totalCount > 12 && searchText?.length > 0 && (
              <PaginatorComponent
                urlKey="search"
                page={page}
                totalItems={data.totalCount}
                category={searchText!}
                filterBy={filterBy}
                minPrice={minPrice}
                maxPrice={maxPrice}
                instockFilter={instockFilter}
              ></PaginatorComponent>
            )}
          </div>
        </div>
      </div>
      {isLoading && error === null && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 w-full">
          {[...Array(8)].map((_, index) => (
            <ProductItemShimmer key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
