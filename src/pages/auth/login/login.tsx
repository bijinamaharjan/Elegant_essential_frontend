import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import ThePulseLoader from "../../../components/pulse-loader";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useAppSelector } from "../../../hooks/hooks";
import { loginUser } from "../../../action_creators/auth_action";
import { authSliceActions } from "../../../slices/auth";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required."),
  password: Yup.string()
    .min(8, "Password must be at least 6 characters")
    .required("Password is required."),
});

type FormValues = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const initialValues = {
  email: "",
  password: "",
  rememberMe: false,
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const themeState = useAppSelector((state) => {
    return state.theme;
  });
  const darkMode = themeState.darkMode;
  const primaryColor = themeState.primaryColor;

  const handleFormSubmit = async (
    values: FormValues,
    { setSubmitting, resetForm }: FormikHelpers<any>
  ) => {
    loginUser(values.email, values.password)
      .then((data) => {
        toast.success(data.message);
        dispatch(
          authSliceActions.replaceLoggedInState({
            user: data.user,
            token: data.token,
          })
        );
        navigate("/home");
        setSubmitting(false);
      })
      .catch((e) => {
        toast.error(e.message);
      });
    setSubmitting(false);
  };

  const scrollRef = useRef(0);

  useEffect(() => {
    document.title = "Account - Elegant Essentials";
    window.scrollTo(0, scrollRef.current);
  });

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="max-w-md w-full p-6  rounded-md shadow-md flex flex-col items-start shadow-black">
        <h2 className="text-2xl font-semibold tracking-wider mb-4">
          Sign in to your account
        </h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({ errors, touched, isSubmitting, values, setFieldValue }) => (
            <Form className="w-full">
              <div className="mb-4 flex flex-col items-start gap-y-1">
                <label
                  htmlFor="email"
                  className="text font-normal tracking-wider"
                >
                  Email
                </label>
                <Field
                  placeholder="eg. pasang@gmail.com"
                  type="email"
                  id="email"
                  name="email"
                  className={`${darkMode ? "bg-zinc-900" : "bg-white"} ${
                    darkMode ? "border border-solid border-gray" : ""
                  } mt-1 px-4 pr-10 py-3 w-full rounded-md shadow-sm shadow-black`}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-purple-500 text-sm"
                />
              </div>

              <div className="mb-6 flex flex-col items-start gap-y-1">
                <label
                  htmlFor="password"
                  className="text font-normal tracking-wider"
                >
                  Password
                </label>
                <div className="w-full relative">
                  <Field
                    placeholder="eg. **********"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    className={`${darkMode ? "bg-zinc-900" : "bg-white"} ${
                      darkMode ? "border border-solid border-gray" : ""
                    } mt-1 px-4 pr-10 py-3 w-full rounded-md shadow-sm shadow-black`}
                  />
                  <FontAwesomeIcon
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    className="absolute right-3 top-5"
                    icon={showPassword ? faEyeSlash : faEye}
                  ></FontAwesomeIcon>
                </div>

                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-purple-500 text-sm"
                />
              </div>

              <div className="mb-4 flex flex-col items-start">
                <label className="flex items-center relative">
                  <Field
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    className="mr-3 h-7 w-7 appearance-none checked:bg-purple-500 checked:border-white border border-solid"
                  />
                  <span className="text tracking-wider">Keep me signed in</span>
                  {values.rememberMe && (
                    <span className="absolute left-1.5 top-0.5 ">
                      <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                    </span>
                  )}
                </label>
              </div>

              <button
                type="submit"
                className="bg-purple-500 w-full text-white p-2 rounded-lg hover:bg-purple-600 focus:outline-none focus:shadow-outline-blue"
              >
                {isSubmitting ? <ThePulseLoader color="white"></ThePulseLoader> : "Sign In"}
              </button>
            </Form>
          )}
        </Formik>
        <p
          onClick={() => {
            navigate("/forgot-password");
          }}
          className="cursor-pointer text-sm my-5 text-zinc-600 tracking-wider hover:underline hover:decoration-1"
        >
          {" "}
          Forgot your password?
        </p>

        <div className="mt-4 flex flex-row w-full justify-center">
          <p className="text-sm">
            Create a new account?{" "}
            <a href="/register" className="text-purple-500">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
