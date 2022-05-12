import React, { useContext, useState } from 'react';
import BaseInputIcon from './Base/BaseInputIcon';
import {FaUndoAlt,FaTrash} from "react-icons/fa"
import BaseGridTable from './Base/BaseGridTable';
import { Request } from '../Entity/entity';
import "../css/TheRequest.css"
import { DataBaseContext } from '../Context/DataBase';
import { SlidingPebbles } from 'react-spinner-animated';

const TheRequest = () => {
    const [refresh,setRefresh] = useState(false)
    const [keyword,setKeyword] = useState('')
    const {search,deleteEntity,setMessage,setShowMessage} = useContext(DataBaseContext)
    const [listRequestSelected,setListRequestSelected] = useState([])
    const [isShowTrash,setIsShowTrash] = useState(false)
    const [isLoading,setIsLoading] = useState(false)

    const handleSearch = () => {
        search("Request",keyword.toString())
    }

    const handleDeleteRequest = () => {
        
        if(window.confirm("Bạn chắc chắn muốn xóa không ?")){
            const promises = []
            setIsLoading(true)

            listRequestSelected.forEach(request => {
                const res = deleteEntity("Request",request["RequestId"])

                promises.push(res)
            })

            Promise.all(promises).then(() => {
                setMessage(`Bạn đã xóa thành công ${listRequestSelected.length} yêu cầu !`)
                setShowMessage(true)

                setTimeout(() => {
                    setShowMessage(false)
                },3000)

                setIsLoading(false)
                setRefresh(!refresh)
                setListRequestSelected([])
                setIsShowTrash(false)
            })
        }
    }

    return (
        <div className="theRequest">
            {isLoading ? 
                <div className="loading">
                    <SlidingPebbles color="white" text="Chờ xíu nhoa <3" bgColor="#A62B4D" />
                </div>
                : null
            }

            <div className="theRequestTitle">Danh sách yêu cầu hỗ trợ</div>

            <div className="theRequestFunc">
                <BaseInputIcon method={handleSearch} value={keyword} setValue={setKeyword}/>

                <div className="theRequestIconButtonWrapper">
                    <div onClick={() => handleDeleteRequest()} style={{"display":isShowTrash ? "flex" : "none"}} className="theCategoryIconButton">
                        <FaTrash size={20} />
                    </div>

                    <div onClick={() => {
                        setKeyword('')
                        setRefresh(!refresh)
                    }} className="theRequestIconButton">
                        <FaUndoAlt size={20} />
                    </div>
                </div>
            </div>

            <BaseGridTable 
                showTrash={setIsShowTrash}
                setListItem={setListRequestSelected}
                listItemSelected={listRequestSelected}
                entityApi="Request" 
                entity={Request} 
                refresh={refresh} 
            />
        </div>
    );
};

export default TheRequest;