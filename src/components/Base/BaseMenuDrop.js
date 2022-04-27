import React from 'react';
import PropTypes from 'prop-types';
import BaseMenuItem from './BaseMenuItem';
import "../../css/Base/BaseMenuDrop.css";

const BaseMenuDrop = props => {

    const fakeData = ["Guitars điện","Guitars truyền thống", "Ukelele"]

    return (
        <div className="baseMenuDrop">
            {
                fakeData.map((data,index) => <BaseMenuItem key={index} text={data} />)
            }
        </div>
    );
};

BaseMenuDrop.propTypes = {
    // url: PropTypes.string.isRequired,
};

export default BaseMenuDrop;