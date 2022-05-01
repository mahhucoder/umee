import React, { useContext, useState } from 'react';
import { SlidingPebbles } from 'react-spinner-animated';
import "../css/views/Request.css"
import {FaMapMarkerAlt,FaPhoneAlt,FaEnvelope} from 'react-icons/fa'
import BaseInputField from "../components/Base/BaseInputField"
import BaseTextArea from "../components/Base/BaseTextArea"
import BaseButton from "../components/Base/BaseButton"
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { DataBaseContext } from '../Context/DataBase';
import { useNavigate } from 'react-router-dom';

const RequestPage = () => {

    const [isLoading,setIsLoading] = useState(false)
    const {insertEntity} = useContext(DataBaseContext)
    const navigate = useNavigate()

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const requestFormik = useFormik({
        initialValues:{
            name:'',
            phoneNumber:'',
            content:'',
        },

        validationSchema:Yup.object({
            name:Yup.string().required("Không được để trống !"),
            phoneNumber: Yup.string().matches(phoneRegExp, 'Trông không giống số điện thoại lắm nhỉ !')
                .min(10,"Số điện thoại có 10 số !")
                .required("Không được để trống !"),
            content:Yup.string().required("Không được để trống !")
        }),

        onSubmit:values => {
            setIsLoading(true);

            const newRequest = {
                "requestId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "name": values.name,
                "phoneNumber": values.phoneNumber,
                "content": values.content,
                "createdAt": new Date(Date.now())
            }

            insertEntity("Request",newRequest)
                .then(res => {
                    console.log(res)
                    setIsLoading(false)
                    alert("Yêu cầu hỗ trợ đã được ghi lại. Chúng tôi sẽ liên hệ với bạn sớm nhất !")
                    navigate("/")
                }).catch(err => console.log(err))
        }
    })

    return (
        <div className="requestPageContainer">

            {isLoading ? 
                <div className="loading">
                    <SlidingPebbles color="white" text="Chờ xíu nhoa <3" bgColor="#A62B4D" />
                </div>
                : null
            }

            <div className="requestPageHeader">
                Trang chủ &gt; Yêu cầu hỗ trợ
            </div>

            <div className="requestPageTitle">Hỗ trợ</div>

            <div className="requestContent">
                <div className="requestPageInfo">
                    <div className="requestGreeting">
                        Chào mừng bạn đến với Website của Shop UMEE. Cảm ơn các bạn đã dành thời gian tìm hiểu 
                        về những sản phẩm của UMEE . Hãy liên hệ với Shop đàn UMEE , chúng tôi sẽ hỗ trợ bạn.
                    </div>
                    <div className="requestGreeting">
                        Bạn đã chơi guitar một thời gian và muốn tìm một cây đàn guitar phù hợp hơn với mình ?
                    </div>
                    <div className="requestGreeting">
                        Hãy liên hệ ngay cho chúng tôi…!
                    </div>
                
                    <div className="requestInfoItem">
                        <div className="requestInfoItemIcon"><FaMapMarkerAlt size={24} /></div>
                        <div className="requestInfoItemText">99 Nguyên Xá , phường Minh Khai , quận Bắc Từ Liêm, Hà Nội</div>
                    </div>

                    <div className="requestInfoItem">
                        <div className="requestInfoItemIcon"><FaPhoneAlt size={24} /></div>
                        <div className="requestInfoItemText">0354668668 ( Mr Mee )</div>
                    </div>

                    <div className="requestInfoItem">
                        <div className="requestInfoItemIcon"><FaEnvelope size={24} /></div>
                        <div className="requestInfoItemText">umeeshop@gmail.com</div>
                    </div>
                </div>

                <div className="requestForm">
                    <BaseInputField name="name" width={240} type="text" titleColor="#000" title="Họ và tên" formik={requestFormik} />
                    <BaseInputField name="phoneNumber" width={240} type="text" titleColor="#000" title="Số điện thoại" formik={requestFormik}/>
                    <BaseTextArea title="Nội dung" width="100%" height={200} formik={requestFormik} name="content" />
                    <BaseButton method={requestFormik.handleSubmit} style={{marginTop:"16px"}} width={120} color="#fff" text="Gửi"/>    
                </div>
            </div>
        </div>
    );
};

export default RequestPage;