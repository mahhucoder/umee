import React from 'react';
import PropTypes from 'prop-types';
import "../../css/Base/BaseButton.css"

const BaseButton = props => {
    
    const {text,method,width,bgColor,color,border,style} = props
    
    return (
        <div style={{"width":width+"px","backgroundColor":bgColor,"color":color,border:border ? border : "none",...style}} 
            onClick={method} className="baseButton"
        >
            {text}
        </div>
    );
};

BaseButton.propTypes = {
    text: PropTypes.string,
    method: PropTypes.func,
    width: PropTypes.number
};

export default React.memo(BaseButton);