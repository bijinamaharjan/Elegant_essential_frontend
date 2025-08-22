import { useState } from "react";
import { loginUser } from "../action_creators/auth_action";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import toast from "react-hot-toast";
import { authSliceActions } from "../slices/auth";
import { useNavigate } from "react-router-dom";

const LoginPopup: React.FC<{
  toggleLoginPopup: (type: string) => void;
  setShow: () => void;
}> = (props) => {
  const themeState = useAppSelector((state) => {
    return state.theme;
  });

  const darkMode = themeState.darkMode;
  const errorTextColor = themeState.errorTextColor;

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const signInuser = () => {
    console.log("signIn");
    if (email.length === 0 || password.length === 0) {
      toast.error("Fill in the fields");
      return;
    }
    loginUser(email, password)
      .then((data) => {
        toast.success(data.message);
        dispatch(
          authSliceActions.replaceLoggedInState({
            user: data.user,
            token: data.token,
          })
        );
        props.setShow();

        navigate("/home");
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  return (
    <div className="w-full flex flex-col gap-y-3 justify-start items-start  ">
      <p className="font-semibold tracking-wider"> Login </p>
      <input
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Email"
        className={`px-2 py-1.5 rounded-2xl w-full shadow-sm shadow-black placeholder-gray-500 ${
          darkMode
            ? "bg-zinc-800 border border-solid border-gray-400"
            : "bg-white"
        }`}
      />
      <input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type="password"
        placeholder="Password"
        className={`px-2 py-1.5 rounded-2xl w-full shadow-sm shadow-black placeholder-gray-500 ${
          darkMode
            ? "bg-zinc-800 border border-solid border-gray-400"
            : "bg-white"
        }`}
      />
      <div onClick={signInuser} className="relative w-full mt-3">
        <button
          className={` w-full rounded-xl bg-gray-300 text-gray-300 px-4 py-2 font-semibold tracking-wider transition-all ease-in-out `}
        >
          {" "}
          Login
        </button>
        <button
          className={`diagonal-translate w-full absolute rounded-xl text-white -top-2 -left-2 font-semibold tracking-wider  ${
            darkMode ? "bg-purple-500" : "bg-black"
          }  px-4 py-2 transition-all ease-in-out rounded-sm`}
        >
          {" "}
          Login
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
          props.toggleLoginPopup("register");
        }}
        className="text-sm hover:underline hover:decoration-1 w-full text-center cursor-pointer"
      >
        {" "}
        Create Account
      </p>
    </div>
  );
};

export default LoginPopup;
