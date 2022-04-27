import React from 'react';
import PropTypes from 'prop-types';
import "../../css/Base/BaseMenuItem.css"

const BaseMenuItem = props => {

    const {text} = props

    return (
        <div className="baseMenuItem">
            {text}
        </div>
    );
};

BaseMenuItem.propTypes = {
    text: PropTypes.string.isRequired
};

export default BaseMenuItem;