import {
  faBagShopping,
  faHome,
  faList,
  faMoon,
  faPlus,
  faSignOut,
  faSun,
  faTable,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { logOut } from "../action_creators/auth_action";
import { themeSliceActions } from "../slices/theme_slice";

const Sidebar: React.FC<{ isOpen: boolean; toggleSidebar: () => void, }> = ({
  isOpen,
  toggleSidebar,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const authState = useAppSelector((state) => {
    return state.auth;
  });

  const user = authState.user;

  const themeState = useAppSelector((state) => {
    return state.theme;
  });
  const darkMode = themeState.darkMode;

  return (
    <div
      className={`fixed md:hidden ${
        darkMode ? "bg-zinc-900 text-white " : "bg-slate-100 text-black"
      } z-20 overflow-y-auto overflow-hidden h-full w-2/3 md:w-1/3  top-0 left-0 transition-transform duration-1000 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="absolute bottom-5 left-5 flex flex-row items-center gap-x-4">
        <p className="font-mono tracking-wider">
          {" "}
          {darkMode ? "Dark Mode" : "Light Mode"}{" "}
        </p>
        <FontAwesomeIcon
          className="cursor-pointer  text-lg"
          onClick={() => {
            dispatch(themeSliceActions.toggleDarkMode());
          }}
          icon={darkMode ? faSun : faMoon}
        ></FontAwesomeIcon>
      </div>
      <div className="flex flex-col items-start justify-start py-10 gap-y-3 w-full">
        <div className="flex flex-row items-center gap-x-3 mb-8 px-10">
          <p
            onClick={() => {
              navigate("/home");
            }}
            style={{
              textShadow: "2px 2px purple",
            }}
            className="font-semibold text-xl tracking-wider cursor-pointer"
          >
            {" "}
            ELEGANTESSENTIALS
          </p>
        </div>
        {user && user.status === "admin" && (
          <div
            onClick={() => {
              toggleSidebar();
            }}
            className="flex flex-row items-center gap-x-6 hover:bg-purple-700 transition-all duration-700 ease-in w-full px-10 py-3 cursor-pointer"
          >
            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
            <Link
              to="/add-product"
              className="font-semibold tracking-wider text-lg"
            >
              Add Product
            </Link>
          </div>
        )}
        <div
          onClick={() => {
            toggleSidebar();
          }}
          className="flex flex-row items-center gap-x-6 hover:bg-purple-700 transition-all duration-700 ease-in w-full px-10 py-3 cursor-pointer"
        >
          <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
          <Link
            to="/products/Skincare"
            className="font-semibold tracking-wider text-lg"
          >
            Category
          </Link>
        </div>
        {user && user.status === "user" && (
          <div
            onClick={() => {
              toggleSidebar();
            }}
            className="flex flex-row items-center gap-x-6 hover:bg-purple-700 transition-all duration-700 ease-in w-full px-10 py-3 cursor-pointer"
          >
            <FontAwesomeIcon icon={faTable}></FontAwesomeIcon>
            <Link
              to="/accounts/user/orders"
              className="font-semibold tracking-wider text-lg"
            >
              My Orders
            </Link>
          </div>
        )}
        {user && user.status === "user" && (
          <div
            onClick={() => {
              toggleSidebar();
            }}
            className="flex flex-row items-center gap-x-6 hover:bg-purple-700 transition-all duration-700 ease-in w-full px-10 py-3 cursor-pointer"
          >
            <FontAwesomeIcon icon={faWallet}></FontAwesomeIcon>
            <Link
              to="/accounts/user/payments"
              className="font-semibold tracking-wider text-lg"
            >
              My Payments
            </Link>
          </div>
        )}
        {user && user.status === "user" && (
          <div
            onClick={() => {
              toggleSidebar();
            }}
            className="flex flex-row items-center gap-x-6 hover:bg-purple-700 transition-all duration-700 ease-in w-full px-10 py-3 cursor-pointer"
          >
            <FontAwesomeIcon icon={faBagShopping}></FontAwesomeIcon>
            <Link
              to="/my-cart"
              className="font-semibold tracking-wider text-lg"
            >
              My Cart
            </Link>
          </div>
        )}
        {user && user.status === "admin" && (
          <div
            onClick={() => {
              toggleSidebar();
            }}
            className="flex flex-row items-center gap-x-6 hover:bg-purple-700 transition-all duration-700 ease-in w-full px-10 py-3 cursor-pointer"
          >
            <FontAwesomeIcon icon={faTable}></FontAwesomeIcon>
            <Link
              to="/accounts/admin/orders"
              className="font-semibold tracking-wider text-lg"
            >
              Order History
            </Link>
          </div>
        )}
        {user && user.status === "admin" && (
          <div
            onClick={() => {
              toggleSidebar();
            }}
            className="flex flex-row items-center gap-x-6 hover:bg-purple-700 transition-all duration-700 ease-in w-full px-10 py-3 cursor-pointer"
          >
            <FontAwesomeIcon icon={faList}></FontAwesomeIcon>
            <Link
              to="/accounts/admin/products"
              className="font-semibold tracking-wider text-lg"
            >
              Inventory
            </Link>
          </div>
        )}
        {user && (
          <div
            onClick={async () => {
              toggleSidebar();
              dispatch(logOut());
              toggleSidebar();
              navigate("/home");
            }}
            className="flex flex-row items-center gap-x-6 hover:bg-purple-700 transition-all duration-700 ease-in w-full px-10 py-3 cursor-pointer"
          >
            <FontAwesomeIcon icon={faSignOut}></FontAwesomeIcon>
            <div className="font-semibold tracking-wider text-lg">Log Out</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
