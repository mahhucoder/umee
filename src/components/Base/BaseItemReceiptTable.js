import React from 'react';
import accounting from 'accounting'

const BaseItemTable = props => {

    const {receipt} = props

    return (
        <tr>
            <td className="text-align-center">{receipt.ReceiptId}</td>
            <td className="text-align-center">{receipt.ReceiverName}</td>
            <td className="text-align-center">{receipt.PhoneNumber}</td>
            <td className="text-align-center">{receipt.Address}</td>
            <td className="text-align-center">{receipt.CreatedAt.slice(0,10)}</td>
            <td className="text-align-center money">{accounting.formatMoney(receipt.TransportFee, { symbol: "VNĐ",  format: "%v %s" })}</td>
            <td 
                style={{"color" : receipt.Status == 1 ? "green" : receipt.Status == 0 ? "red" : 'rgb(206, 115, 24)'}} 
                className="text-align-center">
                    {receipt.Status == 1 ? "Success" : receipt.Status == 0 ? "Cancel" : "Wait..."}
            </td>
        </tr>
    )
}

export default BaseItemTable;