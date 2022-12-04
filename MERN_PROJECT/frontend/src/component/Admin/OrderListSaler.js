import React, {Fragment, useEffect} from 'react'
import './ProductList.css'
import {DataGrid} from "@material-ui/data-grid"
import {useSelector, useDispatch} from "react-redux"
import {clearErrors, getAllOrdersSaler} from "../../actions/orderAction"
import {Link, useNavigate} from "react-router-dom"
import {useAlert} from "react-alert"
import MetaData from "../layout/MetaData"
import EditIcon from "@material-ui/icons/Edit"

const OrderListSaler = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const alert = useAlert()
  const {error,  orders} = useSelector(state=>state.allOrders)
  useEffect(()=>{ 
    if(error){
      alert.error(error);
      dispatch(clearErrors())
    }
    dispatch(getAllOrdersSaler())
  }, [dispatch, alert, error, navigate])

  const columns = [
    {
      field: "id",
      headerName: "MÃ ĐƠN HÀNG",
      minWidth: 150,
      flex: 0.1,
  },
  {
      field: "status",
      headerName: "TRẠNG THÁI",
      minWidth: 150,
      flex: 0.1,
      cellClassName: (params)=>{
          return params.getValue(params.id, "status") === "Đã giao hàng"
              ? "greenColor"
              : "redColor"
      }
  },
  {
      field: "itemsQty",
      headerName: "SỐ LƯỢNG",
      type: "number",
      minWidth: 150,
      flex: 0.1,
  },
  {
      field: "amount",
      headerName: "THÀNH TIỀN",
      type: "number",
      minWidth: 150,
      flex: 0.1,
  },
    {
      field: "actions",
      flex:0.1,
      headerName: "THAO TÁC",
      minWidth:150,
      type: "number",
      sortable: false,
      renderCell:(params)=>{
        return (
          <Fragment>
            <Link to={`/saler/order/${params.getValue(params.id,"id")}`}>
              <EditIcon/>
            </Link>
          </Fragment>
        )
      }
    }
  ]

  const rows=[];

  orders && 
  orders.forEach(item=>{
      rows.push({
        id:item._id,
        itemsQty:item.orderItems.length,
        amount: item.totalPrice,
        status:item.orderStatus,
      })
    })
  return (
    <Fragment>
      <MetaData title={`Tất cả đơn hàng - SALER`}/>

        <div className='productListContainer'>
          <h1 id='productListHeading'>TẤT CẢ ĐƠN HÀNG</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className='productListTable'
            autoHeight
            />
        </div>
    </Fragment>
  )
}

export default OrderListSaler;