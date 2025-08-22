import {
  faSearch,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Rating from "@mui/material/Rating";
import { useEffect, useState } from "react";
import ProductDetailsSidebar from "../home/product_details_bar";

import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";
import toast from "react-hot-toast";

export type TheProductType = {
  id: string;
  brand: string;
  category: string;
  name: string;
  images: string[];
  price: number;
  description: string;
  availableQuantity: number;
  rating: number;
  totalReviews: number;
  skinType: string;
};

const AdminProductItem: React.FC<{ product: TheProductType }> = (props) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const authState = useAppSelector((state) => {
    return state.auth;
  });

  const token = authState.token;

  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  const deleteProduct = async (productId: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/products/delete-product/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        const error = new Error("Failed to delete product.");
        throw error;
      }
      return data;
    } catch (error) {
      throw error;
    }
  };

  const handleDelete = async () => {
    deleteProduct(props.product.id)
      .then((data) => {
        toast.success(data.message);
      })
      .catch((e) => {
        toast.error(e.message);
      })
      .finally(() => {
        setShowConfirmationDialog(false);
      });
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

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
      {showConfirmationDialog && (
        <ConfirmationDialog
          onConfirm={handleDelete}
          darkMode={darkMode}
          onCancel={() => setShowConfirmationDialog(false)}
        />
      )}
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

      <div className="header-data flex flex-col justify-start w-full">
        <div
          onClick={() => {
            navigate(`/product-details/${props.product.id}`);
          }}
          className="h-52 lg:h-56 w-full relative overflow-hidden rounded-xl shadow-sm shadow-black scale-95 hover:scale-100 transition-all"
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
          {/* Edit and delete icons */}
          {isHovered && (
            <div className="absolute top-3 right-3 flex space-x-2">
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(
                    `/accounts/admin/products/${props.product.id}/update-product`,
                    {
                      state: {
                        product: props.product,
                      },
                    }
                  );
                }}
                className="px-2 py-2 rounded-lg bg-black bg-opacity-50 flex justify-center items-center hover:scale-110 transition-all duration-200"
              >
                <FontAwesomeIcon
                  icon={faEdit}
                  className="text-white cursor-pointer"
                />
              </div>

              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setShowConfirmationDialog(true);
                }}
                className="px-2 py-2 rounded-lg bg-black bg-opacity-50 flex justify-center items-center hover:scale-110 transition-all duration-200"
              >
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  className="text-red-600 cursor-pointer"
                />
              </div>
            </div>
          )}
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
          Rs. {props.product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default AdminProductItem;

const ConfirmationDialog: React.FC<{
  onConfirm: () => void;
  onCancel: () => void;
  darkMode: boolean;
}> = (props) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-30">
      <div
        className={`bg-white p-4 rounded shadow-sm py-8 px-10 ${
          props.darkMode
            ? "bg-zinc-800 text-white shadow-slate-500"
            : "bg-white text-black shadow-black"
        }`}
        style={{ opacity: 1 }}
      >
        <p>Do you want to delete the item?</p>
        <div className="flex justify-end mt-4">
          <button
            className={`mr-2 px-4 py-1 rounded-sm   ${
              props.darkMode
                ? "bg-zinc-500 hover:bg-zinc-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-800"
            }`}
            onClick={props.onConfirm}
          >
            Yes
          </button>
          <button
            className={` px-4 py-1 rounded-sm  ${
              props.darkMode
                ? "bg-zinc-500 hover:bg-zinc-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-gray-800"
            }`}
            onClick={props.onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
