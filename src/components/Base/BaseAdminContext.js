import React from 'react';
import "../../css/Base/BaseAdminContext.css"
import {FaBuffer, FaGuitar, FaReceipt, FaHandsHelping} from "react-icons/fa"

const BaseAdminContext = (props) => {

    const {context,method} = props;

    return (
        <div onClick={method} className="baseAdminContext">
            <div className="adminContextDisplay">
                {context == "category" ? "Thể Loại" 
                : context == "product" ? "Sản Phẩm" 
                : context == "receipt" ? "Đơn Hàng" 
                : "Hỗ trợ"
                }
            </div>
        
            {context == "category" ? <FaBuffer /> 
                : context == "product" ? <FaGuitar />
                : context == "receipt" ? <FaReceipt />
                : <FaHandsHelping />
                }
        </div>
    );
};

export default BaseAdminContext;