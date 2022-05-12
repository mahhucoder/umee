import React from 'react';
import "../../css/Base/BaseItemTable.css"
import accounting from 'accounting'

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

    const convertForProduct = (product) => {
        if(product) return "True"
        else    return "False"
    }

    // <td className="text-align-center">
    //                 <div onClick={() => handleToggleEdit(row[fieldId])} className="editRowTable">Chi tiết</div>
    //             </td>

    return (
        <tr>
            <td className="text-align-center">
                <div onClick={() => selectItem(row)} className="checkboxTable">
                    <div style={{"display":isSelected ? "block" : "none"}} className="checkboxTableInside"></div>
                </div>
            </td>
            {fields.map((field,index) => 
                <td key={index}  
                    style={{color:field == "Status" && row[field] == 0 ? "red" : field == "Status" && row[field] == 1 ? "green" : "#000",
                        textOverflow:field == "Content" ? "unset" : "ellipsis",whiteSpace:field == "Content" ? "normal" : "nowrap"}}
                    className={field == "Content" || field == "CategoryName" || field == "ProductName"? "text-align-left" : "text-align-center"}
                >
                    {field == "CategoryImage" || field == "ImageUrl" ? 
                        <a href={row[field]} target="_blank">{row[field]}</a> 
                        : field== "Status" ? 
                        convertStatus(row[field]) : 
                        field== "ForProduct" ? 
                        convertForProduct(row[field]) : 
                        field== "Price" ? 
                        accounting.formatMoney(row[field], "₫ ", 0) : row[field]}
                </td>
            )}

            {fieldId == "ReceiptId" || fieldId == "RequestId" ? null :
                <td className="text-align-center">
                    <div onClick={() => handleToggleEdit(row[fieldId])} className="editRowTable">Sửa</div>
                </td>
            }
        </tr>
    );
};

export default React.memo(BaseItemTable);