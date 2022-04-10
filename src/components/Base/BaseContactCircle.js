import React from 'react';
import {FaCommentAlt, FaPhoneAlt} from 'react-icons/fa'
import "../../css/Base/BaseContactCircle.css"

const BaseContactCircle = (props) => {

    const {type} = props

    return (
        <div className="baseContactCircle">
            <div className="baseContactCircleBorder">
                {type == "call" ? <FaPhoneAlt size={28} /> : type == "message" ? <FaCommentAlt size={28} /> : null}
            </div>
        </div>
    );
};

export default BaseContactCircle;