import React, { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../hooks/hooks";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import ThePulseLoader from "../../components/pulse-loader";

const ForgotPasswordPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const themeState = useAppSelector((state) => {
    return state.theme;
  });
  const darkMode = themeState.darkMode;

  const handleSubmit = async (values: { email: string }) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/auth/initiate-reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
          }),
        }
      );
      const jsonData = await response.json();
      console.log(jsonData);
      if (response.status === 200) {
        navigate("/home");
        toast.success(
          "An email with instructions to reset your password has been sent."
        );
      } else {
        // console.log('jsonData', jsonData);
        toast.error(jsonData.message);
      }
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollRef = useRef(0);

  useEffect(() => {
    window.scrollTo(0, scrollRef.current);
  }, []);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: handleSubmit,
  });

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div
        className={` ${
          darkMode
            ? "bg-zinc-900 text-white shadow-gray-500"
            : "bg-white text-black shadow-black"
        } w-full max-w-md space-y-3 px-6 py-9 rounded-sm shadow-sm`}
      >
        <h2 className="mt-6 text-center text-3xl font-semibold tracking-wider font-mono">
          Forgot Password
        </h2>
        <p className="text-sm text-center mt-1">
          {" "}
          Enter your email address and we'll send you a link to reset your
          password.
        </p>
        <form onSubmit={formik.handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="flex flex-col">
              <p className="text-sm mb-2.5"> Email </p>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`${
                  darkMode ? "bg-zinc-800 focus:bg-zinc-800" : "bg-white"
                } appearance-none rounded-lg  relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : ""
                }`}
                placeholder="Email address"
              />
              {formik.touched.email && formik.errors.email ? (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              ) : null}
            </div>
          </div>

          <div className="header-image-first relative w-full mt-7">
            <button
              type="submit"
              className={`w-full rounded-xl bg-gray-300 text-gray-300 px-5 py-3 font-semibold tracking-wider transition-all ease-in-out `}
              disabled={isLoading}
            >
              Submit Email
            </button>
            <button
              className={`text-white button diagonal-translate w-full absolute rounded-xl  font-semibold tracking-wider  ${
                darkMode ? "bg-purple-500 " : "bg-black "
              }  px-5 py-3 transition-all ease-in-out rounded-sm`}
            >
              <p className="button-content ">
                {isLoading ? <ThePulseLoader color="white" /> : "Submit Email"}
              </p>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
