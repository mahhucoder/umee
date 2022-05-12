import React from 'react';
import PropTypes from 'prop-types';
import "../../css/Base/BaseMenuItem.css"

const BaseMenuItem = props => {

    const {category,method} = props

    return (
        <div onClick={method} className="baseMenuItem">
            {category["CategoryName"]}
        </div>
    );
};

BaseMenuItem.propTypes = {
    category: PropTypes.object
};

export default React.memo(BaseMenuItem);