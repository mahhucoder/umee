import React, { useEffect, useState } from 'react';
import "../../css/Base/BaseDropDown.css"
import {FaExclamation,FaAngleDown} from 'react-icons/fa'

const BaseDropdown = (props) => {

    const {title,width,titleColor,name,formik,list} = props
    const [isShow,setIsShow] = useState(false)
    const [text,setText] = useState('')

    const handleSelectItem = (item) => {
        setText(item["display"])
        formik.values[name] = item["value"]
        setIsShow(false)
    }

    useEffect(() => {

        const value = formik.values[name]

        const itemSelected = list.find(item => item.value == value)

        if(itemSelected) {
            setText(itemSelected["display"])
        }

    },[list])

    return (
        <div className="baseDropDown">
            <div className="baseDropDownTitle">{title} : </div>
            <div style={{width:width}} className="baseDropDownInputWrapper">
                <input 
                    name={name} 
                    type="text" 
                    className="baseDropDownInput" 
                    value={text}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />

                <div onClick={() => setIsShow(!isShow)} className="baseDropDownArrow">
                    <FaAngleDown size={24} />
                </div>

                <div style={{display:isShow ? 'block' : 'none'}} className="baseDropDownList">
                    {
                        list.map((item, index) => 
                            <div 
                                key={index} 
                                onClick={() => handleSelectItem(item)} 
                                className="baseDropDownItem"
                            >
                                {item["display"]}
                            </div>)
                    }
                </div>
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

export default BaseDropdown