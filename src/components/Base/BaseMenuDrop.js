import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import BaseMenuItem from './BaseMenuItem';
import "../../css/Base/BaseMenuDrop.css";
import { DataBaseContext } from '../../Context/DataBase';
import { useNavigate } from 'react-router-dom';

const BaseMenuDrop = props => {

    const [listItem,setListItem] = useState([])
    const {fetchData} = useContext(DataBaseContext)
    const navigate = useNavigate()

    useEffect(() => {

        const get = async () => {
            const results = await fetchData("Categorys")

            const listGuitarCategory = results.filter(result => result.ForProduct == true)

            setListItem(listGuitarCategory)
        }

        get()

    },[])

    return (
        <div className="baseMenuDrop">
            {
                listItem.map((category,index) => <BaseMenuItem method={() => navigate(`/category/${category["CategoryId"]}`)} key={index} category={category} />)
            }

            <div>
                <BaseMenuItem method={() => navigate("/category/accessory")} category={{CategoryName:"Phụ kiện"}} />
            </div>
        </div>
    );
};

export default React.memo(BaseMenuDrop);