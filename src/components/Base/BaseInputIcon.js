import { FaSearch } from "react-icons/fa";
import React from 'react';
import "../../css/Base/BaseInputIcon.css"

const BaseInputIcon = (props) => {
    const {value,setValue,method} = props

    const handleSubmit = (e) => {
        e.preventDefault()

        method()
    }

    return (
        <form onSubmit={handleSubmit} className="inputIconContainer">
            <div onClick={() => method()} className="iconInput">
                <FaSearch size={24} color="#000" />
            </div>
            <input value={value} onChange={e => setValue(e.target.value)} type="text" className="inputWithIcon" placeholder="Tìm kiếm" />
        </form>
    );
};

export default BaseInputIcon;