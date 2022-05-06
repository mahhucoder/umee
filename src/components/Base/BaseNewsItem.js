import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import "../../css/Base/BaseNewsItem.css"
import { DataBaseContext } from '../../Context/DataBase';
import { useNavigate } from 'react-router-dom';

const BaseNewsItem = props => {

    const {news,index} = props
    const {setNewsIndex} = useContext(DataBaseContext)
    const navigate = useNavigate()

    const handleSelectNews = () => {
        setNewsIndex(index+1)
        navigate("/news")
    }

    return (
        <div onClick={handleSelectNews} style={{display: index < 3 ? 'flex' : 'none'}} className="baseNewsItem">
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