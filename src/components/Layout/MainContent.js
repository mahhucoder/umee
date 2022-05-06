import React, { useContext, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import "../../css/Layout/MainContent.css"
import AccountPage from '../../views/AccountPage';
import HomePage from '../../views/HomePage';
import Login from "../../views/Login.js"
import Register from '../../views/Register';
import NotFound from '../NotFound';
import Admin from './Admin';
import NewsPage from '../../views/NewsPage';
import RequestPage from '../../views/RequestPage';
import CategoryPage from '../../views/CategoryPage'
import BaseMockupMessage from '../Base/BaseMockupMessage';
import { DataBaseContext } from '../../Context/DataBase';
import ProductPage from '../../views/ProductPage';
import PaymentPage from '../../views/PaymentPage';

const MainContent = () => {

    const {user} = useContext(UserContext)
    const {showMessage,message} = useContext(DataBaseContext)
    const navigate = useNavigate()

    useEffect(() => {

        if(user != null && user.Admin == 1){
            navigate("/admin/category")
        }

    },[user])

    return (
        <div className="mainContentContainer">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/request" element={<RequestPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="category/:CategoryId" element={<CategoryPage />} />
                <Route path="payment/:id" element={<PaymentPage />} />
                <Route path="payment" element={<PaymentPage />} />
                <Route path="/category" element={<CategoryPage />} />
                <Route path="/admin/*" element={<Admin />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <BaseMockupMessage 
                style={{display:showMessage ? "flex" : "none"}} 
                text={message} 
            />
        </div>
    );
};

export default MainContent;