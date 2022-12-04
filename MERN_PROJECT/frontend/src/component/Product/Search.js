import React, { Fragment, useState } from 'react';
import "./Search.css";
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';

const Search = () => {
    const [keyword, setKeywork] = useState("");
    const navigate = useNavigate();

    const searchSubmitHandler = (e) =>{
        e.preventDefault();
        if(keyword.trim()){
            navigate(`/products/${keyword}`);
        }else{
            navigate("/products");
        }
    }

  return (
    <Fragment>
        <MetaData title="Tìm kiếm sản phẩm -- ECOMMERCE"/>
        <form className='searchBox' onSubmit={searchSubmitHandler}>
            <input
            type="text"
            placeholder='Tìm kiếm sản phẩm ...'
            onChange={e=> setKeywork(e.target.value)}/>
            <input type="submit" value="Tìm kiếm"/>
        </form>
    </Fragment>
  )
}

export default Search