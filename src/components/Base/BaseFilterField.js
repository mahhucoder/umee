import React, { useContext, useEffect, useState } from 'react';
import { DataBaseContext } from '../../Context/DataBase';
import "../../css/Base/BaseFilterField.css"
import {FaAngleDoubleDown,FaAngleDoubleUp} from "react-icons/fa"

const BaseFilterField = (props) => {

    const {filterType,handleSelectFilter,filterSelected} = props;
    const [listFilter,setListFilter] = useState([])
    const {fetchData} = useContext(DataBaseContext)

    useEffect(() => {

        if(filterType === 'Category'){
            fetchData("Categorys")
                .then(categories => {
                    if(categories.length > 0){
                        const listCategoryProduct = categories.filter(category => category.ForProduct == true).map(category => {
                            return {
                                display:category["CategoryName"],
                                value:category["CategoryId"]
                            }
                        })

                        setListFilter(listCategoryProduct)
                    }
                })
        }

        if(filterType === 'Price'){
            setListFilter([
                {display:"Dưới 1 triệu",value:{min:null,max:1000000}},
                {display:"1 triệu đến 3 triệu",value:{min:1000000,max:3000000}},
                {display:"3 triệu đến 5 triệu",value:{min:3000000,max:5000000}},
                {display:"trên 5 triệu",value:{min:5000000,max:null}}
            ])
        }

        if(filterType === 'Sort'){
            setListFilter([
                {display:"Giá",value:"Price"},
                {display:"Đã bán",value:"Sold"}
            ])
        }

    },[filterType])

    return (
        <div className="categoryFilterField">
            <div className="categoryFilterFieldTitle">{props.title}</div>
            {
                listFilter.map((filter,index) => 
                    <div key={index} className="categoryFilterItem">
                        {filterType == "Sort" ? 
                            <div className="categoryFilterSort">
                                <FaAngleDoubleUp onClick={() => handleSelectFilter({type: "Sort",value:{by:filter["value"],sort:"ASC"}})} style={{cursor:"pointer",marginRight:"4px"}} />
                                <FaAngleDoubleDown onClick={() => handleSelectFilter({type: "Sort",value:{by:filter["value"],sort:"DESC"}})} style={{cursor:"pointer"}} />
                            </div>
                        : 
                            <div onClick={() => handleSelectFilter({type:filterType,value:filter["value"]})} className="categoryFilterCheckbox">
                                <div style={{display: filterSelected == filter["value"] ? "block" : "none"}} className="categoryFilterCheckboxInside"></div>
                            </div>
                        }

                        <div style={{marginLeft:filterType == "Sort" ? "8px" : ""}} className="categoryFilterDisplay">{filter["display"]}</div>
                    </div>
                )
            }
        </div>
    );
};

export default BaseFilterField;