import React from 'react';
import "../../css/Base/BaseHeaderContextItem.css"

const BaseHeaderContextItem = (props) => {

    const {text} = props

    return (
        <div className="baseHeaderContextItem">
            {text}
        </div>
    );
};

export default BaseHeaderContextItem;