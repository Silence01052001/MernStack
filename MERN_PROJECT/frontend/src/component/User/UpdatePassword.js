import React, { useState, useEffect, Fragment } from "react";
import "./UpdatePassword.css";
import Loader from "../layout/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  updatePassword,
} from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@material-ui/icons/LockOpen"
import LockIcon from "@material-ui/icons/Lock"
import VpnKeyIcon from "@material-ui/icons/VpnKey"
//import { compareSync } from "bcryptjs";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  //const {user} = useSelector(state=>state.user)

  const { error, isUpdated, loading, } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));

    if(myForm.get("newPassword", newPassword) !== myForm.get("confirmPassword", confirmPassword)){
      alert.error("NEW PASSWORD AND CONFIRM PASSWORD NOT MATCH !")
    }
  }


  useEffect(() => {

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("THAY ĐỔI MẬT KHẨU THÀNH CÔNG");
      navigate("/account");

      dispatch({
        type: UPDATE_PASSWORD_RESET
      });
    }
  }, [dispatch, error, alert, isUpdated, navigate]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Change Password" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">THÔNG TIN</h2>
              <form
                className="updatePasswordForm"
                encType="multipart/form-data"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="Mật khẩu đang sử dụng"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Mật khẩu mới"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Xác nhận lại mật khẩu mới"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="THAY ĐỔI"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdatePassword;
