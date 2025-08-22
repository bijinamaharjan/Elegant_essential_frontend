import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../hooks/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import Slider from "rc-slider";
import "../../styles/check_box.css";
import { useNavigate } from "react-router-dom";
import "../../styles/slider.css";

const SearchFilterBar: React.FC<{
  toggleShowFilterBar: () => void;
  currentPage: number;
  search: string;
  filterBy: string;
  minPrice: number;
  maxPrice: number;
  instockFilter: string;
}> = (props) => {
  const navigate = useNavigate();
  const search = props.search;
  const themeState = useAppSelector((state) => state.theme);
  const darkMode = themeState.darkMode;

  const [filterBy, setFilterBy] = useState(props.filterBy);
  const [instockFilter, setInstockFilter] = useState(props.instockFilter);

  const [range, setRange] = useState([props.minPrice, props.maxPrice]);
  const [instock, setInstock] = useState(
    props.instockFilter === "all" || props.instockFilter === "instock"
      ? true
      : false
  );
  const [outofstock, setOutofstock] = useState(
    props.instockFilter === "all" || props.instockFilter === "outofstock"
      ? true
      : false
  );

  const handleRangeChange = (newRange: any) => {
    setRange(newRange);
  };

  useEffect(() => {
    setFilterBy(props.filterBy);

    setRange([props.minPrice, props.maxPrice]);
    setInstockFilter(props.instockFilter);
    setInstock(
      props.instockFilter === "all" || props.instockFilter === "instock"
        ? true
        : false
    );
    setOutofstock(
      props.instockFilter === "all" || props.instockFilter === "outofstock"
        ? true
        : false
    );
  }, [
    props.filterBy,
    props.minPrice,
    props.maxPrice,
    props.instockFilter,
    props.currentPage,
  ]);

  const scrollRef = useRef(0);

  return (
    <div
      className={`${
        darkMode ? "bg-zinc-800 shadow-zinc-600" : "bg-slate-50 shadow-gray-700"
      } px-3 py-4 shadow-sm gap-y-3 flex flex-col rounded-md`}
    >
      <p className="font-semibold tracking-wider">Sort By</p>
      <select
        value={filterBy}
        onChange={(e) => {
          props.toggleShowFilterBar();
          setFilterBy(e.target.value);
          navigate(
            `/search/${search}?filterBy=${e.target.value}&minPrice=${range[0]}&maxPrice=${range[1]}&page=1&instockFilter=${instockFilter}`
          );
          window.scrollTo(0, scrollRef.current);
        }}
        className={`${
          darkMode ? "bg-zinc-800 " : "bg-slate-50"
        } p-2 rounded border w-full text-sm`}
      >
        <option className="py-2" value="dsc">
          Date ( New - Old )
        </option>
        <option className="py-2" value="asc">
          Date ( Old - New )
        </option>

        <option className="py-2" value="price-asc">
          Price ( Low - High )
        </option>
        <option className="py-2" value="price-dsc">
          Price ( High - Low )
        </option>
      </select>
      <div className="flex felx-row items-center gap-x-3 mt-5 mb-3">
        <FontAwesomeIcon
          className="text-gray-500"
          icon={faFilter}
        ></FontAwesomeIcon>
        <p className="font-semibold tracking-wider">Filter By</p>
      </div>
      <div
        style={{
          height: "0.5px",
        }}
        className={`bg-gray-600`}
      ></div>
      <div className="my-4">
        <p> Price </p>
        <Slider
          key={`${props.minPrice}${props.maxPrice}`}
          className="my-3 custom-slider"
          range={true}
          defaultValue={range}
          count={1}
          min={0}
          max={25000}
          value={range}
          onChange={handleRangeChange}
          onChangeComplete={(newRange: any) => {
            props.toggleShowFilterBar();
            navigate(
              `/search/${search}?filterBy=${filterBy}&minPrice=${newRange[0]}&maxPrice=${newRange[1]}&page=1&instockFilter=${instockFilter}`
            );
            window.scrollTo(0, scrollRef.current);
          }}
          allowCross={false}
        />
        {/* Display the range values */}
        <div className="flex flex-row justify-between w-full px-5">
          <div className="flex flex-col items-start">
            <p className="text-sm tracking-wider font-semibold"> From </p>
            <p className="tracking-wider">Rs. {range[0]} </p>
          </div>
          <div className="flex flex-col items-start">
            <p className="text-sm tracking-wider font-semibold"> To </p>
            <p className="tracking-wider">Rs. {range[1]} </p>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <p className="mb-2">Availability</p>
        <div className="mb-4 flex flex-col items-start gap-y-2">
          <div className="w-full relative flex flex-row items-center ">
            <input
              checked={instock}
              onChange={(event) => {
                props.toggleShowFilterBar();
                const isChecked = event.target.checked;
                setInstock(isChecked);
                if (isChecked && outofstock) {
                  navigate(
                    `/search/${search}?filterBy=${filterBy}&minPrice=${
                      range[0]
                    }&maxPrice=${range[1]}&page=${1}&instockFilter=all`
                  );
                } else if (isChecked && !outofstock) {
                  navigate(
                    `/search/${search}?filterBy=${filterBy}&minPrice=${
                      range[0]
                    }&maxPrice=${range[1]}&page=${1}&instockFilter=instock`
                  );
                } else if (!isChecked && outofstock) {
                  navigate(
                    `/search/${search}?filterBy=${filterBy}&minPrice=${
                      range[0]
                    }&maxPrice=${range[1]}&page=${1}&instockFilter=outofstock`
                  );
                } else {
                  navigate(
                    `/search/${search}?filterBy=${filterBy}&minPrice=${
                      range[0]
                    }&maxPrice=${range[1]}&page=${1}&instockFilter=all`
                  );
                }
                window.scrollTo(0, scrollRef.current);
              }}
              type="checkbox"
              id="myCheckbox1"
              name="myCheckbox1"
              className="mr-3 h-7 w-7  checked:bg-purple-500 checked:border-white border border-solid"
            />
            <span className="text tracking-wider">In stock</span>
          </div>
          <div className="w-full relative flex flex-row items-center">
            <input
              checked={outofstock}
              onChange={(event) => {
                props.toggleShowFilterBar();
                const isChecked = event.target.checked;
                setOutofstock(isChecked);
                if (isChecked && instock) {
                  navigate(
                    `/search/${search}?filterBy=${filterBy}&minPrice=${
                      range[0]
                    }&maxPrice=${range[1]}&page=${1}&instockFilter=all`
                  );
                } else if (isChecked && !instock) {
                  navigate(
                    `/search/${search}?filterBy=${filterBy}&minPrice=${
                      range[0]
                    }&maxPrice=${range[1]}&page=${1}&instockFilter=outofstock`
                  );
                } else if (!isChecked && instock) {
                  navigate(
                    `/search/${search}?filterBy=${filterBy}&minPrice=${
                      range[0]
                    }&maxPrice=${range[1]}&page=${1}&instockFilter=instock`
                  );
                } else {
                  navigate(
                    `/search/${search}?filterBy=${filterBy}&minPrice=${
                      range[0]
                    }&maxPrice=${range[1]}&page=${1}&instockFilter=all`
                  );
                }
                window.scrollTo(0, scrollRef.current);
              }}
              type="checkbox"
              id="myCheckbox"
              name="myCheckbox"
              className="mr-3 h-7 w-7  checked:bg-purple-500 checked:border-white border border-solid"
            />
            <span className="text tracking-wider">Out of stock</span>
            {/* {outofstock && (
              <span className="absolute left-1.5 top-0.5 ">
                <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
              </span>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilterBar;
