import React from 'react';
import PropTypes from 'prop-types';
import "../../css/Base/BaseInputField.css"
import { FaExclamation } from "react-icons/fa";
import accounting from 'accounting'

const BaseInputField = props => {

    const {name, width,type,formik,title,titleColor,height} = props;

    return (
        <div style={{"width":width+"px"}} className="inputFieldWrapper">
            <div style={{color: titleColor}} className="inputFieldTitle">{title} :</div>
            <div style={{display:"flex"}}>
                {name == "Price" ? <div className="inputFieldPrice">
                    {accounting.formatMoney(formik.values[name], "₫ ", 0)}
                </div> : null}
                <input
                    min={0}
                    name={name}
                    type={type} 
                    value={formik.values[name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={{"width":width+"px","height":height+"px",paddingLeft:name == "Price" ? "136px" : "10px"}}
                    className="inputField"
                />
            </div>

            {formik.touched[name] && formik.errors[name] ? <>
                <div className="invalidMsg">{formik.errors[name]}</div>
                <div className="inputIconVAlid">
                    <FaExclamation color="red" />
                </div>
            </> : null}

        </div>
    );
};

BaseInputField.propTypes = {
  title: PropTypes.string,
  width: PropTypes.number,
  type: PropTypes.string,
  formik: PropTypes.object.isRequired
};

export default React.memo(BaseInputField);