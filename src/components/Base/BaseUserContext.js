import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import "../../css/Base/BaseUserContext.css"
import { UserContext } from '../../Context/UserContext';
import { useNavigate } from 'react-router-dom';

const TheUserContext = props => {

    const {isSigned} = props
    const {logout} = useContext(UserContext)
    const navigate = useNavigate()

    return (
        <div className="userContext">
            {
                isSigned ? 
                <><div className="userContextItem">Tài khoản</div>
                <div onClick={logout} className="userContextItem">Đăng xuất</div></>
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