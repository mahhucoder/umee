import React from 'react';
import { Link } from 'react-router-dom';
import "../css/NotFound.css"

const NotFound = () => {

    return (
        <div className="notFound">
            <div className="notFoundTitle">404</div>
            <div className="notFoundMsg">
                Trang này không tồn tại. Bạn có thể quay trở về <Link to="/">Trang Chủ</Link>
            </div>
        </div>   
    )
};

export default NotFound;