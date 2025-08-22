import React, { useEffect, useRef} from "react";
import { useAppSelector } from "../../hooks/hooks";
import "../../styles/diagonal-transition.css";
import "../../styles/home.css";
import NewSection from "./new_section";
import EndOfYearSection from "./end_of_year_section";
import { useNavigate } from "react-router-dom";
import "../../styles/animated_button.css";

const Home = () => {
  const scrollRef = useRef(0);
  const themeState = useAppSelector((state) => {
    return state.theme;
  });

  const darkMode = themeState.darkMode;

  useEffect(() => {
    document.title = 'Elegant Essentials';
    window.scrollTo(0, scrollRef.current);

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

  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      <div className="flex  w-full gap-x-10 flex-col gap-y-10 md:flex-row py-12">
        <div className="flex-col  w-full md:w-2/5 lg:w-2/5 flex gap-y-6">
          <p className="text-5xl font-semibold tracking-wider leading-snug">
            Elegant Essentials
          </p>
          <div
            onClick={() => {
              navigate("/products/Skincare");
            }}
            className="relative w-full"
          >
            <button
              className={`w-full rounded-xl bg-gray-300 text-gray-300 px-5 py-3 font-semibold tracking-wider transition-all ease-in-out `}
            >
              {" "}
              SHOP NOW
            </button>
            <button
              className={`button diagonal-translate w-full absolute rounded-xl -top-2 -left-2 font-semibold tracking-wider  ${
                darkMode ? "bg-purple-700" : "bg-black"
              } text-white px-5 py-3 transition-all ease-in-out rounded-sm`}
            >
              {" "}
              <p className="button-content"> SHOP NOW</p>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-x-2">
          <img
            className="header-image-first flex h-96 object-cover rounded-2xl"
            src="https://imgcdn.stablediffusionweb.com/2024/3/5/99d0eae1-39c2-46f1-bc05-2da0d0069c77.jpg"
            alt="pretty-click"
          />
          <img
            className=" header-image-second flex h-96 object-cover rounded-2xl"
            src="https://kassa-bnnvara.cdn.prepr.io/%7Bformat%7D/5d9lrb18nxzs-skincare.jpg"
            alt="pretty-click"
          />
          <img
            className="header-image-third flex h-96 object-cover rounded-2xl"
            src="https://www.getrael.com/cdn/shop/articles/December_Blog_Banners_Benefits_of_Organic_Skin_Care_Products.png?v=1641404707"
            alt="pretty-click"
          />
        </div>
      </div>
      <NewSection></NewSection>
      <EndOfYearSection></EndOfYearSection>
    </div>
  );
};

export default Home;
