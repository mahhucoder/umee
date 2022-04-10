import React from 'react';
import PropTypes from 'prop-types';
import "../../css/Base/BaseDropdownItem.css"

const BaseDropdownItem = props => {

    const {text} = props

    return (
        <div className="baseDropdownItem">
            {text}
        </div>
    );
};

BaseDropdownItem.propTypes = {
    text: PropTypes.string.isRequired
};

export default BaseDropdownItem;