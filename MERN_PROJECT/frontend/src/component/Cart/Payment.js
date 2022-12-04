import React, {Fragment, useRef} from 'react'
import "./Payment.css"
import CheckoutSteps from './CheckoutSteps'
import { useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import { Typography } from '@material-ui/core'
import { useAlert } from 'react-alert'
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements
} from "@stripe/react-stripe-js"

import axios from 'axios'
import CreditCardIcon from "@material-ui/icons/CreditCard"
import EventIcon from "@material-ui/icons/Event"
import VpnKeyIcon from "@material-ui/icons/VpnKey"
import { useNavigate } from 'react-router-dom'

const Payment = () => {

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"))
    const nativigate = useNavigate()
    const alert = useAlert()
    const stripe = useStripe()
    const elements = useElements()
    const payBtn = useRef(null);

    const {shippingInfo} = useSelector(state=>state.cart)
    const {user} = useSelector(state=>state.user)

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100)
    }

    const submitHandler = async (e) =>{
        e.preventDefault();

        payBtn.current.disabled = true;

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                }
            }

            const {data} = await axios.post(
                "/api/v1/payment/process",
                paymentData,
                config
            )

            const client_secret = data.client_secret;
            if(!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret,{
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city:shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country
                        }
                    }
                }
            })

            if(result.error){
                payBtn.current.disabled = false
                alert.error(result.error.message)
            }else{
                if(result.paymentIntent.status === "Đặt hàng thành công"){
                    nativigate("/success")
                }else{
                    alert.error("Có một số vấn đề trong khi xử lý thanh toán")
                }
            }
            
        } catch (error) {
            payBtn.current.disabled= false;
            alert.error(error.response.data.message)
        }
    }

  return (
    <Fragment>
        <MetaData title="Payment"/>
        <CheckoutSteps activeStep={2} />

        <div className='paymentContainer'>
            <form className='paymentForm' onSubmit={e=>submitHandler(e)}>
                <Typography>Card Info</Typography>
                <div>
                    <CreditCardIcon />
                    <CardNumberElement className='paymentInput'/>
                </div>
                <div>
                    <EventIcon/>
                    <CardExpiryElement className='paymentInput'/>
                </div>
                <div>
                    <VpnKeyIcon/>
                    <CardCvcElement className='paymentInput'/>
                </div>

                <input
                    type="submit"
                    value={`Pay - S${orderInfo && orderInfo.totalPrice}`}
                    ref={payBtn}
                    className="paymentFormBtn"
                />
            </form>
        </div>
    </Fragment>
  )
}

export default Payment