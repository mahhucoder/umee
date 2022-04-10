import React from 'react';
import PropTypes from 'prop-types';
import "../../css/Base/BaseCategoryItem.css"

const BaseCategoryItem = props => {

    const {imageUrl,text} = props

    return (
        <div className="baseCategoryItem" style={{backgroundImage:`url(${imageUrl})`}}>
            <div className="baseCategoryBG">
                {text}
            </div>
        </div>
    );
};

BaseCategoryItem.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    text: PropTypes.string,
};

export default BaseCategoryItem;