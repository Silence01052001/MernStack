import React, {Fragment, useEffect, useState} from 'react'
import './ProductReviews.css'
import {DataGrid} from "@material-ui/data-grid"
import {useSelector, useDispatch} from "react-redux"
import {clearErrors, deleteReviews, getAllReviews} from "../../actions/productAction"
import {useNavigate} from "react-router-dom"
import {useAlert} from "react-alert"
import {Button} from "@material-ui/core"
import MetaData from "../layout/MetaData"
import Star from "@material-ui/icons/Star"
import DeleteIcon from "@material-ui/icons/Delete"
import SideBar from "./Sidebar"
import { DELETE_REVIEW_RESET } from '../../constants/productConstants'

const ProductReviews = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const alert = useAlert();
  const [productId, setProductId] = useState("")

  const {error: deleteError,  isDeleted} = useSelector(state=>state.review)

  const {error, reviews, loading} = useSelector(state=>state.productReviews)
  const deleteReviewHandler = (reviewId) =>{
    dispatch(deleteReviews(reviewId, productId));
  }

  const productReviewsSubmitHandler = (e) =>{
        e.preventDefault();
        dispatch(getAllReviews(productId))
  }
  useEffect(()=>{
    if(productId.length === 24){
        dispatch(getAllReviews(productId))
    }
    if(error){
      alert.error(error);
      dispatch(clearErrors())
    }

    if(deleteError){
      alert.error(deleteError);
      dispatch(clearErrors())
    }

    if(isDeleted){
      alert.success("XÓA ĐÁNH GIÁ THÀNH CÔNG")
      navigate("/admin/reviews")
      dispatch({type: DELETE_REVIEW_RESET})
    }

  }, [dispatch, alert, error, deleteError, navigate, isDeleted, productId])

  const columns = [
    {
      field: "id",
      headerName: "MÃ ĐÁNH GIÁ",
      minWidth: 100,
      flex:0.1
    },
    {
      field:"user",
      headerName: "NGƯỜI DÙNG",
      minWidth: 100,
      flex:0.1
    },
    {
      field: "comment",
      headerName: "NỘI DUNG",
      minWidth: 100,
      flex: 0.1
    },
    {
      field: "rating",
      headerName: "ĐÁNH GIÁ",
      type: "number",
      minWidth: 100,
      flex: 0.1,
      cellClassName:(params)=>{
        return (
          params.getValue(params.id, "rating") >= 3 ? "greenColor" : "redColor"
        )
      }
    },
    {
      field: "actions",
      flex:0.1,
      headerName: "THAO TÁC",
      minWidth:100,
      type: "number",
      sortable: false,
      renderCell:(params)=>{
        return (
          <Fragment>
            <Button onClick={()=>deleteReviewHandler(params.getValue(params.id,"id"))}>
              <DeleteIcon/>
            </Button>
          </Fragment>
        )
      }
    }
  ]

  const rows=[];

  reviews && 
  reviews.forEach(item=>{
      rows.push({
        id:item._id,
        rating:item.rating,
        comment: item.comment,
        user:item.name,
      })
    })
  return (
    <Fragment>
      <MetaData title={`Tất cả đánh giá - ADMIN`}/>

      <div className='dashboard'>
        <SideBar />
        <div className='productReviewsContainer'>

        <form
            className="productReviewsForm"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className='productReviewsFormHeading'>TẤT CẢ ĐÁNH GIÁ</h1>

            <div>
              <Star />
              <input
                type="text"
                placeholder="MÃ SẢN PHẨM"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              TÌM KIẾM
            </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className='productListTable'
            autoHeight
            />
          ) : (
            <h1 className='productReviewsFormHeading'>SẢN PHẨM CHƯA ĐƯỢC ĐÁNH GIÁ</h1>
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default ProductReviews