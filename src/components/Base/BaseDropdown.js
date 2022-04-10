import React from 'react';
import PropTypes from 'prop-types';
import BaseDropdownItem from './BaseDropdownItem';
import "../../css/Base/BaseDropdown.css";

const BaseDropdown = props => {

    const fakeData = ["Guitars điện","Guitars truyền thống", "Ukelele"]

    return (
        <div className="baseDropdown">
            {
                fakeData.map((data,index) => <BaseDropdownItem key={index} text={data} />)
            }
        </div>
    );
};

BaseDropdown.propTypes = {
    // url: PropTypes.string.isRequired,
};

export default BaseDropdown;