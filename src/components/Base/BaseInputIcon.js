import { FaSearch } from "react-icons/fa";
import React from 'react';
import "../../css/Base/BaseInputIcon.css"

const BaseInputIcon = () => {
    return (
        <form className="inputIconContainer">
            <div className="iconInput">
                <FaSearch size={24} color="#000" />
            </div>
            <input type="text" className="inputWithIcon" placeholder="Tìm kiếm" />
        </form>
    );
};

export default BaseInputIcon;