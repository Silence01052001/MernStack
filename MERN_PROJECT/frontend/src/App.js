import "./App.css";
import Header from "./component/layout/Header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import React, { useState, useEffect } from "react";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from "axios";
import Payment from "./component/Cart/Payment.js";
import CashPayment from "./component/Cart/CashPayment.js";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Cart/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import OrderList from "./component/Admin/OrderList.js";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import UsersList from "./component/Admin/UsersList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ProductReviews from "./component/Admin/ProductReviews.js";
import About from "./component/layout/About/About";
import Contact from "./component/layout/Contact/Contact";
import LoginAdmin from "./component/Admin/LoginAdmin.js";
import NotFound from "./component/layout/NotFound/NotFound";
import ShippingOrderDetails from "./component/Admin/ShippingOrderDetails";
import OrderListShipping from "./component/Admin/OrderListShipping.js";
import OrderListSaler from "./component/Admin/OrderListSaler.js";
import SalerOrderDetails from "./component/Admin/SalerOrderDetails.js";
import SalerAllProducts from "./component/Admin/SalerAllProducts.js";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/NotFound" element={<NotFound />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route exact path="/search" element={<Search />} />
        <Route
          exact
          path="/account"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} user={user}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route exact path="/admin/login" element={<LoginAdmin />} />
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route
          exact
          path="/me/update"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UpdateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/password/update"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UpdatePassword />
            </ProtectedRoute>
          }
        />
        <Route exact path="/password/forgot" element={<ForgotPassword />} />
        <Route
          exact
          path="/password/reset/:token"
          element={<ResetPassword />}
        />
        <Route
          exact
          path="/login/shipping"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Shipping />
            </ProtectedRoute>
          }
        />
        <Route exact path="/cart" element={<Cart />} />
        <Route
          exact
          path="/order/confirm"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ConfirmOrder />
            </ProtectedRoute>
          }
        />

        {stripeApiKey ? (
          <Route
            exact
            path="/order/confirm/process/payment"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Payment />
                </ProtectedRoute>
              </Elements>
            }
          />
        ) : (
          <Route
            exact
            path="/order/confirm/process/payment"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <CashPayment />
              </ProtectedRoute>
            }
          />
        )}

        <Route
          exact
          path="/order/confirm/process/payment/success"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <OrderSuccess />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/orders"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <MyOrders />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/order/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <OrderDetails />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} user={user}>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/admin/products"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ProductList />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/saler/products"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <SalerAllProducts />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/product"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <NewProduct />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/admin/product/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UpdateProduct />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/admin/orders"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <OrderList />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/shipping/orders"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <OrderListShipping />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/saler/orders"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <OrderListSaler />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/admin/order/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ProcessOrder />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/shipping/order/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ShippingOrderDetails />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/saler/order/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <SalerOrderDetails />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/admin/users"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UsersList />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/admin/user/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <UpdateUser />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/admin/reviews"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ProductReviews />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
