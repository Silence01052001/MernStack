import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo1.png";
import { MdAccountBox, MdShoppingBag, MdOutlineSearch } from "react-icons/md";

const options = {
  logo,
  burgerColor: "crimson",
  navColor1: "#fff5f5",
  burgerColorHover: "#900",
  logoWidth: "100%",
  logoHoverColor: "crimson",
  link1Size: "1.2rem",
  link1Color: "#121212",
  link1Padding: "1vmax",
  link1ColorHover: "crimson",
  nav1justifyContent: "flex-start",
  nav2justifyContent: "flex-start",
  nav3justifyContent: "flex-end",
  nav4justifyContent: "flex-start",
  link1Margin: "1vmax",
  link2Margin: "1vmax",
  link3Margin: "1vmax",
  link4Margin: "1vmax",
  link1Text: "Trang chủ",
  link2Text: "Sản phẩm",
  link3Text: "Giới thiệu",
  link4Text: "Liên hệ",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/about",
  link4Url: "/contact",
  profileIconUrl: "/login",
  searchIconMargin: "0.5vmax",
  cartIconMargin: "1vmax",
  profileIconMargin: "0.5vmax",
  searchIconColor: "#121212",
  cartIconColor: "#121212",
  profileIconColor: "#121212",
  searchIconColorHover: "crimson",
  cartIconColorHover: "crimson",
  profileIconColorHover: "crimson",
};

const Header = () => {
  return <ReactNavbar {...options} 
  
   profileIcon= {true}
   ProfileIconElement= { MdAccountBox }
   profileIconSize= "3vmax"
   searchIcon= {true}
   SearchIconElement= { MdOutlineSearch }
   searchIconSize= "3vmax"
   cartIcon= {true}
   CartIconElement= { MdShoppingBag }
   cartIconSize= "3vmax"
   />;
};

export default Header;
