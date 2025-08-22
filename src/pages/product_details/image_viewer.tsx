import { useRef, useState } from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faExpand,
  faExpandAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../hooks/hooks";

const ImageViewer: React.FC<{ isFixed: boolean; images: string[] }> = (
  props
) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const sliderRef = useRef<Slider>(null);

  const themeState = useAppSelector((state) => {
    return state.theme;
  });

  const darkMode = themeState.darkMode;

  const settings = {
    dots: true,
    infinite: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    afterChange: (index: number) => setCurrentIndex(index),
  };

  const goToSlide = (index: number) => {
    if (sliderRef.current) {
      sliderRef.current.slickGoTo(index);
    }
  };

  let images = props.images;

  return (
    <div
      className={`w-full flex flex-row ${
        props.isFixed ? "sticky top-44" : "static"
      }`}
    >
      <div
        style={{
          scrollbarWidth: "none",
        }}
        className="flex flex-col h-96 overflow-y-scroll w-1/5 gap-y-3 "
      >
        {images.map((image, index) => (
          <img
            key={index}
            className={`h-20 w-full cursor-pointer object-cover rounded-xl ${
              currentIndex === index
                ? darkMode
                  ? "border-2 border-solid border-white"
                  : "border-2 border-solid border-black"
                : ""
            }`}
            src={`http://localhost:8080/images/${image}`}
            alt="pretty-click"
            onClick={() => goToSlide(index)} // Go to corresponding slide on click
          />
        ))}
      </div>
      <div className="w-4/5 h-72 relative">
        <Slider className="w-full" ref={sliderRef} {...settings}>
          {images.map((image, index) => (
            <img
              key={index}
              className="object-cover w-full h-72 rounded-xl"
              src={`http://localhost:8080/images/${image}`}
              alt="pretty-click"
            />
          ))}
        </Slider>
        <div
          onClick={() => {
            if (currentIndex >= 0 && currentIndex < images.length) {
              window.open(
                `http://localhost:8080/images/${images[currentIndex]}`,
                "_blank"
              );
            }
          }}
          className="absolute top-5 right-5 flex flex-row items-center justify-center rounded-full h-10 w-10 border border-solid border-black bg-purple-50 shadow-md shadow-black hover:cursor-pointer"
        >
          <FontAwesomeIcon className="text-black" icon={faExpand} />
        </div>
        <div
          onClick={() => goToSlide(currentIndex - 1)}
          className="absolute top-1/2 left-5 flex flex-row items-center justify-center rounded-full h-10 w-10 border border-solid border-black bg-purple-100 shadow-md shadow-black hover:cursor-pointer"
        >
          <FontAwesomeIcon className="text-black" icon={faChevronLeft} />
        </div>
        <div
          onClick={() => goToSlide(currentIndex + 1)}
          className="absolute top-1/2 right-5  flex flex-row items-center justify-center rounded-full h-10 w-10 border border-solid border-black bg-purple-100 shadow-md shadow-black hover:cursor-pointer"
        >
          <FontAwesomeIcon className="text-black" icon={faChevronRight} />
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;
