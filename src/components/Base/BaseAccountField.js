import React from 'react';
import PropTypes from 'prop-types';
import BaseRadioItem from './BaseRadioItem';
import "../../css/Base/BaseAccountField.css"

const BaseAccountField = props => {
    const {title,value,method,disabled,type} = props
    const listItem = [{display:"Nam",value:0},{display:"Nữ",value:1}]

    return (
        <div className="baseAccountField">
            <div className="accountFieldTitle">{title} : </div>

            {
                type === 'text' ?
                    <input 
                        value={value} 
                        onChange={(val) => method(val.target.value)} 
                        type="text" 
                        className="accountField" 
                        disabled={disabled}
                    />
                : type === 'email' ?
                    <input 
                        value={value} 
                        onChange={(val) => method(val.target.value)}
                        type="email" 
                        className="accountField" 
                        disabled={true}
                    />
                : type == 'date' ?
                    <input 
                        value={value} 
                        onChange={(val) => method(val.target.value)} 
                        type="date" 
                        className="accountField" 
                        disabled={disabled}
                        style={{"cursor":"pointer"}}
                    />
                : type == 'radio' && !disabled ?
                    <>
                        <div className="radioGroupContainer" style={{"margin":"8px 0px"}}>
                            <div className="radioGroupWrapper">
                            {
                                listItem.map((radioItem,index) => 
                                    <BaseRadioItem 
                                        setSelected={method} 
                                        isSelected={value == radioItem.value} 
                                        size={16} 
                                        key={index} 
                                        radioItem={radioItem} 
                                        dpColor="#000"
                                    />)
                            }
                            </div>

                        </div>
                    </>

                : type == 'radio' && disabled ?
                    <input 
                        value={value == 0 ? "Nam" : "Nữ"} 
                        onChange={(val) => method(val.target.value)} 
                        type="text" 
                        className="accountField" 
                        disabled={disabled}
                    />
                : null 
                
            }
        </div>
    );
};

BaseAccountField.propTypes = {
    
};

export default React.memo(BaseAccountField)