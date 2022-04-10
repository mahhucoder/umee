import React from 'react';
import PropTypes from 'prop-types';
import "../../css/Base/BaseProduct.css"
import BaseButton from './BaseButton';

const BaseProduct = props => {

    const {name,imageUrl,price} = props;

    return (
        <div className="baseProductWrapper">
            <div style={{backgroundImage:`url(${imageUrl})`}} className="baseProductImage"></div>
            <div className="baseProductName">{name}</div>
            <div className="baseProductPrice">{price}</div>
            <div className="baseProductDetail">
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