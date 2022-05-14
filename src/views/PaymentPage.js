import React, { useContext, useEffect, useState } from 'react';
import { SlidingPebbles } from 'react-spinner-animated';
import { DataBaseContext } from '../Context/DataBase';
import "../css/views/PaymentPage.css"
import BaseInputField from '../components/Base/BaseInputField'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import BaseAddressDrop from '../components/Base/BaseAddressDrop';
import BaseProductInFormReceipt from '../components/Base/BaseProductInFormReceipt';
import BaseButton from '../components/Base/BaseButton';
import { useNavigate, useParams } from 'react-router-dom';
import accounting from 'accounting'
import Guid from 'guid'
import {UserContext} from "../Context/UserContext"

const PaymentPage = () => {

    const {listIdInCart,getServiceShip,getShipFee,insertEntity,updateAmount,setMessage,setShowMessage} = useContext(DataBaseContext)
    const {user} = useContext(UserContext)
    const [isLoading,setIsLoading] = useState(false)
    const [province,setProvince] = useState({display:'',id:''})
    const [district,setDistrict] = useState({display:'',id:''})
    const [ward,setWard] = useState({display:'',id:''})
    const [listService,setListService] = useState(null)
    const [service_id,setService_id] = useState(null)
    const [shipFee,setShipFee] = useState(0)
    const [listProduct,setListProduct] = useState([])
    const [listId,setListId] = useState([])
    const navigate = useNavigate()

    const {id} = useParams()

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const paymentFormik = useFormik({
        initialValues:{
            receiverName:'',
            address:'',
            phoneNumber:''
        },

        validationSchema:Yup.object({
            receiverName:Yup.string().required("Bạn phải nhập tên người nhận"),
            address:Yup.string().required("Bạn cần nhập địa chỉ nhận hàng."),
            phoneNumber:Yup.string().matches(phoneRegExp, 'Trông không giống số điện thoại lắm nhỉ !')
                            .min(10,"Số điện thoại có 10 số !")
                            .required("Không được để trống !")
        }),

        onSubmit:async values => {
            if(shipFee == 0)
                alert("Vui lòng chọn các địa chỉ !")
            
            setIsLoading(true)

            const receiptId = Guid.create().value
            const newReceipt = {
                "receiptId": receiptId,
                "accountId": user ? user["AccountId"] : null,
                "createdAt": new Date(Date.now()),
                "status": null,
                "transportFee": shipFee,
                "receiverName": values.receiverName,
                "address": values.address,
                "phoneNumber": values.phoneNumber,
            }
            
            insertEntity("Receipt",newReceipt)
            .then((res) => {
                if(res == 1){
                    if(!id){
                        sessionStorage.removeItem("product_id")
                    }
                    
                    finalReceipt(receiptId)
                }
                
            }).catch(e => {
                console.log(e);
            })
        }
    })
    
    const finalReceipt = (id) => {
        const promises = []

        listProduct.forEach((prd) => {
            const newReceiptDetail = {
                "receiptId": id,
                "productId": prd["id"],
                "price": prd["price"],
                "amount": prd["amount"]
              }
              
            const insertReceiptDetail = insertEntity("ReceiptDetail",newReceiptDetail)
            const update = updateAmount(prd["id"], -prd["amount"])
            promises.push(insertReceiptDetail)
            promises.push(update)
        })

        Promise.all(promises).then((res) =>{
            setMessage("Bạn đã đặt hàng thành công !")
            setShowMessage(true)

            setTimeout(() => {
                setShowMessage(false)
            },3000)

            setIsLoading(false)
            navigate("/")
        }).catch(err => console.log(err))
    }

    const calcBill = () => {
        let money = 0
        listProduct.forEach(product => {
            money += product["price"]*product["amount"]
        })

        return money
    }

    const handleSelectProvince = (province) => {
        setProvince(province)
        setDistrict({display:'',id:''})
        setWard({display:'',id:''})
        setShipFee(0)
        setListService(null)
        setService_id(null)
    }

    const handleSelectDistrict = (district) => {
        setDistrict(district)
        setService_id(null)
        setShipFee(0)
        setWard({display:'',id:''})
        getServiceShip(district["id"])
                .then((ship) => {
                    setListService(ship)
                }).catch((error) => {
                    console.log(error)
                })
    }

    const handleSelectWard = (ward) => {
        setWard(ward)
    }

    const handleSelectService = (id) => {
        setService_id(id)

        getShipFee(id,2000000,district["id"],ward["id"])
            .then((fees) => {
                setShipFee(fees.total)
            })
    }

    useEffect(() => {

        if(!id)
            setListId(listIdInCart)
        else
            setListId([id])

    },[id])

    return (
        <div className="paymentPageContainer">

            {isLoading ? 
                <div className="loading">
                    <SlidingPebbles color="white" text="Chờ xíu nhoa <3" bgColor="#A62B4D" />
                </div>
                : null
            }

            <div className="paymentPageHeader">
                Trang chủ &gt; Thanh Toán
            </div>

            <div className="paymentPageForm">
                <div className="paymentFormTitle">Đơn hàng</div>

                <div className="paymentForm">
                    <div className="paymentFormLeft">
                        <BaseInputField name="receiverName" width={280} type="text" titleColor="#000" title="Họ và tên" formik={paymentFormik} />
                        <BaseInputField name="phoneNumber" width={280} type="text" titleColor="#000" title="Số điện thoại" formik={paymentFormik} />
                    </div>
                    
                    <div className="paymentFormRight">
                        <div className="paymentAddressDetail">
                            <BaseAddressDrop addressSelected={province} setAddressSelected={handleSelectProvince} title="Tỉnh/TP" range="province" />
                            <BaseAddressDrop addressSelected={district} setAddressSelected={handleSelectDistrict} title="Quận/Huyện" province={province} range="district" />
                            <BaseAddressDrop addressSelected={ward} setAddressSelected={handleSelectWard} title="Phường/Xã" district={district} range="ward" />
                        </div>
                        <BaseInputField name="address" width={280} type="text" titleColor="#000" title="Địa chỉ chi tiết" formik={paymentFormik} />
                    </div>
                </div>

                <hr />
            
                <div className="paymentPageListProduct">
                    {
                        listId.map((id,index) => 
                            <BaseProductInFormReceipt listProduct={listProduct} setListProduct={setListProduct} key={index} id={id} />
                        )
                    }
                </div>
            
                <hr />

                <div className="paymentPageService">
                    {listService ? <div>Mời bạn chọn phương thức ship</div> : null}

                    {listService ?
                        listService.map((service,index) => 
                        <div key={index} className="paymentServiceITem">
                            <div onClick={() => handleSelectService(service["service_id"])} className="paymentServiceCheckbox">
                                <div style={{display: service_id == service["service_id"] ? "block" : "none"}} className="paymentServiceCheckboxInside"></div>
                            </div>

                            <div className="paymentServiceText">{service["short_name"]}</div>
                        </div>)
                    
                    : null}
                </div>

                <hr />

                <div className="paymentPageMoney">
                    <div className="paymentSumProduct">
                        <p>Giá trị đơn hàng : </p><p className="money">{accounting.formatMoney(calcBill(), { symbol: "VNĐ",  format: "%v %s" })}</p>
                    </div>
                    <div className="paymentShipFee">
                        <p>Phí ship : </p><p className="money">{accounting.formatMoney(shipFee, { symbol: "VNĐ",  format: "%v %s" })}</p>
                    </div>
                    <div className="paymentTotal">
                        <p>Tổng tiền : </p><p className="money">{accounting.formatMoney(shipFee + calcBill(), { symbol: "VNĐ",  format: "%v %s" })}</p>
                    </div>
                </div>

                <hr/>

                <BaseButton method={paymentFormik.handleSubmit} color="#fff" text="Hoàn thành đơn hàng" />
            </div>

        </div>
    );
};

export default PaymentPage;