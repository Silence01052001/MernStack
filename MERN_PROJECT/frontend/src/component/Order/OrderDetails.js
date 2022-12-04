import React, { Fragment, useEffect, useState } from "react";
import "./OrderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getOrderDetails, clearErrors, updateOrderUser } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";

const OrderDetails = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const alert = useAlert();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrderUser(id, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Chi tiết đơn hàng" />
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                MÃ ĐƠN HÀNG #{order && order._id}
              </Typography>
              <Typography>THÔNG TIN GIAO HÀNG: </Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Tên:</p>
                  <span>{order.user && order.user.name}</span>
                </div>
                <div>
                  <p>Số điện thoại:</p>
                  <span>
                    {order.shippingInfo && order.shippingInfo.phoneNo}
                  </span>
                </div>

                <div>
                  <p>Địa chỉ:</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                  </span>
                </div>
              </div>

              <Typography>TRẠNG THÁI THANH TOÁN: </Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      // order.paymentInfo.status !== "Đặt hàng thành công" ||
                      order.orderStatus !== "Đã giao hàng"
                        ? "redColor"
                        : "greenColor"
                    }
                  >
                    {order && order.orderStatus === "Đã giao hàng"
                      ? "ĐÃ THANH TOÁN"
                      : "CHƯA THANH TOÁN"}
                  </p>
                </div>
                <div>
                  <p>Thành tiền: </p>
                  <span>{order.totalPrice && order.totalPrice} (vnđ)</span>
                </div>
              </div>

              <Typography>TRẠNG THÁI ĐƠN HÀNG: </Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus && order.orderStatus === "Đã giao hàng"
                        ? "greenColor"
                        : "redColor"
                    }
                  >
                    {order.orderStatus && order.orderStatus}
                  </p>
                </div>
              </div>
            </div>

            <div className="orderDetailsCartItems">
              <Typography>THÔNG TIN SẢN PHẨM:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems &&
                  order.orderItems.map((item) => (
                    <div key={item.product}>
                      <img src={item.image} alt="Product" />
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                      <span>
                        {item.quantity} X {item.price} ={" "}
                        <b>{item.price * item.quantity} (VNĐ)</b>
                      </span>
                    </div>
                  ))}
              </div>

              <div
                style={{
                  display:
                    (order.orderStatus === "Đã giao hàng"
                      || order.orderStatus === "Hủy" || order.orderStatus === "Khách hàng trả hàng"
                    ) ? "none" : "block",
                }}
              >
                <form
                  className="updateOrderForm"
                  encType="multipart/form-data"
                  onSubmit={updateOrderSubmitHandler}
                >
                  <h1>XỬ LÝ</h1>

                  <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setStatus(e.target.value)}>
                      <option value="">TRẠNG THÁI MỚI</option>
                
                      {order.orderStatus === "Đang xử lý" && (
                        <option value="Hủy">Hủy</option>
                      )}
                      
                      {order.orderStatus === "Đang chờ lấy hàng" && (
                        <option value="Hủy">Hủy</option>
                      )}

                      {order.orderStatus === "Đang được vận chuyển" && (
                        <option value="Khách hàng trả hàng">Khách hàng trả hàng</option>
                      )}
                    </select>
                  </div>

                  <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    THAY ĐỔI TRẠNG THÁI
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
