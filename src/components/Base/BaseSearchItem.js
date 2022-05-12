import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../../css/Base/BaseSearchItem.css"

const BaseSearchItem = (props) => {

    const {product,setKeyword} = props
    const navigate = useNavigate()

    const moveToProductPage = () => {
        setKeyword('')
        navigate(`/product/${product["ProductId"]}`)
    }

    return (
        <div onClick={moveToProductPage} className="headerSearchItem">
            <div style={{backgroundImage: `url('${product["ImageUrl"]}')`}} className="headerSearchItemImage"></div>
            <div className="headerSearchItemName">{product["ProductName"]}</div>
        </div>
    );
};

export default React.memo(BaseSearchItem);