import React from 'react';
import { Route, Routes } from 'react-router-dom';
import "../../css/Layout/MainContent.css"
import HomePage from '../../views/HomePage';
import Login from "../../views/Login.js"
import Register from '../../views/Register';

const MainContent = () => {

    return (
        <div className="mainContentContainer">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    );
};

export default MainContent;