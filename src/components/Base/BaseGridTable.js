import React, { useContext, useEffect, useState } from 'react';
import {DataBaseContext} from "../../Context/DataBase"
import "../../css/Base/BaseGridTable.css"
import BaseItemTable from './BaseItemTable';

const BaseGridTable = (props) => {

    const {entityApi,entity,showTrash,setIdPreview,refresh,handleToggleEdit,setListItem,listItemSelected} = props

    const {data,fetchData} = useContext(DataBaseContext)
    const [fields,setFields] = useState(Object.keys(entity))

    const addItemSelected = (item) => {
        let newListItemSelected = []

        if(listItemSelected.includes(item))
            newListItemSelected = listItemSelected.filter(i => i != item)
        else
            newListItemSelected = [...listItemSelected,item]

        setListItem(newListItemSelected)

        if(showTrash){
            if(newListItemSelected.length > 0){
                showTrash(true)
                if(setIdPreview){
                    if(newListItemSelected.length == 1)
                        setIdPreview(newListItemSelected[0][`${entityApi}Id`])
                    else
                        setIdPreview(null)
                }
            }
            else{
                showTrash(false)
                if(setIdPreview)
                    setIdPreview(null)
            }
        }
    }

    useEffect(() => {

        fetchData(`${entityApi}s`)
    
    },[refresh])

    return (
        <div className="baseGridTableWrapper">
            <table style={{"display":entityApi == "Category" || entityApi == "Request" ? "table": entityApi == "Receipt" && data.length == 0 ? "table" : "block"}} className="baseGridTable" border="0" cellSpacing="0">
                
                <thead>
                    <tr>
                        { entityApi == "Request"? null : <td></td>}
                        {fields.map((field,index) => <td key={index} className="text-align-center">{field}</td>)}
                        {entityApi == "Receipt" || entityApi == "Request"? null : <td></td>}
                    </tr>
                </thead>

                <tbody>
                    {data.length == 0 ? 
                        <div className="emptyTable">Trống</div> 
                        : data.map((row,index) => 
                            <BaseItemTable 
                                isSelected={listItemSelected ? listItemSelected.includes(row) : null} 
                                fieldId={`${entityApi}Id`} 
                                selectItem={addItemSelected} 
                                row={row} 
                                fields={fields} 
                                key={index}
                                handleToggleEdit={handleToggleEdit}
                            />
                    )}
                </tbody>

            </table>
        </div>
    );
};

export default BaseGridTable;