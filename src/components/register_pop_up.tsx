import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { registerUser } from "../action_creators/auth_action";
import { NewUser } from "../models/new_user";
import toast from "react-hot-toast";
import { authSliceActions } from "../slices/auth";
import { useNavigate } from "react-router-dom";

const RegisterPopup: React.FC<{
  toggleLoginPopup: (type: string) => void;
  setShow: () => void;
}> = (props) => {
  const themeState = useAppSelector((state) => {
    return state.theme;
  });

  const darkMode = themeState.darkMode;
  const errorTextColor = themeState.errorTextColor;

  // State for username, email, password, and selected image
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  // Handler functions for input changes
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // Handler function for image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signupuser = () => {
    if (
      !selectedImage ||
      email.length === 0 ||
      password.length === 0 ||
      username.length === 0
    ) {
      toast.error("Fill in all the fields.");
      return;
    }
    let newUser = new NewUser(
      email,
      username,
      password,
      selectedImage!,
      "user"
    );
    registerUser(newUser)
      .then((data) => {
        toast.success(data.message);
        dispatch(
          authSliceActions.replaceLoggedInState({
            user: data.user,
            token: data.token,
          })
        );
        navigate("/home");
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  return (
    <div className="w-full flex flex-col gap-y-3 justify-start items-start  ">
      <p className="font-semibold tracking-wider"> Register </p>
      <input
        onChange={handleUsernameChange}
        value={username}
        placeholder="Username"
        className={`px-2 py-1.5 rounded-2xl w-full shadow-sm shadow-black placeholder-gray-500 ${
          darkMode
            ? "bg-zinc-800 border border-solid border-gray-400"
            : "bg-white"
        }`}
      />
      <input
        onChange={handleEmailChange}
        value={email}
        placeholder="Email"
        className={`px-2 py-1.5 rounded-2xl w-full shadow-sm shadow-black placeholder-gray-500 ${
          darkMode
            ? "bg-zinc-800 border border-solid border-gray-400"
            : "bg-white"
        }`}
      />
      <input
        onChange={handlePasswordChange}
        value={password}
        placeholder="Password"
        type="password"
        className={`px-2 py-1.5 rounded-2xl w-full shadow-sm shadow-black placeholder-gray-500 ${
          darkMode
            ? "bg-zinc-800 border border-solid border-gray-400"
            : "bg-white"
        }`}
      />
      {/* Input for selecting a single image */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className={`px-2 py-1.5 rounded-2xl w-full shadow-sm shadow-black placeholder-gray-500 ${
          darkMode
            ? "bg-zinc-800 border border-solid border-gray-400"
            : "bg-white"
        }`}
      />
      <div onClick={signupuser} className="relative w-full mt-3">
        <button
          className={` w-full rounded-xl bg-gray-300 text-gray-300 px-4 py-2 font-semibold tracking-wider transition-all ease-in-out `}
        >
          {" "}
          Register
        </button>
        <button
          className={`text-white diagonal-translate w-full absolute rounded-xl -top-2 -left-2 font-semibold tracking-wider  ${
            darkMode ? "bg-purple-500" : "bg-black"
          }  px-4 py-2 transition-all ease-in-out rounded-sm`}
        >
          {" "}
          Register
        </button>
      </div>
      <p
        onClick={() => {
          navigate("/forgot-password");
          props.setShow();
        }}
        className="text-sm hover:underline hover:decoration-1 w-full text-center cursor-pointer"
      >
        {" "}
        Forgot your password ?
      </p>
      <p
        onClick={() => {
          props.toggleLoginPopup("login");
        }}
        className="text-sm  w-full text-center cursor-pointer"
      >
        {" "}
        Already have an account?{" "}
        <span className="underline decoration-1">Login</span>
      </p>
    </div>
  );
};

export default RegisterPopup;
