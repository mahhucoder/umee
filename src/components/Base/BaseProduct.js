import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import "../../css/Base/BaseProduct.css"
import BaseButton from './BaseButton';
import accounting from 'accounting'
import { DataBaseContext } from '../../Context/DataBase';
import { useNavigate } from 'react-router-dom';

const BaseProduct = props => {

    const {name,imageUrl,price,style,sold,id} = props;
    const {pushIdToSessions} = useContext(DataBaseContext)
    const navigate = useNavigate()

    return (
        <div style={style} className="baseProductWrapper">
            <div onClick={() => navigate(`/product/${id}`)} style={{backgroundImage:`url(${imageUrl})`}} className="baseProductImage"></div>
            <div className="baseProductName">{name}</div>
            <div className="baseProductSoldMoney">
                <div>Đã bán : {sold}</div>
                <div className="baseProductPrice money">{accounting.formatMoney(price, { symbol: "VNĐ",  format: "%v %s" })}</div>
            </div>
            <div className="baseProductDetail">
                <BaseButton method={() => pushIdToSessions(id)} width={160} bgColor="#fff" text="Thêm vào giỏ hàng" />
                <BaseButton method={() => navigate(`/product/${id}`)} color="#fff" text="Xem thêm" width={120} />
            </div>
        </div>
    )
}

BaseProduct.propTypes = {
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
};

export default React.memo(BaseProduct);