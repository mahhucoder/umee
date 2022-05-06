import React, { useContext, useEffect, useState } from 'react';
import { DataBaseContext } from '../../Context/DataBase';
import "../../css/Base/BaseProductInCart.css"
import accounting from 'accounting'
import {AiOutlineDelete} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';

const BaseProductInCart = (props) => {

    const {id,setSumMoney,setShowCart} = props
    const {getProductById,removeIdFromSession,listIdInCart} = useContext(DataBaseContext)
    const [product,setProduct] = useState(null)

    const navigate = useNavigate()

    const deleteProduct = () => {
        setSumMoney(0)

        removeIdFromSession(id)
    }

    const navigateDetail = () => {
        setShowCart(false)
        navigate(`/product/${id}`)
    }

    useEffect(() => {
        
        getProductById(id)
        .then(prd => {
            setProduct(prd)
            setSumMoney(pre => pre += prd["Price"])
        }).catch(err => console.log(err))

    },[id,listIdInCart])

    return (
        <div className="productInCart">
            <div onClick={deleteProduct} className="productInCartRemove"><AiOutlineDelete color="#fff" size="24" /></div>
            <div onClick={navigateDetail} style={{backgroundImage:`url('${product ? product["ImageUrl"] : null}')`}} className="productInCartImage"></div>
            <div className="productInCartInfo">
                <div  onClick={navigateDetail} className="productInCartInfoTop">
                    <div className="productInCartProductName">{product ? product["ProductName"] : null}</div>
                    <div className="productInCartAmount">Kho còn : {product ? product["Amount"] : null}</div>
                </div>

                <div className="productInCartInfoBottom">
                    <div className="productInCartPrice money">{product ? accounting.formatMoney(product["Price"], { symbol: "VNĐ",  format: "%v %s" }) : null}</div>
                </div>

            </div>
        </div>
    );
};

export default BaseProductInCart;