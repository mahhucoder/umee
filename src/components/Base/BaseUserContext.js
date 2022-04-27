import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import "../../css/Base/BaseUserContext.css"
import { UserContext } from '../../Context/UserContext';
import { useNavigate } from 'react-router-dom';

const TheUserContext = props => {

    const {isSigned} = props
    const {logout,user} = useContext(UserContext)
    const navigate = useNavigate()
    const {resetPassword} = useContext(UserContext)

    const changePassword = () => {
        resetPassword()
            .then(() => {
                alert("Kiểm tra email để đặt mật khẩu mới.")
                navigate("/")
            }).catch(err => console.log(err))
    }

    return (
        <div className="userContext">
            {
                isSigned ? 
                <>
                    {user.Admin == 1 ? <div onClick={() => navigate("/admin/category")} className="userContextItem">Quản lý</div> : <div onClick={() => navigate("/account")} className="userContextItem">Tài khoản</div>}
                    <div onClick={changePassword} className="userContextItem">Đổi mật khẩu</div>
                    <div onClick={() => {
                        logout()
                            .then(() => navigate("/"))
                            .catch((e) => console.log(e))
                    }} className="userContextItem">Đăng xuất</div>
                </>
                :
                <><div onClick={() => navigate("/login")} className="userContextItem">Đăng nhập</div>
                <div onClick={() => navigate("/register")} className="userContextItem">Đăng ký</div></>
            } 
        </div>
    );
};

TheUserContext.propTypes = {
    isSigned: PropTypes.bool.isRequired
};

export default TheUserContext;