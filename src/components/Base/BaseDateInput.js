import React from 'react';
import PropTypes from 'prop-types';
import "../../css/Base/BaseDateInput.css"

const BaseDateInput = props => {

    const {title,width,value,changeValue,formik,name} = props

    return (
        <div className="baseDateInputWrapper">
            <div className="baseDateInputTitle">{title}</div>
            <input 
                name={name ? name : ''} 
                value={formik.values[name]} 
                onChange={formik.handleChange} 
                style={{"width": width+"px"}} 
                type="date" 
                className="baseDateInput" 
                onBlur={formik.handleBlur}    
            />

            {formik.touched[name] && formik.errors[name] ? <div className="invalidMsg">{formik.errors[name]}</div> : null}     
        </div>
    );
};

BaseDateInput.propTypes = {
    title: PropTypes.string.isRequired,
    width: PropTypes.number
};

export default React.memo(BaseDateInput);