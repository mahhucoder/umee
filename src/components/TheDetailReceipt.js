import React, { useContext, useEffect, useState } from 'react';
import { SlidingPebbles } from 'react-spinner-animated';
import { DataBaseContext } from '../Context/DataBase';
import "../css/TheDetailReceipt.css"
import accounting from 'accounting'
import BaseProductInReceipt from './Base/BaseProductInReceipt';
import BaseButton from "./Base/BaseButton"
import {FaCompressArrowsAlt} from "react-icons/fa"
import { UserContext } from '../Context/UserContext';

const TheDetailReceipt = (props) => {

    const {id,setShowDetail,setRefresh,setListReceiptSelected} = props;
    const [receipt,setReceipt] = useState({ReceiptName:'',PhoneNumber:'',Address:'',TransportFee:0,details:[]})
    const {getDetailReceiptById,browseReceipt,updateAmount} = useContext(DataBaseContext)
    const [isLoading,setIsLoading] = useState(true)
    const {user} = useContext(UserContext)

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
        const promises = []

        receipt.details.forEach(detail => {
            const amountUpdate = detail["Amount"]
            const idUpdate = detail["ProductId"]

            const update = updateAmount(idUpdate, amountUpdate)
            promises.push(update)
        })


        const browse = browseReceipt(id,false)
            
        Promise.all(promises)
            .then(() => {
                setListReceiptSelected([])
                setIsLoading(false)
                setShowDetail(false)
                setRefresh(pre => !pre)
            }).catch(err => console.log(err))
    }

    const handleAcceptReceipt = () => {
        setIsLoading(true)
        browseReceipt(id,true)
        .then(() => {
            setListReceiptSelected([])
            setIsLoading(false)
            setShowDetail(false)
            setRefresh(pre => !pre)
        })
    }

    return (
        <div className="theDetailReceiptBg">
            {isLoading ? 
                <div className="loading">
                    <SlidingPebbles color="white" text="Ch??? x??u nhoa <3" bgColor="#A62B4D" />
                </div>
                : null
            }

            <div className="theDetailReceiptWrapper">

                <div onClick={() => setShowDetail(false)} className="closeReceiptDetail">
                    <FaCompressArrowsAlt size={20} color="#fff" />
                </div>

                <div className="theDetailReceiptTitle">Chi ti???t ????n h??ng</div>

                <div className="theDetailReceiptInfoCustomer">
                    <div style={{display: 'flex',justifyContent:"space-between"}}>
                        <div className="theDetailReceiptInfoName">H??? t??n : {receipt["ReceiverName"]}</div>
                        <div className="theDetailReceiptInfoPhone">S??? ??t : {receipt["PhoneNumber"]}</div>
                    </div>
                    <div className="theDetailReceiptInfoAddress">?????a ch??? : {receipt["Address"]}</div>
                </div>

                <div className="theDetailReceiptProduct">
                    {receipt.details.map((detail,index) => <BaseProductInReceipt key={index} detail={detail} />)}
                </div>

                <div className="theDetailReceiptMoney">
                    <div className="theDetailReceiptTransportFee">Ph?? ship : {receipt["TransportFee"]}</div>
                    <div className="theDetailReceiptSumMoney money">
                        T???ng ti???n : {accounting.formatMoney(sumMoney(), { symbol: "VN??",  format: "%v %s" })}
                    </div>
                </div>

                <div style={{display: user.Admin ? 'flex' : 'none'}} className="theDetailReceiptFuc">
                    {receipt["Status"] == false ? <div style={{fontSize:"24px",fontWeight:"bold"}} className="money">???? H???y</div> : <BaseButton method={handleCancelReceipt} width={160} border="1px solid #000" bgColor="#fff" text="H???y ????n" />}
                    {receipt["Status"] == null ? <BaseButton method={handleAcceptReceipt} width={160} color="#fff" text="Duy???t ????n" /> :null }
                </div>
            </div>
        </div>
    );
};

export default TheDetailReceipt;