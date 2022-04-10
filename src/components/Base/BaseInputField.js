import React from 'react';
import PropTypes from 'prop-types';
import "../../css/Base/BaseInputField.css"
import { FaExclamation } from "react-icons/fa";
import { Formik } from 'formik';

const BaseInputField = props => {

    const {name, width,type,formik,title} = props;

    return (
        <div className="inputFieldWrapper">
            <div className="inputFieldTitle">{title} :</div>
            <input
                name={name}
                value={formik.values[name]}
                type={type == "email" ? "email" : type == "password" ? "password" : "text"} 
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{"width":width+"px",}}
                className="inputField"
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

BaseInputField.propTypes = {
  title: PropTypes.string,
  width: PropTypes.number,
  type: PropTypes.string,
  formik: PropTypes.object.isRequired
};

export default BaseInputField;