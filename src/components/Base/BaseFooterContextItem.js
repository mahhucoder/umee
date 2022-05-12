import React from 'react';
import "../../css/Base/BaseFooterContextItem.css"

const BaseFooterContextItem = (props) => {
    return (
        <div className="footerContextItem">
            {props.text}
        </div>
    );
};

export default React.memo(BaseFooterContextItem);