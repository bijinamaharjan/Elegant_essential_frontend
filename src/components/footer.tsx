import {
  faFacebookF,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-zinc-900 shawdow px-10 lg:px-0 sm:w-full  flex flex-col gap-y-7 lg:flex-row lg:justify-around py-20 md:py-10">
      {/* first */}
      <div className=" flex flex-col justify-start text-start">
        <h2 className="text-white font-semibold"> Elegant Essentials</h2>
        <p className=" text-xs  text-white">
          Copyright @2024,{" "}
          <span className="text-purple-400 font-semibold">Elegant Essentials</span>.
          All rights reserved.
        </p>
        <div className="mt-4 cursor-pointer">
          <a href="" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon
              icon={faFacebookF}
              className="border-2 border-white px-3.5 py-2 rounded-sm hover:text-blue-500 hover:border-blue-500 text-white"
              style={{}}
            />
          </a>

          <a href="" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon
              icon={faInstagram}
              className="border-2 border-white ml-2 px-3 py-2 rounded-sm hover:text-red-600 hover:border-red-600 text-white"
              style={{}}
            />
          </a>
          <a href="" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon
              icon={faLinkedin}
              className="border-2 border-white ml-2 px-3 py-2 rounded-sm  hover:border-blue-500 hover:text-blue-500 text-white"
              style={{}}
            />
          </a>
        </div>
      </div>
      <div className="flex flex-col justify-start items-start text-white gap-y-3 pt-5 md:pt-0">
        <div className="pb-4 flex flex-col">
          <p className="font-semibold text-lg "> Quick Links </p>
          <div className="h-0.5 w-9 bg-white mt-1"></div>
        </div>
        <p
          onClick={() => {
            navigate("/home");
          }}
          className=" transition-all hover:underline cursor-pointer hover:text-gray-400"
        >
          Home
        </p>
        <p
          onClick={() => {
            navigate("/login");
          }}
          className=" transition-all hover:underline cursor-pointer hover:text-gray-400"
        >
          {" "}
          Sign In{" "}
        </p>
        <p
          onClick={() => {
            navigate("/register");
          }}
          className=" transition-all hover:underline cursor-pointer hover:text-gray-400"
        >
          {" "}
          Register
        </p>
      </div>

      <div className="flex flex-col justify-start items-start text-white gap-y-3 pt-5 md:pt-0">
        <div className="pb-4 flex flex-col">
          <p className="font-semibold text-lg "> Our Services </p>
          <div className="h-0.5 w-9 bg-white mt-1"></div>
        </div>
        <p
          onClick={() => {
            navigate("");
          }}
          className=" transition-all hover:underline cursor-pointer hover:text-gray-400"
        >
          Expert Advice
        </p>
        <p
          onClick={() => {
            navigate("");
          }}
          className=" transition-all hover:underline cursor-pointer hover:text-gray-400"
        >
          {" "}
          Fast Shipping
        </p>
        <p
          onClick={() => {
            navigate("");
          }}
          className=" transition-all hover:underline cursor-pointer hover:text-gray-400"
        >
          {" "}
          Personalized Recommendations
        </p>
        <p
          onClick={() => {
            navigate("");
          }}
          className=" transition-all hover:underline cursor-pointer hover:text-gray-400"
        >
          {" "}
          Quality Products
        </p>

        <p
          onClick={() => {
            navigate("");
          }}
          className=" transition-all hover:underline cursor-pointer hover:text-gray-400"
        >
          {" "}
          Beauty Blog
        </p>
        <p
          onClick={() => {
            navigate("");
          }}
          className=" transition-all hover:underline cursor-pointer hover:text-gray-400"
        >
          {" "}
          Skincare Solutions
        </p>
      </div>

      <div className="flex flex-col justify-start items-start text-white gap-y-3 pt-5 md:pt-0">
        <div className="pb-4 flex flex-col">
          <p className="font-semibold text-lg "> Work with us </p>
          <div className="h-0.5 w-9 bg-white mt-1"></div>
        </div>

        <p
          onClick={() => {
            navigate("");
          }}
          className=" transition-all hover:underline cursor-pointer hover:text-gray-400"
        >
          {" "}
          Careers{" "}
        </p>
        <p
          onClick={() => {
            navigate("");
          }}
          className=" transition-all hover:underline cursor-pointer hover:text-gray-400"
        >
          {" "}
          Internships
        </p>
      </div>
    </div>
  );
};

export default Footer;
