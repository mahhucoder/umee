import React, { useContext } from 'react';
import "../../css/Layout/Admin.css"
import {UserContext} from "../../Context/UserContext.js"
import { Route, Routes, useNavigate } from 'react-router-dom';
import BaseAdminContext from '../Base/BaseAdminContext';
import TheCategory from '../TheCategory';
import TheProduct from '../TheProduct';
import TheReceipt from '../TheReceipt';
import TheRequest from '../TheRequest';
import {FaSignInAlt} from 'react-icons/fa'

const Admin = () => {

    const {user,logout} = useContext(UserContext)
    const adminContext = ["category","product","receipt","request"]
    const navigate = useNavigate()

    return (
        <div className="adminContainer">
            <div className="adminSlideBar">
                <div className="adminContext">
                    {adminContext.map((context,index) => <BaseAdminContext method={() => navigate("/admin/" + context)} key={index} context={context} />)}
                </div>

                <div className="adminLogout">
                    <div onClick={() => logout()
                            .then(() => navigate("/"))
                            .catch((e) => console.log(e))} className="adminLogoutText">Đăng Xuất</div>
                    <FaSignInAlt size={24} />
                </div>
            </div>

            <div className="adminContent">
                <Routes>
                    <Route path="/category" element={<TheCategory />}/>
                    <Route path="/product" element={<TheProduct />}/>
                    <Route path="/receipt" element={<TheReceipt />} />
                    <Route path="/request" element={<TheRequest />} />
                </Routes>
            </div>
        </div>
    );
};

export default Admin;