import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import "../../css/Base/BaseAddressDrop.css"
import {AiFillCaretDown} from 'react-icons/ai'
import { DataBaseContext } from '../../Context/DataBase';

const BaseAddressDrop = (props) => {

    const {title,province,district,range,addressSelected,setAddressSelected} = props
    const [listAddress,setListAddress] = useState([])
    const [drop,setDrop] = useState(false)
    const {getProvinces,getDistricts,getWards} = useContext(DataBaseContext)

    useEffect(() => {

        if(range == "province"){
            getProvinces()
                .then(res => {
                    setListAddress(res)
                })
        }

        if(range == "district" && province["id"] != ""){
            getDistricts(province["id"])
                .then(res => {
                    setListAddress(res)
                })
        }        
        
        if(range == "ward" && district["id"] != ""){
            getWards(district["id"])
                .then(res => {
                    setListAddress(res)
                })
        }   

    },[province,district])

    return (
        <div className="baseAddressDrop">
            
            <div className="baseAddressDropTitle">{title}</div>

            <div className="baseAddressDropDisplay">
                {addressSelected? addressSelected["display"] : null}
                <div onClick={() => setDrop(!drop)} className="baseAddressDropIcon"><AiFillCaretDown /></div>
                <div style={{display: drop ? "block" : "none"}} className="baseAddressDropList">
                    {
                        listAddress.map((address,index) => 
                            <div 
                                onClick={() => {
                                    setAddressSelected(address)
                                    setDrop(false)
                                }}
                                className={address["id"] == addressSelected["id"] ? "baseAddressDropItem baseAddressDropSelected" : "baseAddressDropItem"} 
                                key={index}
                            >
                                {address["display"]}
                            </div>)
                    }
                </div>
            </div>

        </div>
    );
};

export default React.memo(BaseAddressDrop);