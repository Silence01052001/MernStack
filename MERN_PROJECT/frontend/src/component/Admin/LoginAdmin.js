import React, { Fragment, useRef, useState, useEffect } from 'react';
import "../User/LoginSignUp.css";
import Loader from "../layout/Loader/Loader";
import {Link, useLocation} from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline"
import LockOpenIcon from "@material-ui/icons/LockOpen";
import {useDispatch, useSelector} from "react-redux";
import {clearErrors, login} from "../../actions/userAction";
import {useAlert} from "react-alert";
import { useNavigate } from 'react-router-dom';

const LoginAdmin = () => {

  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const location = useLocation();

  const {error, loading, isAuthenticated} = useSelector((state) => state.user)

  const loginTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword,setLoginPassword] = useState("");

  const loginSubmit =(e)=>{
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword))
  }

  // const redirect = location.search ? location.search.split("=")[1] : "/admin/dashboard"
  const redirect = location.search ? "/NotFound" : "/admin/dashboard"

  useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch(clearErrors())
    }

    if(isAuthenticated){
      navigate(redirect)
    }
  }, [dispatch, error, alert, isAuthenticated, navigate, redirect])

  const switchTabs = (e, tab) =>{
    if(tab === "login"){
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");
      loginTab.current.classList.remove("shiftToLeft");
    }
  }

  return (
    <Fragment>
      {loading ? <Loader/> : (
        <Fragment>
        <div className='LoginSignUpContainer'>
          <div className='LoginSignUpBox'>
            <div>
              <div className='login_signUp_toggle'>
                <p onClick={e=> switchTabs(e, "login")}>LOGIN ADMIN</p>
              </div>
              <button ref={switcherTab}></button>
            </div>
            <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
              <div className='loginEmail'>
                <MailOutlineIcon />
                <input
                  type="email"
                  placeholder='Email'
                  required
                  value={loginEmail}
                  onChange={e=>setLoginEmail(e.target.value)}
                  />                
              </div>
              <div className='loginPassword'>
                <LockOpenIcon />
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={loginPassword}
                  onChange={e=>setLoginPassword(e.target.value)}
                  />
              </div>
              <Link to="/password/forgot">Forget Password ?</Link>
              <input type="submit" value="Login" className="loginBtn"/>
            </form>
          </div>
        </div>
      </Fragment>
      )}
    </Fragment>
  )
}

export default LoginAdmin