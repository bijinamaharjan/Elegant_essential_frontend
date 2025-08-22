import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "../../hooks/hooks";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import "../../styles/pulse.css";

const FreeDeliveryComp: React.FC = () => {
  const themeState = useAppSelector((state) => {
    return state.theme;
  });

  const darkMode = themeState.darkMode;
  const primaryColor = themeState.primaryColor;

  return (
    <div
      className={` ${
        darkMode ? "bg-zinc-800" : "bg-purple-50 shadow-sm shadow-gray-300"
      } flex flex-col justify-center gap-y-5 items-center h-64 w-full rounded-2xl relative overflow-hidden`}
    >
      <FontAwesomeIcon
        style={{
          rotate: "35deg",
        }}
        className={`animate-pulsee text-5xl ${
          darkMode ? "text-slate-200" : "text-red-500"
        } absolute top-4 right-4 `}
        icon={faHeart}
      ></FontAwesomeIcon>
      <FontAwesomeIcon
        style={{
          rotate: "57deg",
        }}
        className={`animate-pulsee text-5xl ${
          darkMode ? "text-slate-200" : "text-red-500"
        } absolute top-10 right-32 `}
        icon={faHeart}
      ></FontAwesomeIcon>
      <FontAwesomeIcon
        style={{
          rotate: "69deg",
        }}
        className={`animate-pulsee text-xl ${
          darkMode ? "text-slate-200" : "text-red-500"
        } absolute bottom-14 right-40 `}
        icon={faHeart}
      ></FontAwesomeIcon>
      <FontAwesomeIcon
        style={{
          rotate: "-43deg",
        }}
        className={`animate-pulsee text-5xl ${
          darkMode ? "text-slate-200" : "text-red-500"
        } absolute top-1/3 -left-2 `}
        icon={faHeart}
      ></FontAwesomeIcon>
      <FontAwesomeIcon
        style={{
          rotate: "-59deg",
        }}
        className={`animate-pulsee text-3xl ${
          darkMode ? "text-slate-200" : "text-red-500"
        } absolute top-1/2 left-1/4 `}
        icon={faHeart}
      ></FontAwesomeIcon>
      <FontAwesomeIcon
        style={{
          rotate: "-38deg",
        }}
        className={`animate-pulsee text-5xl ${
          darkMode ? "text-slate-200" : "text-red-500"
        } absolute top-20 left-1/3 `}
        icon={faHeart}
      ></FontAwesomeIcon>
      <FontAwesomeIcon
        style={{
          rotate: "4deg",
        }}
        className={`animate-pulsee text-4xl ${
          darkMode ? "text-slate-200" : "text-red-500"
        } absolute top-10 left-1/2 `}
        icon={faHeart}
      ></FontAwesomeIcon>
      <FontAwesomeIcon
        style={{
          rotate: "-38deg",
        }}
        className={`animate-pulsee text-2xl ${
          darkMode ? "text-slate-200" : "text-red-500"
        } absolute bottom-12 left-2/3 `}
        icon={faHeart}
      ></FontAwesomeIcon>
      <p className="z-10 text-2xl tracking-wider font-semibold">
        {" "}
        Delivery within 24-48 hours
      </p>
      <p className="z-10 text-sm tracking-wider">
        {" "}
        In most cases, <span className="text-purple-500">exceptions</span>{" "}
        apply.
      </p>
    </div>
  );
};

export default FreeDeliveryComp;
