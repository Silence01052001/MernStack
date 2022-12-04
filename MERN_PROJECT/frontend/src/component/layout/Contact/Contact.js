import React from "react";
import "./Contact.css";
import { Button } from "@material-ui/core";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:vanthinh01052001@gmail.com">
        <Button>Liên hệ gmail: vanthinh01052001@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;