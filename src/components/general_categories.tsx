import { useState } from "react";
import { useAppSelector } from "../hooks/hooks";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFan } from "@fortawesome/free-solid-svg-icons";

const GeneralCategories: React.FC = () => {
  const themeState = useAppSelector((state) => {
    return state.theme;
  });
  const darkMode = themeState.darkMode;
  const primaryColor = themeState.primaryColor;

  const [isAccessoriesHovered, setIsAccessoriesHovered] =
    useState<boolean>(false);
  const [isBodyHovered, setIsBodyHovered] = useState<boolean>(false);
  const [isMakeupHovered, setIsMakeupHovered] = useState<boolean>(false);

  const navigate = useNavigate();

  const navigateToACategory = (category: string) => {
    navigate(
      `/products/${category}?filterBy=dsc&minPrice=0&maxPrice=25000&page=1&instockFilter=all`
    );
  };
  return (
    <div
      className={`flex-row  hidden lg:flex ${
        darkMode ? "bg-black text-white" : "bg-slate-100 text-black"
      }`}
    >
      <div
        className="relative"
        onMouseEnter={() => {
          setIsMakeupHovered(true);
        }}
        onMouseLeave={() => {
          setIsMakeupHovered(false);
        }}
      >
        <p className="font-semibold cursor-pointer hover:bg-purple-600 px-5 py-4 transition-all duration-200 ease-in">
          {" "}
          Makeup +
        </p>
        {isMakeupHovered && (
          <div
            className={` ${
              darkMode ? "bg-black text-white" : "bg-white text-black"
            } ${
              darkMode ? "shadow-sm shadow-gray-800" : "shadow-sm shadow-black"
            } z-30 fixed top-40 left-0 right-0 w-full flex flex-row  gap-x-5 py-9 px-4 justify-evenly`}
          >
            <div className="flex flex-col gap-y-4">
              <p
                onClick={() => {
                  navigateToACategory("Foundation");
                }}
                className="hover:underline hover:decoration-1 text-sm font-semibold tracking-wider cursor-pointer"
              >
                {" "}
                Foundation
              </p>
              <p
                onClick={() => {
                  navigateToACategory("Blush");
                }}
                className="hover:underline hover:decoration-1 text-sm font-semibold tracking-wider cursor-pointer"
              >
                {" "}
                Blush
              </p>
              <p
                onClick={() => {
                  navigateToACategory("Concealer");
                }}
                className="hover:underline hover:decoration-1 text-sm font-semibold tracking-wider cursor-pointer"
              >
                {" "}
                Concealer
              </p>
              <p
                onClick={() => {
                  navigateToACategory("Bronzer");
                }}
                className="hover:underline hover:decoration-1 text-sm font-semibold tracking-wider cursor-pointer"
              >
                {" "}
                Bronzer
              </p>
              <p
                onClick={() => {
                  navigateToACategory("Primer");
                }}
                className="hover:underline hover:decoration-1 text-sm font-semibold tracking-wider cursor-pointer"
              >
                {" "}
                Primer
              </p>
            </div>
            <div className="flex flex-col gap-y-4">
              <p
                onClick={() => {
                  navigateToACategory("Mascara");
                }}
                className="hover:underline hover:decoration-1 text-sm font-semibold tracking-wider cursor-pointer"
              >
                {" "}
                Mascara
              </p>
              <p
                onClick={() => {
                  navigateToACategory("Eyeliner");
                }}
                className="hover:underline hover:decoration-1 text-sm font-semibold tracking-wider cursor-pointer"
              >
                {" "}
                Eyeliner
              </p>
              <p
                onClick={() => {
                  navigateToACategory("Eyeshadow");
                }}
                className="hover:underline hover:decoration-1 text-sm font-semibold tracking-wider cursor-pointer"
              >
                {" "}
                Eyeshadow
              </p>
            </div>
            <div className="flex flex-col gap-y-4">
              <p
                onClick={() => {
                  navigateToACategory("Liquid Lipstick");
                }}
                className="hover:underline hover:decoration-1 text-sm font-semibold tracking-wider cursor-pointer"
              >
                {" "}
                Liquid Lipstick
              </p>
              <p
                onClick={() => {
                  navigateToACategory("Lip Liner");
                }}
                className="hover:underline hover:decoration-1 text-sm font-semibold tracking-wider cursor-pointer"
              >
                {" "}
                Lip Liner
              </p>
              <p
                onClick={() => {
                  navigateToACategory("Lip Balm");
                }}
                className="hover:underline hover:decoration-1 text-sm font-semibold tracking-wider cursor-pointer"
              >
                {" "}
                Lip Balm
              </p>
              <p
                onClick={() => {
                  navigateToACategory("Lipstick");
                }}
                className="hover:underline hover:decoration-1 text-sm font-semibold tracking-wider cursor-pointer"
              >
                {" "}
                Lipstick
              </p>
            </div>
          </div>
        )}
      </div>
      <p
        onClick={() => {
          navigateToACategory("Skincare");
        }}
        className="font-semibold cursor-pointer hover:bg-purple-600 px-5 py-4 transition-all duration-200 ease-in"
      >
        {" "}
        Skincare +
      </p>
      <div
        className="relative"
        onMouseEnter={() => {
          setIsBodyHovered(true);
        }}
        onMouseLeave={() => {
          setIsBodyHovered(false);
        }}
      >
        <p className="font-semibold cursor-pointer hover:bg-purple-600 px-5 py-4 transition-all duration-200 ease-in">
          {" "}
          Body +
        </p>
        {isBodyHovered && (
          <div
            className={` ${
              darkMode ? "bg-black text-white" : "bg-white text-black"
            } ${
              darkMode ? "shadow-sm shadow-gray-800" : "shadow-sm shadow-black"
            } z-30 absolute top-14 left-0 w-80 flex flex-row  gap-x-5 py-9 px-4 justify-between`}
          >
            <p
              onClick={() => {
                navigateToACategory("Deodorant");
              }}
              className="hover:underline hover:decoration-1 cursor-pointer text-sm font-semibold tracking-wider"
            >
              {" "}
              Deodorant
            </p>
            <p
              onClick={() => {
                navigateToACategory("Body Wash");
              }}
              className=" hover:underline hover:decoration-1 cursor-pointer text-sm font-semibold tracking-wider"
            >
              {" "}
              Body Wash
            </p>
          </div>
        )}
      </div>

      <div
        className="relative"
        onMouseEnter={() => {
          setIsAccessoriesHovered(true);
        }}
        onMouseLeave={() => {
          setIsAccessoriesHovered(false);
        }}
      >
        <p className="font-semibold cursor-pointer hover:bg-purple-600 px-5 py-4 transition-all duration-200 ease-in">
          {" "}
          Accessories +
        </p>
        {isAccessoriesHovered && (
          <div
            className={` ${
              darkMode ? "bg-black text-white" : "bg-white text-black"
            } ${
              darkMode ? "shadow-sm shadow-gray-800" : "shadow-sm shadow-black"
            } z-30 absolute top-14 left-0 w-80 flex flex-row  gap-x-5 py-9 px-4 justify-between`}
          >
            <p
              onClick={() => {
                navigateToACategory("Blending Sponge");
              }}
              className="hover:underline hover:decoration-1 cursor-pointer text-sm font-semibold tracking-wider"
            >
              {" "}
              Blending Sponge
            </p>
            <p
              onClick={() => {
                navigateToACategory("Makeup Brush");
              }}
              className="hover:underline hover:decoration-1 cursor-pointer text-sm font-semibold tracking-wider"
            >
              {" "}
              Makeup Brush
            </p>
          </div>
        )}
      </div>
      <p onClick={() => {
        navigate('/analyze-skin')
      }} className="font-semibold cursor-pointer hover:bg-purple-600 px-5 py-4 transition-all duration-200 ease-in">
        {" "}
        Analyze Skin +
      </p>
    </div>
  );
};

export default GeneralCategories;
