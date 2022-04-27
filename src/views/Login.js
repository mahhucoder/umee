import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BaseButton from '../components/Base/BaseButton';
import BaseInputField from '../components/Base/BaseInputField';
import BaseSocialButton from '../components/Base/BaseSocialButton';
import { UserContext } from '../Context/UserContext';
import "../css/views/Login.css"
import * as Yup from "yup"
import { SlidingPebbles } from 'react-spinner-animated';
import 'react-spinner-animated/dist/index.css'

const TheLogin = () => {

    const {loginWithEmailAndPassword,resetPassword,user} = useContext(UserContext)

    const navigate = useNavigate()
    const [errorMsg,setErrorMessage] = useState('')
    const [isLoading,setIsLoading] = useState(false)

    const forgotPassword = (email) => {
        if(email && !loginFormik.errors.email){
            return resetPassword(email)
        }

        alert("Bạn hãy điền email để lấy lại mật khẩu !")
    }

    const loginFormik = useFormik({
        initialValues:{
            email:'',
            password:'',
        },

        validationSchema:Yup.object({
            email:Yup.string().required("Bạn cần nhập email").email("Email không đúng định dạng !"),
            password:Yup.string().required("Bạn cần điền mật khẩu")
        }),

        onSubmit:async function(values){
            setIsLoading(true)
            loginWithEmailAndPassword(values.email,values.password)
                .then(() => {
                    setIsLoading(false)
                    navigate("/")
                })
                .catch(err => {
                    if(err == "auth/wrong-password")
                        setErrorMessage("Sai mật khẩu")
                
                    if(err == "auth/network-request-failed")
                        alert("Kiểm tra kết nối mạng và thử lại !")
                    
                    setIsLoading(false)

                    console.log(err)
                })
        }
    })

    return (
        <div className="loginBackground">

            {isLoading ? 
                <div className="loading">
                    <SlidingPebbles color="white" text="Chờ xíu nhoa <3" bgColor="#A62B4D" />
                </div>
                : null
            }
            

            <div className="loginFormWrapper">
                <div className="loginTitle">ĐĂNG NHẬP</div>

                <div className="loginForm">
                    <BaseInputField 
                        width={340} 
                        type="email"
                        title="Email"
                        formik={loginFormik}
                        name="email"
                    />

                    <form onSubmit={loginFormik.handleSubmit}>
                        <BaseInputField  
                            width={340} 
                            type="password"
                            title="Mật khẩu"
                            formik={loginFormik}
                            name="password"
                        />
                    </form>

                    <div className="loginFuncExt">
                        <div onClick={() => forgotPassword(loginFormik.values.email)} className="loginForgotPassword">Quên mật khẩu ?</div>
                        <Link style={{"textDecoration":"none"}} to="/register">
                            <div className="loginNavigateRegister">Đăng ký</div>
                        </Link>
                    </div>

                    {errorMsg == '' ? null : <div className="invalidMsg">{errorMsg}</div>}

                    <div className="loginButtonWrapper">
                        <BaseButton method={loginFormik.handleSubmit} width={340} text="Đăng nhập" color="#fff" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TheLogin;