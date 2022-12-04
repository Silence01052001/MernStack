import React, {Fragment, useEffect} from 'react'
import './ProductList.css'
import {DataGrid} from "@material-ui/data-grid"
import {useSelector, useDispatch} from "react-redux"
import {clearErrors, deleteProduct, getSalerProduct} from "../../actions/productAction"
import {Link, useNavigate} from "react-router-dom"
import {useAlert} from "react-alert"
import {Button} from "@material-ui/core"
import MetaData from "../layout/MetaData"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants'

const SalerAllProducts = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const alert = useAlert()
  const {error,  products} = useSelector(state=>state.products)

  const {error: deleteError, isDeleted} = useSelector(state=>state.product)
  const deleteProductHandler = (id) =>{
    dispatch(deleteProduct(id));
  }
  useEffect(()=>{
    if(error){
      alert.error(error);
      dispatch(clearErrors())
    }

    if(deleteError){
      alert.error(deleteError);
      dispatch(clearErrors())
    }

    if(isDeleted){
      alert.success("XÓA SẢN PHẨM THÀNH CÔNG")
      navigate("/admin/products")
      dispatch({type: DELETE_PRODUCT_RESET})
    }

    dispatch(getSalerProduct())
  }, [dispatch, alert, error, deleteError, navigate, isDeleted])

  const columns = [
    {
      field: "id",
      headerName: "MÃ SẢN PHẨM",
      minWidth: 150,
      flex:0.2
    },
    {
      field:"name",
      headerName: "TÊN SẢN PHẨM",
      minWidth: 150,
      flex:0.2
    },
    {
      field: "stock",
      headerName: "TỒN",
      type: "number",
      minWidth: 50,
      flex: 0.1
    },
    {
      field: "price",
      headerName: "GIÁ",
      type: "number",
      minWidth: 100,
      flex: 0.1
    },
    // {
    //   field: "actions",
    //   flex:0.1,
    //   headerName: "THAO TÁC",
    //   minWidth:100,
    //   type: "number",
    //   sortable: false,
    //   renderCell:(params)=>{
    //     return (
    //       <Fragment>
    //         <Link to={`/admin/product/${params.getValue(params.id,"id")}`}>
    //           <EditIcon/>
    //         </Link>

    //         <Button onClick={()=>deleteProductHandler(params.getValue(params.id,"id"))}>
    //           <DeleteIcon/>
    //         </Button>
    //       </Fragment>
    //     )
    //   }
    // }
  ]

  const rows=[];

  products && 
    products.forEach(item=>{
      rows.push({
        id:item._id,
        stock:item.stock,
        price: item.price,
        name:item.name,
      })
    })
  return (
    <Fragment>
      <MetaData title={`TẤT CẢ SẢN PHẨM - SALER`}/>
        <div className='productListContainer'>
          <h1 id='productListHeading'>TẤT CẢ SẢN PHẨM</h1>

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

export default SalerAllProducts