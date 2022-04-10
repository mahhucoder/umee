import React,{useContext} from 'react';
import "../../css/Layout/Header.css"
import BaseHeaderContextItem from '../Base/BaseHeaderContextItem';
import BaseInputIcon from '../Base/BaseInputIcon';
import {FaUser, FaCartPlus} from "react-icons/fa"
import BaseDropdown from '../Base/BaseDropdown';
import BaseUserContent from '../Base/BaseUserContext'
import {UserContext} from "../../Context/UserContext"
import { useNavigate } from 'react-router-dom';
import avt from "../../source/images_webUMEE/avatar_male.png"

const Header = () => {

    const {user} = useContext(UserContext)
    const navigate = useNavigate()

    return (
        <div className="headerContainer">
            <div onClick={() => navigate("/")} className="headerLogoWrapper">
                <div className="headerLogo"></div>
            </div>

            <div className="headerContext">
                <div className="headerContextCategory">
                    <BaseHeaderContextItem text="Danh mục sản phẩm" />
                    <BaseDropdown />
                </div>
                <BaseHeaderContextItem text="Phụ kiện" />
                <BaseHeaderContextItem text="Tin tức" />
                <BaseHeaderContextItem text="Hỗ trợ" />
            </div>

            <div className="headerSearchInput">
                <BaseInputIcon />
            </div>

            <div className="headerUser">
                {user ? <div style={{backgroundImage:`url(${user.photoURL ? user.photoURL : avt})`}} className="userAvatar"></div> : <FaUser color="white" size={24} />}
                
                <BaseUserContent isSigned={user != null} className="userContext" />
            </div>

            <div className="headerCart">
                <FaCartPlus size={24} color="white" />
            </div>
        </div>
    );
};

export default Header;