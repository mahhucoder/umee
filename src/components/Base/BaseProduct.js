import React from 'react';
import PropTypes from 'prop-types';
import "../../css/Base/BaseProduct.css"
import BaseButton from './BaseButton';
import accounting from 'accounting'

const BaseProduct = props => {

    const {name,imageUrl,price,style,sold,id} = props;
    
    const handleStorageCart = (id) => {
        const listId = JSON.parse(sessionStorage.getItem("product_id"))
        console.log(listId)

        if(listId) {
            listId.push(id);

            sessionStorage.setItem("product_id", JSON.stringify(listId))
        
            return
        }

        sessionStorage.setItem("product_id",JSON.stringify([id]))
    }

    return (
        <div style={style} className="baseProductWrapper">
            <div style={{backgroundImage:`url(${imageUrl})`}} className="baseProductImage"></div>
            <div className="baseProductName">{name}</div>
            <div className="baseProductSoldMoney">
                <div>Đã bán : {sold}</div>
                <div className="baseProductPrice money">{accounting.formatMoney(price, { symbol: "VNĐ",  format: "%v %s" })}</div>
            </div>
            <div className="baseProductDetail">
                <BaseButton method={() => handleStorageCart(id)} width={160} bgColor="#fff" text="Thêm vào giỏ hàng" />
                <BaseButton color="#fff" text="Xem thêm" width={120} />
            </div>
        </div>
    );
};

BaseProduct.propTypes = {
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
};

export default BaseProduct;