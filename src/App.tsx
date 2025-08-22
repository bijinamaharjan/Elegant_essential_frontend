import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/home";
import TheHeader from "./components/header";
import Search from "./pages/search/search";
import Login from "./pages/auth/login/login";
import Register from "./pages/auth/register/register";
import { Toaster } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import Footer from "./components/footer";
import CheckOut from "./pages/check-out/check-out";
import CartPage from "./pages/cart/cart";
import { useEffect } from "react";
import { cartSliceActions, loadCartState } from "./slices/cart-slice";
import ProductDetails from "./pages/product_details/product_details";
import ProductsByCategory from "./pages/products_by_category/products_by_category";
import { getLoggedInState } from "./action_creators/auth_action";
import AddBeautyProduct from "./pages/add_products/add_product";
import NotFound from "./pages/not-found/not-found";
import AdminAccountPage from "./pages/admin_account/admin_account";
import AdminProductsPage from "./pages/admin_account/admin_products_page";
import UpdateProduct from "./pages/admin_account/update_product";
import UserAccountPage from "./pages/user_account/user_account_page";
import UserOrders from "./pages/user_account/user_orders";
import OrderDetailsPage from "./pages/user_account/order_details_page";
import PaymentSuccessPage from "./pages/payment_success/payment_success";
import UserPayments from "./pages/user_account/user_payments";
import { retrieveThemeData, themeSliceActions } from "./slices/theme_slice";
import AdminOrderHistory from "./pages/admin_account/admin_order_history";
import ForgotPasswordPage from "./pages/forgot_password/forgot_password";
import ResetPasswordPage from "./pages/forgot_password/reset_password";
import ScanImage from "./pages/scan_image/scan_image";

const App: React.FC = () => {
  const themeState = useAppSelector((state) => {
    return state.theme;
  });

  const cartState = useAppSelector((state) => {
    return state.cart;
  });

  const totalItems = cartState.totalItemCount;

  const darkMode = themeState.darkMode;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const loadMyCart = () => {
      try {
        const myCartState = loadCartState();

        if (!myCartState) {
          return;
        } else {
          dispatch(
            cartSliceActions.setCart({
              items: myCartState.items,
              totalItemCount: myCartState.totalItemCount,
              totalPrice: myCartState.totalPrice,
            })
          );
        }
      } catch (e) {
        return;
      }
    };

    const loadThemeData = () => {
      try {
        const themeData = retrieveThemeData();

        if (!themeData) {
          return;
        } else {
          dispatch(themeSliceActions.setTheme(themeData));
        }
      } catch (e) {
        return;
      }
    };
    loadMyCart();
    dispatch(getLoggedInState());
    loadThemeData();
  }, [dispatch]);

  const authState = useAppSelector((state) => {
    return state.auth;
  });

  const user = authState.user;

  return (
    <div
      className={`${darkMode ? "text-white bg-zinc-950" : "text-black bg-white"
        } transition-all duration-500 ease-in-out`}
    >
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#800080",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
          },
          error: {
            duration: 3000,
          },
        }}
      />

      <TheHeader></TheHeader>
      <div className="py-4 md:py-12 w-full px-16">
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/search/:keyword" element={<Search></Search>}></Route>
          <Route path="/analyze-skin" element={<ScanImage></ScanImage>}></Route>
          {user && user.status === "user" && totalItems !== 0 && (
            <Route path="/:userId/check-out" element={<CheckOut />}></Route>
          )}
          <Route path="/my-cart" element={<CartPage />}></Route>
          <Route
            path="/product-details/:productId"
            element={<ProductDetails />}
          ></Route>
          <Route
            path="/products/:category"
            element={<ProductsByCategory />}
          ></Route>
          {user && user.status === "admin" && (
            <Route path="/add-product" element={<AddBeautyProduct />}></Route>
          )}
          {user && user.status === "admin" && (
            <Route path="/accounts/admin" element={<AdminAccountPage />}>
              <Route
                path="/accounts/admin/orders"
                element={<AdminOrderHistory />}
              ></Route>
              <Route
                path="/accounts/admin/products"
                element={<AdminProductsPage />}
              ></Route>
              <Route
                path="/accounts/admin/products/:productId/update-product"
                element={<UpdateProduct />}
              ></Route>
            </Route>
          )}
          {user && user.status === "user" && (
            <Route path="/accounts/user" element={<UserAccountPage />}>
              <Route
                path="/accounts/user/orders"
                element={<UserOrders />}
              ></Route>
              <Route
                path="/accounts/user/payments"
                element={<UserPayments />}
              ></Route>
            </Route>
          )}
          {user && (
            <Route
              path="/orders/:orderId"
              element={<OrderDetailsPage />}
            ></Route>
          )}
          <Route
            path="/order/payment-success"
            element={<PaymentSuccessPage />}
          ></Route>
          <Route
            path="/forgot-password"
            element={<ForgotPasswordPage />}
          ></Route>
          <Route path="/reset-password" element={<ResetPasswordPage />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default App;
