import React,{useContext, useState} from 'react';
import "../../css/Layout/Header.css"
import BaseHeaderContextItem from '../Base/BaseHeaderContextItem';
import BaseInputIcon from '../Base/BaseInputIcon';
import {FaUser, FaCartPlus} from "react-icons/fa"
import BaseMenuDrop from '../Base/BaseMenuDrop';
import BaseUserContent from '../Base/BaseUserContext'
import {UserContext} from "../../Context/UserContext"
import { useNavigate } from 'react-router-dom';
import avt from "../../source/images_webUMEE/avatar_male.png"
import TheCartProduct from '../TheCartProduct';

const Header = () => {

    const [showCart,setShowCart] = useState(false);
    const {user} = useContext(UserContext)
    const navigate = useNavigate()

    return (

        <div className="headerContainer">
            {showCart ? <TheCartProduct setShowCart={setShowCart} /> : null}
            {user != null && user.Admin == 1 
                ? 
                    <>
                        <div className="headerLogoWrapper">
                            <div className="headerLogo"></div>
                        </div>

                        <div className="headerText">
                            <div className="headerShopName">Shop bán đàn UMEE</div>
                            <div className="headerAdminName">{user.Name}</div>
                        </div>
                    </>
                : 
                <>
                    <div onClick={() => navigate("/")} className="headerLogoWrapper">
                        <div className="headerLogo"></div>
                    </div>

                    <div className="headerContext">
                        <div 
                            // onClick={() => navigate("/category")} 
                            className="headerContextCategory"
                        >
                            <BaseHeaderContextItem text="Danh mục sản phẩm" />
                            <BaseMenuDrop />
                        </div>

                        <div onClick={() => navigate("/category/accessory")}>
                            <BaseHeaderContextItem text="Phụ kiện" />
                        </div>

                        <div onClick={() => navigate("/news")}>
                            <BaseHeaderContextItem text="Tin tức" />
                        </div>

                        <div onClick={() => navigate("/request")}>
                            <BaseHeaderContextItem text="Hỗ trợ" />
                        </div>
                    </div>

                    <div className="headerSearchInput">
                        <BaseInputIcon />
                    </div>

                    <div className="headerUser">
                        {user ? <div style={{backgroundImage:`url(${user.photoURL ? user.photoURL : avt})`}} className="userAvatar"></div> : <FaUser color="white" size={24} />}
                        
                        <BaseUserContent isSigned={user != null} className="userContext" />
                    </div>

                    <div onClick={() => setShowCart(true)} className="headerCart">
                        <FaCartPlus size={24} color="white" />
                    </div>
                </>
            }
        </div>

        
    );
};

export default Header;