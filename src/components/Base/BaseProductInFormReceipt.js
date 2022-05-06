import React, { useContext, useEffect, useState } from 'react';
import { DataBaseContext } from '../../Context/DataBase';
import {AiOutlineDelete} from 'react-icons/ai'
import accounting from 'accounting'
import "../../css/Base/BaseProductInFormReceipt.css"

const BaseProductInFormReceipt = (props) => {

    const {id,setListProduct,listProduct} = props;
    const {getProductById} = useContext(DataBaseContext)
    const [product,setProduct] = useState(null)
    const [amount,setAmount] = useState(1)

    const handleChangeAmount = (e) => {
        const newValue = e.target.value
        let valueUpdate = 0

        if(newValue > product["Amount"]){
            valueUpdate = product["Amount"]
        }

        else if(newValue == 0){
            valueUpdate = 1
        }
        else{
            valueUpdate = +newValue
        }

        setAmount(valueUpdate)

        const newList = listProduct.map((prd => {
            if(prd["id"] == id){
                return {...prd,amount: valueUpdate}
            }else
                return prd
        }))

        setListProduct(newList)
    }

    useEffect(() => {
        
        getProductById(id)
            .then(prd => {
                setProduct(prd)
                setListProduct(pre => [...pre,{id:id,price:prd["Price"],amount:amount}])
            })
            .catch(err => console.log(err))

    },[])

    return (
        <div className="productInFormReceipt">
            <div style={{backgroundImage:`url('${product ? product["ImageUrl"] : null}')`}} className="productInFormReceiptImage"></div>
            <div className="productInFormReceiptInfo">
                <div className="productInFormReceiptInfoTop">
                    <div className="productInFormReceiptProductName">{product ? product["ProductName"] : null}</div>
                    <div className="productInFormReceiptAmount">Kho còn : {product ? product["Amount"] : null}</div>
                </div>

                <div className="productInFormReceiptInfoBottom">
                    <div className="productInFormReceiptPrice money">{product ? accounting.formatMoney(product["Price"], { symbol: "VNĐ",  format: "%v %s" }) : null}</div>
                    <input value={amount} onChange={handleChangeAmount} min="1" max={product ? product["Amount"] : null} type="number" className="productInFormReceiptAmountInput" />
                </div>
            </div>
        </div>
    );
};

export default BaseProductInFormReceipt;