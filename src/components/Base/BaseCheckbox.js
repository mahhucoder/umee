import React from 'react';
import "../../css/Base/BaseCheckbox.css"

const BaseCheckbox = (props) => {
    const {title,isChecked,setChecked} = props

    return (
        <div className="baseCheckbox">
            <div className="baseCheckboxTitle">
                {title}
            </div>

            <div onClick={() => setChecked(!isChecked)} className="baseCheckboxBorder">
                <div style={{display: isChecked ? 'block' : 'none'}} className="baseCheckboxInside"></div>
            </div>
        </div>
    );
};

export default React.memo(BaseCheckbox);