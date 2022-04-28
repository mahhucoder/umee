import React, { useContext, useState } from 'react';
import BaseInputIcon from '../components/Base/BaseInputIcon'
import {FaUndoAlt} from "react-icons/fa"
import BaseGridTable from './Base/BaseGridTable';
import { Receipt } from '../Entity/entity';
import TheDetailReceipt from './TheDetailReceipt';
import "../css/TheReceipt.css"
import {FaTrash,FaInfo} from "react-icons/fa"
import { DataBaseContext } from '../Context/DataBase';
import { SlidingPebbles } from 'react-spinner-animated';

const TheReceipt = () => {

    const [isShowDetail,setIsShowDetail] = useState(false)
    const [receiptId,setReceiptId] = useState(null)
    const [refresh,setRefresh] = useState(false)
    const [listReceiptSelected,setListReceiptSelected] = useState([])
    const [isShowTrash,setIsShowTrash] = useState(false)
    const {deleteEntity} = useContext(DataBaseContext)
    const [isLoading,setIsLoading] = useState(false)

    const handleToggleEdit = (id) => {
        setReceiptId(id)
    }

    const handleDeleteReceipt = () => {
        const promisesDetail = []
        const promisesReceipt = []
        setIsLoading(true)

        if(listReceiptSelected.length > 0){
            listReceiptSelected.forEach(receipt => {
                const deleteDetail = deleteEntity("ReceiptDetail",receipt["ReceiptId"])
                const deleteReceipt = deleteEntity("Receipt",receipt["ReceiptId"])

                promisesDetail.push(deleteDetail)
                promisesReceipt.push(deleteReceipt)
            })

            Promise.all(promisesDetail)
                .then(() => {
                    Promise.all(promisesReceipt)
                        .then(() => {
                            setIsLoading(false)
                            setRefresh(pre => !pre)
                        })
                })
                .catch((e) => console.log(e))
        }
    }

    return (
        <div className="theReceipt">
            {isShowDetail ? <TheDetailReceipt setRefresh={setRefresh} setShowDetail={setIsShowDetail} id={receiptId} /> : null}

            {isLoading ? 
                <div className="loading">
                    <SlidingPebbles color="white" text="Chờ xíu nhoa <3" bgColor="#A62B4D" />
                </div>
                : null
            }

            <div className="theReceiptTitle">Danh sách đơn hàng</div>

            <div className="theReceiptFunc">
                <BaseInputIcon />

                <div className="theReceiptIconButtonWrapper">

                <div onClick={() => setIsShowDetail(true)} style={{"display":receiptId ? "flex" : "none"}} className="theCategoryIconButton">
                        <FaInfo size={20} />
                    </div>

                    <div onClick={handleDeleteReceipt} style={{"display":isShowTrash ? "flex" : "none"}} className="theProductIconButton">
                        <FaTrash size={20} />
                    </div>

                    <div onClick={() => setRefresh(!refresh)} className="theReceiptIconButton">
                        <FaUndoAlt size={20} />
                    </div>
                </div>
            </div>

            <BaseGridTable 
                setIdPreview={setReceiptId}
                showTrash={setIsShowTrash} 
                setListItem={setListReceiptSelected}
                listItemSelected={listReceiptSelected}
                entityApi="Receipt" 
                entity={Receipt} 
                refresh={refresh} 
                handleToggleEdit={handleToggleEdit} 
            />
        </div>
    );
};

export default TheReceipt;