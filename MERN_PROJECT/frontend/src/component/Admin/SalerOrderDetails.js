import React, { Fragment, useEffect, useState } from "react";
import "./ProcessOrder.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import {
  getOrderDetails,
  clearErrors,
  updateOrderSaler,
} from "../../actions/orderAction";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import { Button } from "@material-ui/core";
import { UPDATE_ORDERS_RESET } from "../../constants/orderConstants";

const SalerOrderDetails = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [status, setStatus] = useState("");

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrderSaler(id, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("CẬP NHẬT ĐƠN HÀNG THÀNH CÔNG");
      dispatch({ type: UPDATE_ORDERS_RESET });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, alert, error, id, isUpdated, updateError]);

  return (
    <Fragment>
      <MetaData title="Xử lý đơn hàng" />
        <div className="newProductContainer">
          {loading ? (
            <Loader />
          ) : (
            <div
              className="confirmOrderPage"
              style={{
                display:
                  order.orderStatus === "Đã giao hàng" ? "block" : "grid",
              }}
            >
              <div>
                <div className="confirmshippingArea">
                  <Typography>THÔNG TIN VẬN CHUYỂN</Typography>
                  <div className="confirmshippingAreaBox">
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
                          `${order.shippingInfo.address}, ${order.shippingInfo.city},${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                      </span>
                    </div>
                  </div>

                  <Typography>TRẠNG THÁI THANH TOÁN</Typography>
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
                      <p>Thành tiền:</p>
                      <span>{order.totalPrice && order.totalPrice} (VNĐ)</span>
                    </div>
                  </div>

                  <Typography>TRẠNG THÁI ĐƠN HÀNG</Typography>
                  <div className="orderDetailsContainerBox">
                    <div>
                      <p
                        className={
                          order.orderStatus &&
                          order.orderStatus === "Đã giao hàng"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="confirmCartItems">
                  <Typography>SẢN PHẨM TRONG GIỎ HÀNG CỦA BẠN</Typography>
                  <div className="confirmCartItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
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
                        <option value="Đang chờ lấy hàng">
                          Đang chờ lấy hàng
                        </option>
                      )}
                      {order.orderStatus === "Đang xử lý" && (
                        <option value="Hủy">Hủy</option>
                      )}

                      {order.orderStatus === "Đang chờ lấy hàng" && (
                        <option value="Đang được vận chuyển">
                          Đang được vận chuyển
                        </option>
                      )}
                      {order.orderStatus === "Đang chờ lấy hàng" && (
                        <option value="Hủy">Hủy</option>
                      )}

                      {order.orderStatus === "Đang được vận chuyển" && (
                        <option value="Đã giao hàng">Đã giao hàng</option>
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
          )}
        </div>
    </Fragment>
  );
};

export default SalerOrderDetails;
