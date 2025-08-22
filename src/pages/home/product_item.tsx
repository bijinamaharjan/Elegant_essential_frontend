import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Rating from "@mui/material/Rating";
import { useEffect, useState } from "react";
import ProductDetailsSidebar from "./product_details_bar";
import { useNavigate } from "react-router-dom";
import { TheProductType } from "../admin_account/admin_product_item";
import "../../styles/home.css";

const ProductItem: React.FC<{ product: TheProductType }> = (props) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("header-data-active");
          } else {
          }
        });
      },
      { threshold: 0.5, root: null }
    );
    const hiddenElements = document.querySelectorAll(".header-data");
    hiddenElements.forEach((el) => observer.observe(el));
  }, []);
  return (
    <div>
      {showMenu && (
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(5px)",
          }}
          className="fixed top-0 right-0 h-full w-screen bg-black bg-opacity-80 z-40"
          onClick={toggleMenu}
        ></div>
      )}
      <ProductDetailsSidebar
        isOpen={showMenu}
        toggleSidebar={toggleMenu}
        product={props.product}
      ></ProductDetailsSidebar>

      <div className="header-data  flex flex-col justify-start w-full">
        <div
          onClick={() => {
            navigate(`/product-details/${props.product.id}`);
          }}
          className="h-60 md:h-52 lg:h-56 w-full relative overflow-hidden rounded-xl shadow-sm shadow-black scale-95 hover:scale-100 transition-all"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <img
            className={`object-cover h-52 lg:h-72 w-full rounded-xl hover:cursor-pointer transition-transform duration-700 ${
              isHovered ? "scale-125" : "scale-100"
            }`}
            src={`http://localhost:8080/images/${props.product.images[0]}`}
            alt="product"
          />
          <div
            onClick={(e) => {
              e.stopPropagation();
              toggleMenu();
            }}
            className={`absolute h-8 w-8 rounded-full bg-gray-500 cursor-pointer ${
              isHovered ? "opacity-50 scale-100" : "opacity-0 scale-0"
            } bottom-5 right-5 flex flex-row justify-center items-center transition-all duration-300`}
          >
            <FontAwesomeIcon
              className="text-black"
              icon={faSearch}
            ></FontAwesomeIcon>
          </div>
        </div>
        <p className="tracking-wider text-gray-400 mt-3 mb-2">
          {props.product.name}
        </p>
        <Rating
          name="simple-controlled"
          value={props.product.rating}
          readOnly
          size="small"
        />
        <p className="tracking-wide font-semibold mt-1">
          {" "}
          Rs. {props.product.price}{" "}
        </p>
      </div>
    </div>
  );
};

export default ProductItem;
