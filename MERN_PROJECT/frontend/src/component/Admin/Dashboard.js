import React, { useEffect } from 'react'
import Sidebar from "./Sidebar.js"
import "./Dashboard.css"
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
  } from 'chart.js';
  import { Doughnut, Line } from 'react-chartjs-2';
import { useSelector, useDispatch } from 'react-redux'
import { getAdminProduct } from '../../actions/productAction.js'
import { getAllOrders } from '../../actions/orderAction.js'
import { getAllUsers } from '../../actions/userAction.js'
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
  );

const Dashboard = () => {
    const dispatch = useDispatch()
    const {products} = useSelector(state=>state.products) 
    const {orders} = useSelector(state=>state.allOrders) 
    const {users} = useSelector(state=>state.allUsers)  

    let outOfStock = 0;

    products &&
        products.forEach(item=>{
            if(item.stock === 0){
                outOfStock += 1;
            }
        })
    
    useEffect(()=>{
        dispatch(getAdminProduct());

        dispatch(getAllOrders())

        dispatch(getAllUsers())
    }, [dispatch])

    let totalAmount = 0;
    orders &&
        orders.forEach(item=>{
            totalAmount += item.totalPrice
        })
    const lineState ={
        labels: ["Số dư ban đầu", "Số dư có được"],
        datasets:[
            {
                label: "TỔNG THU NHẬP",
                backgroundColor: ["tomato"],
                hoverBackgroundColor: ["rgb(197,72,49"],
                data:[0,totalAmount]
            }
        ]
    }

    const doughnutState = {
        labels: ["HẾT HÀNG", "CÒN HÀNG"],
        datasets: [
            {
                backgroundColor: ["#00A6B4", "#6800B4"],
                hoverBackgroundColor: ["#4B5000", "#35014F"],
                data: [outOfStock,products.length - outOfStock],
            }
        ]
    }
  return (
    <div className='dashboard'>
        <Sidebar />
        <div className='dashboardContainer'>
            <Typography component="h1">BẢNG ĐIỀU KHIỂN</Typography>

            <div className='dashboardSummary'>
                <div>
                    <p>
                        TỔNG DOANH THU <br/> {totalAmount} (VNĐ)
                    </p>                    
                </div>
                <div className='dashboardSummaryBox2'>
                    <Link to="/admin/products">
                        <p>Sản Phẩm</p>
                        <p>{products && products.length}</p>
                    </Link>

                    <Link to="/admin/orders">
                        <p>Đơn Hàng</p>
                        <p>{orders && orders.length}</p>
                    </Link>

                    <Link to="/admin/users">
                        <p>Tài Khoản</p>
                        <p>{users && users.length}</p>
                    </Link>
                </div>
            </div>

            <div className='lineChart'>
                <Line data={lineState}/>
            </div>

            <div className='doughnutChart'>
                <Doughnut data={doughnutState}/>
            </div>
        </div>
    </div>
  )
}

export default Dashboard