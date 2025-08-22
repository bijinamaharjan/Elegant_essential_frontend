import React, { useEffect } from "react";
import cat from "../../images/cat-sorry.png";
import "../../styles/home.css";

const NotFound: React.FC = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              "heading-text-1-active",
              "heading-text-2-active",
              "header-data-active"
            );
          } else {
          }
        });
      },
      { threshold: 0.5, root: null }
    );
    const hiddenElements = document.querySelectorAll(
      ".heading-text-1, .heading-text-2, .header-data"
    );
    hiddenElements.forEach((el) => observer.observe(el));
  }, []);
  return (
    <div className="flex flex-col md:flex-row items-center w-full px-10 py-10">
      <img
        src={cat}
        alt="cat-shocked"
        className="header-data object-cover h-60 lg:h-64"
      ></img>
      <div className="flex flex-col gap-y-2">
        <p className="heading-text-1 font-semibold"> 404 | Not Found</p>
        <p className="heading-text-2 text-sm tracking-wide text-zinc-500">
          {" "}
          We are sorry, we were unable to find this page for you.{" "}
        </p>
      </div>
    </div>
  );
};

export default NotFound;
