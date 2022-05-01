import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { UserContext } from '../Context/UserContext';
import BaseItemReceiptTable from './Base/BaseItemReceiptTable';
import "../css/TheReceiptTable.css"
import { DataBaseContext } from '../Context/DataBase';

const TheReceiptTable = props => {

    const {user} = useContext(UserContext)
    const {getEntitiesViaForeignKey} = useContext(DataBaseContext)
    const [listReceipt,setListReceipt] = useState([])

    useEffect(() => {

        if(user){
            getEntitiesViaForeignKey("Receipt",user["AccountId"])
                .then(res => {
                    console.log(res)
                }).catch(err => {
                    console.log(err)
                })
        }

    },[user])

    return (
        <table className="theReceiptTable" border="0" cellSpacing="0">
            
            <thead>
                <tr>
                    <td className="text-align-center">Mã đơn hàng</td>
                    <td className="text-align-center">Tên người nhận</td>
                    <td className="text-align-center">Số điện thoại</td>
                    <td className="text-align-center">Địa chỉ</td>
                    <td className="text-align-center">Ngày tạo</td>
                    <td className="text-align-center">Phí vận chuyển</td>
                    <td className="text-align-center">Trạng thái</td>
                    <td className="text-align-center">Tổng tiền</td>
                </tr>
            </thead>

            <tbody>
                {listReceipt.length == 0 ? <div className="receiptTableEmpty">Bạn chưa có đơn hàng nào</div> : null}
                {
                    listReceipt.map((receipt,index) => <BaseItemReceiptTable key={index} receipt={receipt} sumMoney={300000} />)
                }
            </tbody>

        </table>
    );
};

TheReceiptTable.propTypes = {
    
};

export default TheReceiptTable;