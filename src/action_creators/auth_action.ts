import { NewUser } from "../models/new_user";
import { authSliceActions } from "../slices/auth";
import { cartSliceActions } from "../slices/cart-slice";
import { AppDispatch } from "../store";

export const registerUser = async (newUser: NewUser) => {
  const url = "http://localhost:8080/auth/signup";

  const formData = new FormData();

  formData.append("username", newUser.username);
  formData.append("email", newUser.email);
  formData.append("password", newUser.password);
  formData.append("profileImage", newUser.image);
  formData.append("status", newUser.role);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const jsonData = await response.json();

    if (response.status === 201) {
      localStorage.setItem("token", jsonData.token);
      localStorage.setItem("user", JSON.stringify(jsonData.user));
      return jsonData;
    } else {
      throw new Error(jsonData.message);
    }
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const loginUser = async (email: string, password: string) => {
  const url = "http://localhost:8080/auth/login";
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.status);
    const jsonData = await response.json();
    console.log(jsonData);

    if (response.status === 200) {
     
      localStorage.setItem("token", jsonData.token);
      localStorage.setItem("user", JSON.stringify(jsonData.user));
      console.log("tada");
      return jsonData;
    } else {
      throw new Error(jsonData.message);
    }
  } catch (e: any) {
    throw new Error(e.message);
  }
};

export const logOut = () => {
  return (dispatch: AppDispatch) => {
    localStorage.clear();
    dispatch(
      authSliceActions.replaceLoggedInState({ user: null, token: null })
    );
    dispatch(cartSliceActions.clearCart());
  };
};

export const getLoggedInState = () => {
  return (dispatch: AppDispatch) => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");


    if (userData) {
      const user = JSON.parse(userData);
      if (!token) {
        dispatch(
          authSliceActions.replaceLoggedInState({
            user: null,
            token: null,
          })
        );
      } else {
        dispatch(
          authSliceActions.replaceLoggedInState({
            user: user,
            token: token,
          })
        );
      }
    }
  };
};
