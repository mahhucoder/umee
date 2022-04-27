import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { UserContext } from '../Context/UserContext';
import BaseItemReceiptTable from './Base/BaseItemReceiptTable';
import "../css/TheReceiptTable.css"

const TheReceiptTable = props => {

    const {user} = useContext(UserContext)

    const data = [{
        ReceiptId:"asdfasfasfasdfasfasasd",
        ReceiverName:"Lê Mạnh Hùng",
        PhoneNumber:"0866940201",
        Address:"Thanh Mai - Thanh Oai - Hà Nội",
        CreatedAt:"2001-02-11T00:00:00",
        TransportFee:30000,
        Status:1,
    },{
        ReceiptId:"asdfasfasfasdfasfasasd",
        ReceiverName:"Lê Mạnh Hùng",
        PhoneNumber:"0866940201",
        Address:"Thanh Mai - Thanh Oai - Hà Nội",
        CreatedAt:"2001-02-11T00:00:00",
        TransportFee:30000,
        Status:null,
    },{
        ReceiptId:"asdfasfasfasdfasfasasd",
        ReceiverName:"Lê Mạnh Hùng",
        PhoneNumber:"0866940201",
        Address:"Thanh Mai - Thanh Oai - Hà Nội",
        CreatedAt:"2001-02-11T00:00:00",
        TransportFee:30000,
        Status:null,
    },{
        ReceiptId:"asdfasfasfasdfasfasasd",
        ReceiverName:"Lê Mạnh Hùng",
        PhoneNumber:"0866940201",
        Address:"Thanh Mai - Thanh Oai - Hà Nội",
        CreatedAt:"2001-02-11T00:00:00",
        TransportFee:30000,
        Status:0,
    }

    ]

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
                {
                    data.map((receipt,index) => <BaseItemReceiptTable key={index} receipt={receipt} sumMoney={300000} />)
                }
            </tbody>

        </table>
    );
};

TheReceiptTable.propTypes = {
    
};

export default TheReceiptTable;