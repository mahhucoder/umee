import React from 'react';
import { FaExclamation } from "react-icons/fa";
import "../../css/Base/BaseTextArea.css"

const BaseTextArea = (props) => {

    const {title,width,height,formik,name} = props;

    return (
        <div className="baseTextAreaWrapper">
            <div className="baseTextAreaTitle">{title}</div>
        
            <textarea 
                name={name} 
                style={{"width":width, "height":height}} 
                className="baseTextArea" 
                value={formik.values[name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
            />

            {formik.touched[name] && formik.errors[name] ? <>
                <div className="invalidMsg">{formik.errors[name]}</div>
                <div className="inputIconVAlid">
                    <FaExclamation color="red" />
                </div>
            </> : null}
        </div>
    );
};

export default React.memo(BaseTextArea);