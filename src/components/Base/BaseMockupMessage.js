import React from 'react';
import "../../css/Base/BaseMockupMessage.css"
import {FaRegLaugh} from 'react-icons/fa'

const BaseMockupMessage = (props) => {

    return (
        <div style={{...props.style}} className="baseMockupMessage">
            <div className="baseMockupIcon">
                <FaRegLaugh color="#A62B4D" size={24} />
            </div>
            
            <div className="baseMockupText">
                {props.text}
            </div>
        </div>
    );
};

export default BaseMockupMessage;