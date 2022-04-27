import React, { useContext, useEffect, useState } from 'react';
import "../../css/Base/BaseProductInReceipt.css"
import accounting from 'accounting';
import { DataBaseContext } from '../../Context/DataBase';

const BaseProductInReceipt = (props) => {

    const {ProductId,Amount,Price} = props.detail
    const {getProductById} = useContext(DataBaseContext)
    const [product,setProduct] = useState({ProductName:"",ImageUrl:"",Amount:0,})

    useEffect(() => {

        getProductById(ProductId)
            .then(res => {
                const {ProductName,Amount,ImageUrl} = res

                setProduct({ProductName,Amount,ImageUrl})
            })

    },[ProductId])
    
    console.log(product)

    return (
        <div className="baseProductDetailInReceipt">
            <div className="baseProductDetailInReceiptInfo">
                <div style={{backgroundImage: `url("${product.ImageUrl}")`}} className="baseProductDetailInReceiptImage"></div>

                <div className="baseProductDetailInReceiptText">
                    <div className="baseProductDetailInReceiptName">{product.ProductName}</div>
                    <div style={{display: 'flex',justifyContent: "space-between"}}>
                        <div className="baseProductDetailInReceiptPrice money">
                            {accounting.formatMoney(Price, { symbol: "VNĐ",  format: "%v %s" })}
                        </div>
                        <div className="baseProductDetailInReceiptAmount">x{Amount}</div>
                    </div>
                    <div className="baseProductDetailInReceiptDatabase">
                        Kho còn : {product.Amount}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default BaseProductInReceipt;