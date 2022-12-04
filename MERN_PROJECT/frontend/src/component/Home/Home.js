import React, { Fragment, useEffect } from 'react';
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import MetaData from '../layout/MetaData';
import {clearErrors, getProduct} from "../../actions/productAction";
import {useSelector, useDispatch} from "react-redux";
import Loader from '../layout/Loader/Loader';
import {useAlert} from "react-alert";
import ProductCard from './ProductCard.js';



const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();

    const {loading, error, products} = useSelector(
        (state) => state.products
    )

    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getProduct());
    }, [dispatch, error,alert]);
  return (
     <Fragment>
        {loading ? (
            <Loader />
        ) : (
            <Fragment>
            <MetaData title="ECOMMERCE" />
    
    
            <div className="banner">
                <p>Chào mừng đến với -- Ecommerce</p>
                <h1>TÌM KIẾM SẢN PHẨM BÊN DƯỚI</h1>
                
                <a href="#container">
                    <button>
                        ĐI XUỐNG <CgMouse />
                    </button>
                </a>
            </div>
    
            <h2 className="homeHeading">
                SẢN PHẨM NỔI BẬT
            </h2>
            <div className="container" id='container'>
                {products && products.map(product=> <ProductCard product={product} />)}
                
            </div>
         </Fragment>
        )}
     </Fragment>
  )
}

export default Home;