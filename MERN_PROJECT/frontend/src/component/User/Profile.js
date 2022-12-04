import React, { Fragment, useEffect } from 'react'
import MetaData from '../layout/MetaData'
import { useSelector } from 'react-redux'
import Loader from '../layout/Loader/Loader'
import {Link, Navigate, useNavigate} from "react-router-dom"
import "./Profile.css"

const Profile = () => {

    const {user, loading, isAuthenticated} = useSelector(state=>state.user)
  
    const navigate = useNavigate()
    useEffect(()=>{
        if(isAuthenticated === false){
            Navigate("/login")
        }
    }, [navigate, isAuthenticated])
    return (
    <Fragment>
        {loading ? <Loader /> : (
            <Fragment>
            <MetaData title={`${user.name} 's Profile`} />
            <div className='profileContainer'>
                <div>
                    <h1>THÔNG TIN</h1>
                    <img src={user.avatar.url} alt={user.name} />
                    <Link to="/me/update">CHỈNH SỬA THÔNG TIN</Link>
                </div>
                <div>
                    <div>
                        <h4>TÊN</h4>
                        <p>{user.name}</p>
                    </div>
                    <div>
                        <h4>EMAIL</h4>
                        <p>{user.email}</p>
                    </div>
                    <div>
                        <h4>THỜI GIAN ĐĂNG KÍ TÀI KHOẢN</h4>
                        <p>{String(user.createdAt).substr(0, 10)}</p>
                    </div>
    
                    <div>
                        <Link to="/orders">THÔNG TIN ĐƠN HÀNG</Link>
                        <Link to="/password/update">THAY ĐỔI MẬT KHẨU</Link>
                    </div>
                </div>
            </div>
        </Fragment>
        )}
    </Fragment>
  )
}

export default Profile