import React from 'react';
import PropTypes from 'prop-types';

const BaseItemTable = props => {

    const {receipt,sumMoney} = props

    return (
        <tr>
            <td className="text-align-center">{receipt.ReceiptId}</td>
            <td className="text-align-center">{receipt.ReceiverName}</td>
            <td className="text-align-center">{receipt.PhoneNumber}</td>
            <td className="text-align-center">{receipt.Address}</td>
            <td className="text-align-center">{receipt.CreatedAt.slice(0,10)}</td>
            <td className="text-align-center">{receipt.TransportFee}</td>
            <td 
                style={{"color" : receipt.Status == 1 ? "green" : receipt.Status == 0 ? "red" : 'rgb(206, 115, 24)'}} 
                className="text-align-center">
                    {receipt.Status == 1 ? "Success" : receipt.Status == 0 ? "Cancel" : "Wait..."}
            </td>
            <td className="text-align-center">{sumMoney}</td>
        </tr>
    )
};

BaseItemTable.propTypes = {
    
};

export default BaseItemTable;