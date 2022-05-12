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
    const {deleteEntity,setMessage,setShowMessage,getReceiptDetails,updateAmount} = useContext(DataBaseContext)
    const [isLoading,setIsLoading] = useState(false)

    const handleToggleEdit = (id) => {
        setReceiptId(id)
    }

    const rollbackAmount = (id) => {
        return new Promise((resolve, reject) => {
            getReceiptDetails(id)
                .then(res => {
                    const promises = []
    
                    res.forEach(detail => {
                        const update = updateAmount(detail["ProductId"],detail["Amount"])
    
                        promises.push(update)
                    })
    
                    Promise.all(promises)
                        .then((res) => {
                            resolve(res)
                        }).catch((error) => reject(error))
                })
        })
    }

    const handleDeleteReceipt = () => {
        let textConfirm = "Bạn chắc chắn muốn xóa không ?"
        if(window.confirm(textConfirm)){
            const promisesDetail = []
        const promisesReceipt = []
        const promisesRollback = []

        setIsLoading(true)

        if(listReceiptSelected.length > 0){
            listReceiptSelected.forEach(receipt => {

                if(receipt["Status"]){
                    const rollback = rollbackAmount(receipt["ReceiptId"])

                    promisesRollback.push(rollback)
                }

                const deleteDetail = deleteEntity("ReceiptDetail",receipt["ReceiptId"])
                const deleteReceipt = deleteEntity("Receipt",receipt["ReceiptId"])

                promisesDetail.push(deleteDetail)
                promisesReceipt.push(deleteReceipt)
            })

            Promise.all(promisesDetail)
                .then(() => {
                    Promise.all([...promisesReceipt,...promisesRollback])
                        .then(() => {
                            setMessage(`Bạn đã xóa thành công ${listReceiptSelected.length} đơn hàng !`)
                            setShowMessage(true)
                
                            setTimeout(() => {
                                setShowMessage(false)
                            },3000)

                            setIsLoading(false)
                            setRefresh(pre => !pre)
                        })
                })
                .catch((e) => console.log(e))
            }
        }
    }

    return (
        <div className="theReceipt">
            {isShowDetail ? <TheDetailReceipt setListReceiptSelected={setListReceiptSelected}  setRefresh={setRefresh} setShowDetail={setIsShowDetail} id={receiptId} /> : null}

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

                <div onClick={() => setIsShowDetail(true)} style={{"display":receiptId && listReceiptSelected.length != 0 ? "flex" : "none"}} className="theCategoryIconButton">
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