import React, { Fragment, useState } from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import {logout} from "../../../actions/userAction"
import { useDispatch, useSelector } from "react-redux";
import Backdrop from "@material-ui/core/Backdrop"
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"
import ShipperIcon from "@material-ui/icons/LocalShipping"
import ReceiptIcon from '@mui/icons-material/Receipt';
import ClassIcon from '@mui/icons-material/Class';

const UserOptions = ({ user }) => {
  const [open, setOpen] = useState(false);
  const alert = useAlert();
  const {cartItems} = useSelector(state=>state.cart)

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const options = [
    {
      icon: <ListAltIcon />,
      name: "ĐƠN HÀNG",
      func: orders,
    },
    {
      icon: <PersonIcon />,
      name: "TÀI KHOẢN",
      func: account,
    },
    {
      icon: <ShoppingCartIcon style={{color: cartItems.length > 0 ? "tomato" : "unset"}}/>,
      name: `GIỎ HÀNG(${cartItems.length})`,
      func: cart,
    },
    {
      icon: <ExitToAppIcon />,
      name: "ĐĂNG XUẤT",
      func: logoutUser,
    },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon />,
      name: "BẢNG ĐIỀU KHIỂN",
      func: dashboard,
    });
  }
  if (user.role === "shipper") {
    options.unshift({
      icon: <ShipperIcon />,
      name: "QUẢN LÝ GIAO HÀNG",
      func: shipping,
    });
  }

  function shipping() {
    navigate("/shipping/orders");
  }

  if (user.role === "saler") {
    options.unshift({
      icon: <ReceiptIcon />,
      name: "ĐƠN HÀNG HỆ THỐNG",
      func: saler,
    });
  }

  function saler() {
    navigate("/saler/orders");
  }

  if (user.role === "saler") {
    options.unshift({
      icon: <ClassIcon />,
      name: "SẢN PHẨM HỆ THỐNG",
      func: salerProducts,
    });
  }

  function salerProducts() {
    navigate("/saler/products");
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }

  function orders() {
    navigate("/orders");
  }

  function account() {
    navigate("/account");
  }

  function cart() {
    navigate("/cart");
  }

  function logoutUser() {
    dispatch(logout())
    navigate("/");
    alert.success("ĐĂNG XUẤT THÀNH CÔNG");
  }

  return (
    <Fragment>
        <Backdrop open={open} style={{zIndex:"10"}}/>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        style={{zIndex: "11"}}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/Profile.png"}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen = {window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
