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

            <div className="info">
                <div className="infoBorder">
                    {type == "message" ? "umee@gmail.com" : "0988.6868.8888"}
                </div>
            </div>
        </div>
    );
};

export default React.memo(BaseContactCircle);