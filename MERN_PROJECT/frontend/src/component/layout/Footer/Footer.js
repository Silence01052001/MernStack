import React from 'react';
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
        <div className="leftFooter">
            <h4>
                ĐI ĐẾN TRANG CHỦ
            </h4>
            <p>Đây là Website chuyên bán các mặt hàng UNISEX</p>
            <img src={playStore} alt="playStore" />
            <img src={appStore} alt="appStore" />
        </div>

        <div className="midFooter">
            <h1>ECOMMERCE.</h1>
            <p>High Quality is our first priority</p>

            <p>Copyrights 2022 &copy; Mai Van Thinh</p>
        </div>

        <div className="rightFooter">
            <h4>Follow Us</h4>
            <a href="www.google.com"> Instagram</a>
            <a href="www.google.com">Youtube</a>
            <a href="www.google.com">Facebook</a>
        </div>
    </footer>
  )
}

export default Footer;