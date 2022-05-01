import React, { useEffect, useState } from 'react';
import "../css/TheCartProduct.css"
import {FaCompress} from 'react-icons/fa'
import BaseProductInCart from './Base/BaseProductInCart';

const TheCartProduct = (props) => {
    
    const {setShowCart} = props
    const [listIdProduct,setListIdProduct] = useState([])

    useEffect(() => {

        const listId = JSON.parse(sessionStorage.getItem("product_id"))

        if(listId) {
            setListIdProduct(listId)
        }

    },[])

    return (
        <div className="cartProductBg">
            <div className="cartProductContainer">
                <div onClick={() => setShowCart(false)} className="cartProductClose">
                    <FaCompress color="#fff" size={24} />
                </div>

                <div className="cartProductTitle">Giỏ hàng của bạn</div>

                {
                    listIdProduct.map((id,index) => <BaseProductInCart key={index} id={id} />)
                }
            </div>
        </div>
    );
};

export default TheCartProduct;