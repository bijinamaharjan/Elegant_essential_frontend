import React, { useEffect, useRef } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const AdminAccountPage: React.FC = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(0);

  useEffect(() => {
    window.scrollTo(0, scrollRef.current);
  }, []);
  return (
    <div className="flex flex-col md:flex-row w-full ">
      <div className="w-full md:w-2/5 lg:1/5 flex-row md:flex-col">
        <div
          onClick={() => {
            navigate("/add-product");
          }}
          className="text-white hidden font-semibold tracking-wider mb-5 hover:cursor-pointer md:flex flex-row justify-center items-center px-4 py-2 bg-purple-500 text-center mr-5 rounded-md hover:bg-purple-700 transition-all duration-300 ease-in-out"
        >
          <p> Add Product </p>
        </div>
        <nav className="flex flex-row md:flex-col ">
          <NavLink
            to="/accounts/admin/orders"
            className={(navData) =>
              navData.isActive
                ? "text-start w-full inline-block px-12 py-5   transition-all duration-300 ease-in-out  hover:underline hover:decoration-1 decoration-1 underline "
                : "text-start w-full inline-block px-12 py-5   transition-all duration-300 ease-in-out   "
            }
            onClick={() => {}}
          >
            Order History
          </NavLink>
          <NavLink
            to="/accounts/admin/products?keyword=''"
            className={(navData) =>
              navData.isActive
                ? "text-start w-full inline-block px-12 py-5   transition-all duration-300 ease-in-out  hover:underline hover:decoration-1 decoration-1 underline"
                : "text-start w-full inline-block px-12 py-5   transition-all duration-300 ease-in-out  "
            }
            onClick={() => {}}
          >
            Products
          </NavLink>
        </nav>
      </div>

      <div className="w-full">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default AdminAccountPage;
