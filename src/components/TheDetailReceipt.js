import React, { useContext, useEffect, useState } from 'react';
import { SlidingPebbles } from 'react-spinner-animated';
import { DataBaseContext } from '../Context/DataBase';
import "../css/TheDetailReceipt.css"
import accounting from 'accounting'
import BaseProductInReceipt from './Base/BaseProductInReceipt';
import BaseButton from "./Base/BaseButton"
import {FaCompressArrowsAlt} from "react-icons/fa"

const TheDetailReceipt = (props) => {

    const {id,setShowDetail,setRefresh} = props;
    const [receipt,setReceipt] = useState({ReceiptName:'',PhoneNumber:'',Address:'',TransportFee:0,details:[]})
    const {getDetailReceiptById,browseReceipt} = useContext(DataBaseContext)
    const [isLoading,setIsLoading] = useState(true)

    useEffect(() => {
        getDetailReceiptById(id)
            .then(receipt => {
                setReceipt(receipt)
                setIsLoading(false)
            })
    },[id])

    const sumMoney = () => {
        const details = receipt.details
        let money = 0

        details.forEach(detail => {
            money += (detail["Amount"]*detail["Price"])
        })

        money += receipt.TransportFee

        return money
    }

    const handleCancelReceipt = () => {
        setIsLoading(true)
        browseReceipt(id,false)
            .then(() => {
                setIsLoading(false)
                setShowDetail(false)
                setRefresh(pre => !pre)
            })
    }

    const handleAcceptReceipt = () => {
        setIsLoading(true)
        browseReceipt(id,true)
        .then(() => {
            setIsLoading(false)
            setShowDetail(false)
            setRefresh(pre => !pre)
        })
    }

    return (
        <div className="theDetailReceiptBg">
            {isLoading ? 
                <div className="loading">
                    <SlidingPebbles color="white" text="Chờ xíu nhoa <3" bgColor="#A62B4D" />
                </div>
                : null
            }

            <div className="theDetailReceiptWrapper">

                <div onClick={() => setShowDetail(false)} className="closeReceiptDetail">
                    <FaCompressArrowsAlt size={20} color="#fff" />
                </div>

                <div className="theDetailReceiptTitle">Chi tiết đơn hàng</div>

                <div className="theDetailReceiptInfoCustomer">
                    <div style={{display: 'flex',justifyContent:"space-between"}}>
                        <div className="theDetailReceiptInfoName">Họ tên : {receipt["ReceiverName"]}</div>
                        <div className="theDetailReceiptInfoPhone">Số đt : {receipt["PhoneNumber"]}</div>
                    </div>
                    <div className="theDetailReceiptInfoAddress">Địa chỉ : {receipt["Address"]}</div>
                </div>

                <div className="theDetailReceiptProduct">
                    {receipt.details.map((detail,index) => <BaseProductInReceipt key={index} detail={detail} />)}
                </div>

                <div className="theDetailReceiptMoney">
                    <div className="theDetailReceiptTransportFee">Phí ship : {receipt["TransportFee"]}</div>
                    <div className="theDetailReceiptSumMoney money">
                        Tổng tiền : {accounting.formatMoney(sumMoney(), { symbol: "VNĐ",  format: "%v %s" })}
                    </div>
                </div>

                <div className="theDetailReceiptFuc">
                    {receipt["Status"] == false ? <div style={{fontSize:"24px",fontWeight:"bold"}} className="money">Đã Hủy</div> : <BaseButton method={handleCancelReceipt} width={160} border="1px solid #000" bgColor="#fff" text="Hủy Đơn" />}
                    {receipt["Status"] == null ? <BaseButton method={handleAcceptReceipt} width={160} color="#fff" text="Duyệt Đơn" /> :null }
                </div>
            </div>
        </div>
    );
};

export default TheDetailReceipt;