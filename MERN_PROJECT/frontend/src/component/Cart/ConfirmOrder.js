import React, { Fragment } from "react";
import "./ConfirmOrder.css";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { Typography } from "@material-ui/core";

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate()

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 500000 ? 0 : 20000;

  const tax = subtotal * 0.05;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;
  
  const proceedToPayment=()=>{
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    }

    sessionStorage.setItem("orderInfo", JSON.stringify(data))
    navigate("./process/payment")
    
  }

  return (
    <Fragment>
      <MetaData title="Xác nhận đơn hàng" />
      <CheckoutSteps activeStep={1} />
      <div className="confirmOrderPage">
        <div>
          <div className="confirmshippingArea">
            <Typography>THÔNG TIN GIAO HÀNG</Typography>
            <div className="confirmshippingAreaBox">
              <div>
                <p>Tên:</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Số điện thoại:</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Địa chỉ:</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>SẢN PHẨM TRONG GIỎ HÀNG</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="product" />
                    <Link to={`/product/${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X {item.price} ={" "}
                      <b>{item.price * item.quantity} (VNĐ)</b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div>
          <div className="orderSummary">
            <Typography>TÓM TẮT</Typography>
            <div>
              <div>
                <p>Tổng cộng:</p>
                <span>{subtotal} (vnđ)</span>
              </div>
              <div>
                <p>Chi phí vận chuyển:</p>
                <span>{shippingCharges} (vnđ)</span>
              </div>
              <div>
                <p>Thuế:</p>
                <span>{tax} (vnđ)</span>
              </div>
            </div>

            <div className="orderSummaryTotal">
              <p>
                <b>THÀNH TIỀN:</b>
              </p>
              <span>{totalPrice}(VNĐ)</span>
            </div>

            <button onClick={proceedToPayment}>TIẾN HÀNH THANH TOÁN</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
