import React, { useContext, useEffect, useState } from 'react';
import "../css/TheCartProduct.css"
import {FaCompress} from 'react-icons/fa'
import BaseProductInCart from './Base/BaseProductInCart';
import accounting from 'accounting'
import BaseButton from "../components/Base/BaseButton"
import { DataBaseContext } from '../Context/DataBase';
import { useNavigate } from 'react-router-dom';

const TheCartProduct = (props) => {
    
    const {setShowCart} = props
    const [sumMoney,setSumMoney] = useState(0)
    const {listIdInCart} = useContext(DataBaseContext)
    const navigate = useNavigate()

    const handleBuy = () => {
        if(listIdInCart.length != 0) {
            setShowCart(false)
            navigate("/payment")
        }
    }

    return (
        <div className="cartProductBg">
            <div className="cartProductContainer">
                <div onClick={() => setShowCart(false)} className="cartProductClose">
                    <FaCompress color="#fff" size={24} />
                </div>

                <div className="cartProductTitle">Giỏ hàng của bạn</div>

                <div className="cartProductList">
                    {
                        listIdInCart.map((id,index) => <BaseProductInCart setShowCart={setShowCart} setSumMoney={setSumMoney} key={index} id={id} />)
                    }

                    {listIdInCart.length == 0 ? <div>Giỏ hàng trống</div> : null}
                </div>

                <div className="cartProductSumMoney">Tổng tiền : <p className="money">{accounting.formatMoney(sumMoney, { symbol: "VNĐ",  format: "%v %s" })}</p></div>
            
                <BaseButton method={handleBuy} color="#fff" text='Thanh toán' />
            </div>
        </div>
    );
};

export default TheCartProduct;