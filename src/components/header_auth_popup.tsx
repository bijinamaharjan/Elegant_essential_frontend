import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import LoginPopup from "./login_pop_up";
import RegisterPopup from "./register_pop_up";
import { logOut } from "../action_creators/auth_action";
import { useNavigate } from "react-router-dom";

const HeaderAuthPopUp: React.FC<{
  show: boolean;
  setShow: () => void;
}> = (props) => {
  const themeState = useAppSelector((state) => {
    return state.theme;
  });

  const darkMode = themeState.darkMode;

  const [showPopupType, setShowLoginPopup] = useState<string>("login");

  const toggleLoginPopupType = (type: string) => {
    setShowLoginPopup(type);
  };

  const authState = useAppSelector((state) => {
    return state.auth;
  });

  const user = authState.user;

  useEffect(() => {
    if (user) {
      setShowLoginPopup("loggedIn");
    } else {
      setShowLoginPopup("login");
    }
  }, [user]);

  return (
    <div
      style={{
        transition: "all 0.6s ease",
        height: props.show
          ? showPopupType === "login"
            ? "300px"
            : showPopupType === "loggedIn"
            ? "170px"
            : "390px"
          : "0px",
      }}
      className={`$ ${props.show ? "py-5" : "py-0"} ${
        darkMode ? "bg-zinc-800 text-white" : "bg-slate-100 text-black"
      } z-30 overflow-hidden  w-80 flex flex-col gap-y-3 justify-start items-start   absolute top-16 -right-10 shadow-md shadow-black  px-5  rounded-md transition-all duration-200 ease-in-out`}
    >
      {showPopupType === "login" && (
        <LoginPopup
          toggleLoginPopup={toggleLoginPopupType}
          setShow={props.setShow}
        ></LoginPopup>
      )}
      {showPopupType === "register" && (
        <RegisterPopup
          toggleLoginPopup={toggleLoginPopupType}
          setShow={props.setShow}
        ></RegisterPopup>
      )}
      {showPopupType === "loggedIn" && (
        <LoggedInPopup setShow={props.setShow}></LoggedInPopup>
      )}
    </div>
  );
};

export default HeaderAuthPopUp;

const LoggedInPopup: React.FC<{ setShow: () => void }> = (props) => {
  const themeState = useAppSelector((state) => {
    return state.theme;
  });

  const darkMode = themeState.darkMode;

  const authState = useAppSelector((state) => {
    return state.auth;
  });

  const dispatch = useAppDispatch();

  const user = authState.user;

  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full gap-y-3">
      {user && <p> {user.username} </p>}
      <p
        className="text-lg text-purple-600 cursor-pointer"
        onClick={() => {
          props.setShow();
          if (user && user.status === "admin") {
            navigate("/accounts/admin/orders");
          } else {
            navigate(`/accounts/user/orders`);
          }
        }}
      >
        {" "}
        Account
      </p>
      <div className="relative w-full mt-3">
        <button
          className={` w-full rounded-xl bg-gray-300 text-gray-300 px-4 py-2 font-semibold tracking-wider transition-all ease-in-out `}
        >
          {" "}
          Log Out
        </button>
        <button
          onClick={() => {
            dispatch(logOut());
            props.setShow();
            navigate("/home");
          }}
          className={`diagonal-translate w-full absolute rounded-xl -top-2 -left-2 font-semibold tracking-wider  ${
            darkMode ? "bg-purple-500 text-white" : "bg-black text-white"
          }  px-4 py-2 transition-all ease-in-out rounded-sm`}
        >
          {" "}
          Log Out
        </button>
      </div>
    </div>
  );
};
