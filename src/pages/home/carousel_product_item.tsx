import { useEffect } from "react";
import ImageSelectors from "../../components/image-selector";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import "../../styles/diagonal-transition.css";
import "../../styles/home.css";
import { TheProductType } from "../admin_account/admin_product_item";
import { cartSliceActions } from "../../slices/cart-slice";
import toast from "react-hot-toast";
import "../../styles/animated_button.css";

const CarouselProductItem: React.FC<{ product: TheProductType }> = (props) => {
  const themeState = useAppSelector((state) => {
    return state.theme;
  });

  const darkMode = themeState.darkMode;

  const authState = useAppSelector((state) => {
    return state.auth;
  });

  const user = authState.user;

  const dispatch = useAppDispatch();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              "heading-text-1-active",
              "heading-text-2-active",
              "header-image-first-active",
              "header-image-second-active",
              "header-image-third-active",
              "header-data-active"
            );
          } else {
          }
        });
      },
      { threshold: 0.5, root: null }
    );
    const hiddenElements = document.querySelectorAll(
      ".heading-text-1, .heading-text-2, .header-image-first, .header-image-second, .header-image-third, .header-data"
    );
    hiddenElements.forEach((el) => observer.observe(el));
  }, []);

  return (
    <div
      key={props.product.id}
      className={`slick-slide w-full mt-10 border border-solid   rounded-lg ${
        darkMode ? "bg-zinc-800 border-white" : "bg-violet-50 border-black"
      }   `}
    >
      <div className="w-full flex flex-col md:flex-row gap-x-5 gap-y-5">
        <div className="w-full md:w-2/3 ">
          <ImageSelectors images={props.product.images}></ImageSelectors>
        </div>
        <div className="flex flex-col">
          <p className="heading-text-1 text-2xl tracking-wider">
            {" "}
            {props.product.name}
          </p>
          <p className="header-data pt-6 font-semibold text-xl">
            {" "}
            Rs. {props.product.price}
          </p>
          <p className="header-data text-xm pt-1">
            {" "}
            Tax included. <span className="text-purple-500">Shipping</span>{" "}
            calculated at checkout.
          </p>

          <div
            onClick={() => {
              if (!user) {
                toast.error("Please login to add items to cart.");
                return;
              } else if (user.status === "admin") {
                toast.error("Action denied.");
                return;
              } else if (props.product.availableQuantity === 0) {
                toast.error(`${props.product.name} has been sold out.`);
                return;
              }
              dispatch(
                cartSliceActions.addItemToCart({
                  item: {
                    productItem: {
                      id: props.product.id,
                      type: props.product.category,
                      image: props.product.images[0],
                      name: props.product.name,
                      price: props.product.price,
                    },
                    count: 1,
                    price: props.product.price,
                  },
                })
              );
              toast.success("Item added to your cart.");
            }}
            className="header-image-first relative w-full mt-7"
          >
            <button
              className={`w-full rounded-xl bg-gray-300 text-gray-300 px-5 py-3 font-semibold tracking-wider transition-all ease-in-out `}
            >
              {" "}
              Add to Cart{" "}
            </button>
            <button
              className={`text-white button diagonal-translate w-full absolute rounded-xl  font-semibold tracking-wider  ${
                darkMode ? "bg-purple-500 " : "bg-black "
              }  px-5 py-3 transition-all ease-in-out rounded-sm`}
            >
              <p className="button-content ">Add to Cart</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarouselProductItem;
