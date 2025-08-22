import React, { useState } from "react";
import { useAppSelector } from "../../hooks/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ResetPasswordPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const token = searchParams.get("token");

  const handleSubmit = async () => {
    if (!password || !confirmPassword) {
      setMessage("Please fill in both password fields.");
      return;
    }
    if (password.length < 8 || confirmPassword.length < 8) {
      setMessage("Password must be at least 8 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    setMessage("");
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/auth/reset-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            newPassword: password,
          }),
        }
      );
      const jsonData = await response.json();
      console.log(jsonData);
      if (response.status === 200) {
        navigate("/login");
        toast.success("Password changed successfully.");
      } else {
        throw new Error(jsonData.message);
      }
    } catch (e: any) {
      if (e.message === "jwt expired") {
        toast.error("Token validation failed.");
        return;
      }
      toast.error(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  const themeState = useAppSelector((state) => {
    return state.theme;
  });
  const darkMode = themeState.darkMode;

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div
        className={`${
          darkMode
            ? "bg-zinc-900 text-white shadow-slate-500"
            : "bg-white text-black shadow-black"
        } w-full max-w-md space-y-3 px-6 py-9 rounded-sm shadow-sm`}
      >
        <div className="">
          <h2 className="text-center text-3xl font-semibold font-mono tracking-wider">
            Reset Password
          </h2>
        </div>
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                value={password}
                onChange={handlePasswordChange}
                className={`${
                  darkMode ? "bg-zinc-800 focus:bg-zinc-800" : "bg-white"
                } appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pr-10`}
                placeholder="Password"
              />
              <FontAwesomeIcon
                onClick={() => setShowPassword((prev) => !prev)}
                className="z-10 absolute right-3 top-4 flex items-center text-gray-400"
                icon={showPassword ? faEyeSlash : faEye}
              />
            </div>
          </div>
          <div>
            <label htmlFor="confirm-password" className="sr-only">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirm-password"
                name="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className={`mt-3 ${
                  darkMode ? "bg-zinc-800 focus:bg-zinc-800" : "bg-white"
                } appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm pr-10`}
                placeholder="Confirm Password"
              />

              <FontAwesomeIcon
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="z-10 absolute right-3 top-4 flex items-center text-gray-400"
                icon={showConfirmPassword ? faEyeSlash : faEye}
              />
            </div>
          </div>
        </div>

        <div
          onClick={() => {
            handleSubmit();
          }}
          className="header-image-first relative w-full mt-7"
        >
          <button
            type="submit"
            className={`w-full rounded-xl bg-gray-300 text-gray-300 px-5 py-3 font-semibold tracking-wider transition-all ease-in-out `}
          >
            Reset Password
          </button>
          <button
            className={`text-white button diagonal-translate w-full absolute rounded-xl  font-semibold tracking-wider  ${
              darkMode ? "bg-purple-500 " : "bg-black "
            }  px-5 py-3 transition-all ease-in-out rounded-sm`}
          >
            <p className="button-content ">Reset Password</p>
          </button>
        </div>
        {message && (
          <p className="text-center mt-3 text-red-600 tracking-wider font-semibold">
            {" "}
            {message}{" "}
          </p>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
