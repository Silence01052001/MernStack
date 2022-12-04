import React from 'react'
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import "./orderSuccess.css"
import { Typography } from '@material-ui/core'
import {Link} from "react-router-dom"

const OrderSuccess = () => {
  return (
    <div className='orderSuccess'>
        <CheckCircleIcon />

        <Typography>ĐẶT HÀNG THÀNH CÔNG</Typography>
        <Link to="/orders">ĐI ĐẾN ĐƠN HÀNG</Link>
    </div>
  )
}

export default OrderSuccess