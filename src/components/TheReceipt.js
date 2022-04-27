import React, { useState } from 'react';
import BaseInputIcon from '../components/Base/BaseInputIcon'
import {FaUndoAlt} from "react-icons/fa"
import BaseGridTable from './Base/BaseGridTable';
import { Receipt } from '../Entity/entity';
import TheDetailReceipt from './TheDetailReceipt';
import "../css/TheReceipt.css"

const TheReceipt = () => {

    const [isShowDetail,setIsShowDetail] = useState(false)
    const [receiptId,setReceiptId] = useState(null)
    const [refresh,setRefresh] = useState(false)

    const handleToggleEdit = (id) => {
        setReceiptId(id)
        setIsShowDetail(true)
    }

    return (
        <div className="theReceipt">
            {isShowDetail ? <TheDetailReceipt setShowDetail={setIsShowDetail} id={receiptId} /> : null}

            <div className="theReceiptTitle">Danh sách đơn hàng</div>

            <div className="theReceiptFunc">
                <BaseInputIcon />

                <div className="theReceiptIconButtonWrapper">
                    <div onClick={() => setRefresh(!refresh)} className="theReceiptIconButton">
                        <FaUndoAlt size={20} />
                    </div>
                </div>
            </div>

            <BaseGridTable 
                entityApi="Receipt" 
                entity={Receipt} 
                refresh={refresh} 
                handleToggleEdit={handleToggleEdit} 
            />
        </div>
    );
};

export default TheReceipt;