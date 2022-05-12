import React from 'react';
import PropTypes from 'prop-types';
import BaseButton from './BaseButton';
import { useNavigate } from 'react-router-dom';
import "../../css/Base/BaseMockup.css"

const BaseMockup = props => {
    
    const navigate = useNavigate()

    return (
        <div className="baseMockup">
            <div className="baseMockupTitle">{props.title}</div>
            <BaseButton text="OK" method={() => navigate("/")} />
        </div>
    );
};

BaseMockup.propTypes = {
    
};

export default React.memo(BaseMockup);