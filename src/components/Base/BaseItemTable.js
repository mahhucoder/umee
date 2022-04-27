import React from 'react';
import "../../css/Base/BaseItemTable.css"

const BaseItemTable = (props) => {

    const {row,selectItem,fieldId,isSelected,handleToggleEdit} = props
    const fields = Object.keys(row)

    const convertStatus = (status) => {
        if(status == null)
            return "Pending..."
        if(status == 1)
            return "Đã duyệt"
        if(status == 0)
            return "Đã Hủy"
    }

    return (
        <tr>
            {fieldId == "ReceiptId" || fieldId == "RequestId"? null : 
                <td className="text-align-center">
                    <div onClick={() => selectItem(row)} className="checkboxTable">
                        <div style={{"display":isSelected ? "block" : "none"}} className="checkboxTableInside"></div>
                    </div>
                </td>
            }
            {fields.map((field,index) => 
                <td key={index}  
                    style={{color:field == "Status" && row[field] == 0 ? "red" : field == "Status" && row[field] == 1 ? "green" : "#000",
                        textOverflow:field == "Content" ? "unset" : "ellipsis",whiteSpace:field == "Content" ? "normal" : "nowrap"}}
                    className={field == "Content" ? "text-align-left" : "text-align-center"}
                >
                    {field == "CategoryImage" || field == "ImageUrl" ? 
                        <a href={row[field]} target="_blank">{row[field]}</a> 
                        : field== "Status" ? convertStatus(row[field]) : row[field]}
                </td>
            )}

            {fieldId == "ReceiptId" ? 
                <td className="text-align-center">
                    <div onClick={() => handleToggleEdit(row[fieldId])} className="editRowTable">Chi tiết</div>
                </td>
            : fieldId == "RequestId" ? null :
                <td className="text-align-center">
                    <div onClick={() => handleToggleEdit(row[fieldId])} className="editRowTable">Sửa</div>
                </td>
            }
        </tr>
    );
};

export default BaseItemTable;