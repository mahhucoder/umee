import React from 'react';
import "../../css/Base/BaseImageItem.css"

const BaseImageItem = (props) => {

    const {url,isSelected,selectImage} = props

    return (
        <div onClick={() => selectImage()} style={{backgroundImage: `url("${url}")`}} className={isSelected ? 'theFormProductImage imageProductSelected' : "theFormProductImage"}></div>
    );
};

export default React.memo(BaseImageItem);