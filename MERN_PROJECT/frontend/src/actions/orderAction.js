import {
    CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CLEAR_ERRORS,
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    UPDATE_ORDERS_REQUEST,
    UPDATE_ORDERS_FAIL,
    UPDATE_ORDERS_SUCCESS,
    DELETE_ORDERS_REQUEST,
    DELETE_ORDERS_SUCCESS,
    DELETE_ORDERS_FAIL,
} from "../constants/orderConstants"

import axios from "axios"

//Create Order
export const createOrder = (order) => async(dispatch)=>{
    try {
        dispatch({
            type: CREATE_ORDER_REQUEST
        })

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }

        const {data} = await axios.post("/api/v1/order/new", order, config)

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message,
        })
    }
}

//My Order
export const myOrders = (order) => async(dispatch)=>{
    try {
        dispatch({
            type: MY_ORDERS_REQUEST
        })

        const {data} = await axios.get("/api/v1/orders/me")

        dispatch({
            type: MY_ORDERS_SUCCESS,
            payload: data.orders
        })
    } catch (error) {
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response.data.message,
        })
    }
}

//get All Orders (Admin)
export const getAllOrders = () => async(dispatch)=>{
    try {
        dispatch({
            type: ALL_ORDERS_REQUEST
        })

        const {data} = await axios.get("/api/v1/admin/orders")

        dispatch({
            type: ALL_ORDERS_SUCCESS,
            payload: data.orders
        })
    } catch (error) {
        dispatch({
            type: ALL_ORDERS_FAIL,
            payload: error.response.data.message,
        })
    }
}

//Update Order
export const updateOrder = (id,order) => async(dispatch)=>{
    try {
        dispatch({
            type: UPDATE_ORDERS_REQUEST
        })

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }

        const {data} = await axios.put(`/api/v1/admin/order/${id}`, order, config)

        dispatch({
            type: UPDATE_ORDERS_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_ORDERS_FAIL,
            payload: error.response.data.message,
        })
    }
}

//get All Orders (shipper)
export const getAllOrdersShipper = () => async(dispatch)=>{
    try {
        dispatch({
            type: ALL_ORDERS_REQUEST
        })

        const {data} = await axios.get("/api/v1/shipping/orders")

        dispatch({
            type: ALL_ORDERS_SUCCESS,
            payload: data.orders
        })
    } catch (error) {
        dispatch({
            type: ALL_ORDERS_FAIL,
            payload: error.response.data.message,
        })
    }
}

//Update Order (shipper)
export const updateOrderShipper = (id,order) => async(dispatch)=>{
    try {
        dispatch({
            type: UPDATE_ORDERS_REQUEST
        })

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }

        const {data} = await axios.put(`/api/v1/shipping/order/${id}`, order, config)

        dispatch({
            type: UPDATE_ORDERS_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_ORDERS_FAIL,
            payload: error.response.data.message,
        })
    }
}

//get All Orders (saler)
export const getAllOrdersSaler = () => async(dispatch)=>{
    try {
        dispatch({
            type: ALL_ORDERS_REQUEST
        })

        const {data} = await axios.get("/api/v1/saler/orders")

        dispatch({
            type: ALL_ORDERS_SUCCESS,
            payload: data.orders
        })
    } catch (error) {
        dispatch({
            type: ALL_ORDERS_FAIL,
            payload: error.response.data.message,
        })
    }
}

//Update Order (saler)
export const updateOrderSaler = (id,order) => async(dispatch)=>{
    try {
        dispatch({
            type: UPDATE_ORDERS_REQUEST
        })

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }

        const {data} = await axios.put(`/api/v1/saler/order/${id}`, order, config)

        dispatch({
            type: UPDATE_ORDERS_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_ORDERS_FAIL,
            payload: error.response.data.message,
        })
    }
}

//Update Order (user)
export const updateOrderUser = (id,order) => async(dispatch)=>{
    try {
        dispatch({
            type: UPDATE_ORDERS_REQUEST
        })

        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }

        const {data} = await axios.put(`/api/v1/user/order/${id}`, order, config)

        dispatch({
            type: UPDATE_ORDERS_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_ORDERS_FAIL,
            payload: error.response.data.message,
        })
    }
}

//Delete Order
export const deleteOrder = (id) => async(dispatch)=>{
    try {
        dispatch({
            type: DELETE_ORDERS_REQUEST
        })
        const {data} = await axios.delete(`/api/v1/admin/order/${id}`)

        dispatch({
            type: DELETE_ORDERS_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_ORDERS_FAIL,
            payload: error.response.data.message,
        })
    }
}

//Get Order Details
export const getOrderDetails = (id) => async(dispatch)=>{
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

        const {data} = await axios.get(`/api/v1/order/${id}`)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order
        })
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message,
        })
    }
}

//Clear Errors
export const clearErrors = () => async(dispatch) =>{
    dispatch({type: CLEAR_ERRORS})
}