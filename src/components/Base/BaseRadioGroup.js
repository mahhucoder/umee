import React, { useState } from 'react';
import PropTypes from 'prop-types';
import BaseRadioItem from './BaseRadioItem';
import "../../css/Base/BaseRadioGroup.css"

const BaseRadioGroup = props => {

    const {title,titleColor,size,listItem,value,changeValue,style} = props

    return (
        <div className="radioGroupContainer" style={style}>
            <div className="radioGroupTitle" style={{"color":titleColor}}>{title} :</div>

            <div className="radioGroupWrapper">
            {
                listItem.map((radioItem,index) => 
                    <BaseRadioItem 
                        setSelected={changeValue} 
                        isSelected={value == radioItem.value} 
                        size={size} 
                        key={index} 
                        radioItem={radioItem} 
                    />)
            }
            </div>

        </div>
    );
};

BaseRadioGroup.propTypes = {
    title: PropTypes.string.isRequired,
    size: PropTypes.number,
    listItem: PropTypes.array.isRequired
};

export default React.memo(BaseRadioGroup);