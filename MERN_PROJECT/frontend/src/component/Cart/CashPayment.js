import React, {Fragment, useEffect, useRef} from 'react'
import "./CashPayment.css"
import CheckoutSteps from './CheckoutSteps'
import MetaData from '../layout/MetaData'
import { Typography } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import {createOrder,clearErrors} from "../../actions/orderAction"

const CashPayment = () => {

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))
    const nativigate = useNavigate()
    const payBtn = useRef(null);
    const dispatch = useDispatch()
    const alert = useAlert()
    const {shippingInfo, cartItems} = useSelector(state=>state.cart)
    const {error} = useSelector(state=>state.newOrder)

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice
    }
    const submitHandler = (e) =>{
        e.preventDefault();
        var uuid = require("uuid");
        var id = uuid.v4();

        try{
            order.paymentInfo= {
                id: id,
                status: "Đặt hàng thành công"
            }

            dispatch(createOrder(order))
            nativigate("./success")
        
        } catch (error) {
            payBtn.current.disabled= false;
            alert.error(error.response.data.message)
        }
    }

    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }        
    }, [dispatch,error,alert])

  return (
    <Fragment>
        <MetaData title="Thanh toán"/>
        <CheckoutSteps activeStep={2} />

        <div className='paymentContainer'>
            <form className='paymentForm' onSubmit={e=>submitHandler(e)}>
                <Typography>TRẢ SAU</Typography>
                <input
                    type="submit"
                    value={`Tiền mặt: ${orderInfo && orderInfo.totalPrice} - vnđ`}
                    ref={payBtn}
                    className="paymentFormBtn"
                />
            </form>
        </div>
    </Fragment>
  )
}

export default CashPayment