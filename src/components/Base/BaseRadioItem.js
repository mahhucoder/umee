import React, { useState } from 'react';
import PropTypes from 'prop-types';
import "../../css/Base/BaseRadioItem.css"

const BaseRadioItem = props => {

    const {radioItem,size,dpColor,isSelected,setSelected} = props;

    // console.log(isSelected)

    return (
        <div onClick={() => setSelected(radioItem.value)} className="baseRadioItemWrapper">
            <div style={{"color":dpColor}} className="baseRadioItemDisplay">{radioItem.display}</div>
            <div style={{"width":`${size}px`, "height":`${size}px`,"borderColor":dpColor}} className="baseRadioItem">
                <div style={{"backgroundColor":dpColor}} className={isSelected ? "baseRadioItemInside baseRadioItemSelected" : "baseRadioItemInside"}></div>
            </div>
        </div>
    );
};

BaseRadioItem.propTypes = {
    isSelected: PropTypes.bool
};

export default React.memo(BaseRadioItem);