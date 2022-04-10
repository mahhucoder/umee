import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BaseButton from '../components/Base/BaseButton';
import BaseDateInput from '../components/Base/BaseDateInput';
import BaseInputField from '../components/Base/BaseInputField';
import BaseRadioGroup from '../components/Base/BaseRadioGroup';
import { UserContext } from '../Context/UserContext';
import "../css/views/Register.css"
import * as Yup from "yup"
import { SlidingPebbles } from 'react-spinner-animated';

const Register = props => {

    const [gender,setGender] = useState(0)
    const [errorMsg,setErrorMsg] = useState('')

    const listRadioItem = [{display:"Nam",value:0},{display:"Nữ",value:1}]

    const {registerUser} = useContext(UserContext)
    const [isLoading,setIsLoading] = useState(false)
    const navigate = useNavigate()

    const registerFormik = useFormik({
        initialValues:{
            name:'',
            email:'',
            password:'',
            confirm:'',
            birthday:'',
        },

        validationSchema:Yup.object({
            name:Yup.string().required("Bạn cần nhập tên !"),
            email:Yup.string().required("Bạn cần nhập email !").email("Email không đúng định dạng !"),
            password:Yup.string().required("Bạn cần nhập mật khẩu !"),
            confirm:Yup.string().required("Bạn cần xác nhận mật khẩu !").oneOf([Yup.ref('password'),null],"Mật khẩu không khớp !"),
            birthday:Yup.date().required("Bạn cần chọn ngày sinh !").max(new Date(),"Lỗi ngày sinh !")
        }),

        onSubmit:async values => {
            const newUser = {...values,gender}
            setIsLoading(true)

            registerUser(newUser)
                .then(() => {
                    setIsLoading(false)
                    navigate("/")
                })
                .catch(err => {

                    if(err == "auth/email-already-in-use")
                        setErrorMsg("Email đã được sử dụng.")

                    setIsLoading(false)
                    
                    console.log(err)
                })
        }
    })

    return (
        <div className="registerBackground">

            {isLoading ? 
                <div className="loading">
                    <SlidingPebbles text="Chờ xíu nhoa <3" bgColor="#A62B4D" />
                </div>
                : null
            }

            <div className="registerFormWrapper">
                <div className="registerTitle">ĐĂNG KÝ</div>

                <div className="registerMessage">Nếu bạn chưa có tài khoản hay điền theo mẫu dưới đây để đăng ký</div>

                <div className="registerForm">

                    <div className="registerFormLeft">
                        <BaseInputField 
                            title="Họ tên" 
                            width={280} 
                            type="text" 
                            formik={registerFormik}
                            name="name"
                        />

                        <BaseInputField 
                            title="Email" 
                            width={280} 
                            type="email" 
                            formik={registerFormik}
                            name="email"
                        />

                        <BaseRadioGroup 
                            listItem={listRadioItem} 
                            value={gender} 
                            changeValue={setGender} 
                            size={16} 
                            title="Giới tính" 
                            titleColor="#fff" 
                            style={{"margin":"8px 0px"}}
                        />

                        <BaseDateInput 
                            title="Ngày sinh" 
                            width={280}
                            name="birthday"
                            formik={registerFormik}
                        />
                    </div>

                    <div className="registerFormRight">
                        <BaseInputField 
                            title="Mật khẩu" 
                            width={280} 
                            type="password" 
                            formik={registerFormik}
                            name="password"
                        />

                        <BaseInputField 
                            title="Xác nhận mật khẩu" 
                            width={280} 
                            type="password" 
                            formik={registerFormik}
                            name="confirm"
                        />

                        <div className="registerFormButton">
                            <BaseButton color="#fff" text="Đăng ký" width={280} method={registerFormik.handleSubmit} />
                            <Link style={{"textDecoration":"none"}} to="/login">
                                <BaseButton bgColor="#fff" color="#000" text="Đăng nhập" width={280} method={() => {}} />
                            </Link>
                        </div>
                    </div>
                </div>

                {errorMsg == '' ? null : <div className="invalidMsg">{errorMsg}</div>}
            </div>
        </div>
    );
};

Register.propTypes = {
    
};

export default Register;