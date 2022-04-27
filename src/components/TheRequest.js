import React, { useState } from 'react';
import BaseInputIcon from './Base/BaseInputIcon';
import {FaUndoAlt} from "react-icons/fa"
import BaseGridTable from './Base/BaseGridTable';
import { Request } from '../Entity/entity';
import "../css/TheRequest.css"

const TheRequest = () => {
    const [refresh,setRefresh] = useState(false)
    
    return (
        <div className="theRequest">
            <div className="theRequestTitle">Danh sách yêu cầu hỗ trợ</div>

            <div className="theRequestFunc">
                <BaseInputIcon />

                <div className="theRequestIconButtonWrapper">
                    <div onClick={() => setRefresh(!refresh)} className="theRequestIconButton">
                        <FaUndoAlt size={20} />
                    </div>
                </div>
            </div>

            <BaseGridTable 
                entityApi="Request" 
                entity={Request} 
                refresh={refresh} 
            />
        </div>
    );
};

export default TheRequest;