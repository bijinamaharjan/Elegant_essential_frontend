import React, { useEffect, useRef } from "react";
import { NavLink, Outlet} from "react-router-dom";

const UserAccountPage: React.FC = () => {
  const scrollRef = useRef(0);

  useEffect(() => {
    window.scrollTo(0, scrollRef.current);
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-full">
      <div className="w-full md:w-2/5 lg:1/5 ">
        <nav className="flex flex-row justify-center md:flex-col sticky top-44 w-full">
          <NavLink
            to="/accounts/user/orders"
            className={(navData) =>
              navData.isActive
                ? "text-start w-full inline-block px-12 py-5 transition-all duration-300 ease-in-out  hover:underline hover:decoration-1 decoration-1 underline "
                : "text-start w-full inline-block px-12 py-5 transition-all duration-300 ease-in-out hover:underline hover:decoration-1 "
            }
            onClick={() => {}}
          >
            Order History
          </NavLink>
          <NavLink
            to="/accounts/user/payments"
            className={(navData) =>
              navData.isActive
                ? "text-start w-full inline-block px-12 py-5 transition-all duration-300 ease-in-out  hover:underline hover:decoration-1 decoration-1 underline "
                : "text-start w-full inline-block px-12 py-5 transition-all duration-300 ease-in-out hover:underline hover:decoration-1 "
            }
            onClick={() => {}}
          >
            Payments
          </NavLink>
          {/* <p
            className={
              "hover: cursor-pointer text-start w-full inline-block px-12 py-5   transition-all duration-300 ease-in-out  hover:underline hover:decoration-1 "
            }
            onClick={() => {
              dispatch(logOut());
              navigate("/home");
            }}
          >
            Log Out
          </p> */}
        </nav>
      </div>

      <div className="w-full">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default UserAccountPage;
