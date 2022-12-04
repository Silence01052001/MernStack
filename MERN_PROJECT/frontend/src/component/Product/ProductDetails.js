import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails, newReview } from "../../actions/productAction";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import {useAlert} from "react-alert";
import MetaData from "../layout/MetaData";
import {addItemsToCart} from "../../actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core"
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { id } = useParams();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const {success, error: reviewError} = useSelector(
    state=>state.newReview
  )

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")


  const increaseQuantity=()=>{
    if(product.stock <= quantity){
      return;
    }

    const qty = quantity + 1;
    setQuantity(qty);
  }

  const decreaseQuantity=()=>{
    if(1 >= quantity){
      return;
    }

    const qty=quantity -1 ;
    setQuantity(qty);
  }

  const addToCartHandler = () =>{
    dispatch(addItemsToCart(id,quantity))
    alert.success("THÊM VÀO GIỎ HÀNG THÀNH CÔNG")
  }

  const submitReviewToggle = () =>{
    open ? setOpen(false) : setOpen(true)
  }

  const reviewSubmitHandler = () =>{
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));
    setOpen(false);
  }

  useEffect(() => {
    if(error){
      alert.error(error)
      dispatch(clearErrors())
    }

    if(reviewError){
      alert.error(reviewError)
      dispatch(clearErrors())
    }

    if(success){
      alert.success("ĐÁNH GIÁ SẢN PHẨM THÀNH CÔNG")
      dispatch({type: NEW_REVIEW_RESET})
    }

    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, success, reviewError]);

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- ECOMMERCE`} />
      <div className="ProductDetails">
        <div>
          <Carousel>
            {product.images &&
              product.images.map((item, i) => (
                <img
                  className="CarouselImage"
                  key={item.url}
                  src={item.url}
                  alt={`${i} Slide`}
                />
              ))}
          </Carousel>
        </div>

        <div>
          <div className="detailsBlock-1">
            <h2>{product.name}</h2>
            <p>Mã sản phẩm # {product._id}</p>
          </div>

          <div className="detailsBlock-2">
            <Rating {...options} />
            <span className="detailsBlock-2-span">({product.numOfReviews} lượt nhận xét)</span>
          </div>
          <div className="detailsBlock-3">
            <h1>{`${product.price} (VNĐ)`}</h1>
            <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button onClick={decreaseQuantity}>-</button>
                <input readOnly value={quantity} type="number" />
                <button onClick={increaseQuantity}>+</button>
              </div>
              <button  onClick={addToCartHandler}>THÊM VÀO GIỎ HÀNG</button>
            </div>

            <p>
              TRẠNG THÁI : 
              <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                {product.stock < 1 ? "HẾT HÀNG" : "CÒN HÀNG"}
              </b>
            </p>
          </div>

          <div className="detailsBlock-4">
            MÔ TẢ : <p>{product.description}</p>
          </div>

          <button onClick={submitReviewToggle} className="submitReview">CHỌN ĐỂ ĐÁNH GIÁ</button>
        </div>
      </div>

      <h3 className="reviewsHeading"> ĐÁNH GIÁ SẢN PHẨM </h3>

      <Dialog
        aria-labelledby="simple-dialog-title"
        open={open}
        onClose={submitReviewToggle}
      >
        <DialogTitle>ĐÁNH GIÁ SẢN PHẨM</DialogTitle>
        <DialogContent className="submitDialog">
          <Rating
            onChange={e=>setRating(e.target.value)}
            value={rating}
            size="large"
          />
          <textarea
            className="submitDialogTextArea"
            cols="30"
            rows="5"
            value={comment}
            onChange={e=>setComment(e.target.value)}
          ></textarea>
          <DialogActions>
            <Button onClick={submitReviewToggle} color="secondary">HỦY</Button>
            <Button onClick={reviewSubmitHandler} color="primary">LƯU</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>

      {product.reviews && product.reviews[0] ? (
        <div className="reviews">
          {product.reviews &&
            product.reviews.map(review=> <ReviewCard review={review}/>)}
        </div>
      ) : (
        <p className="noReviews"> CHƯA CÓ ĐÁNH GIÁ NÀO </p>
      )}
    </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
