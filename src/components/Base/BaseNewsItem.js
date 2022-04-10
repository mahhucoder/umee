import React from 'react';
import PropTypes from 'prop-types';
import "../../css/Base/BaseNewsItem.css"

const BaseNewsItem = props => {

    const {news} = props

    return (
        <div className="baseNewsItem">
            <div className="baseNewsItemText">
                <div className="baseNewsItemTitLe">{news.title}</div>
                <div className="baseNewsItemDescription">{news.description}</div>
            </div>
            <div style={{backgroundImage:`url(${news.imageUrl})`}} className="baseNewsItemImage"></div>
        </div>
    );
};

BaseNewsItem.propTypes = {
    
};

export default BaseNewsItem;