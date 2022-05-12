import React, { useContext, useState } from 'react';
import BaseInputIcon from '../components/Base/BaseInputIcon'
import {FaUndoAlt,FaPlus,FaTrash} from 'react-icons/fa'
import "../css/TheCategory.css"
import BaseGridTable from './Base/BaseGridTable';
import { Category } from '../Entity/entity';
import TheFormCategory from './TheFormCategory';
import { DataBaseContext } from '../Context/DataBase';
import { SlidingPebbles } from 'react-spinner-animated';
import { deleteObject, getStorage, ref } from 'firebase/storage';

const TheCategory = () => {

    const [isShowTrash,setIsShowTrash] = useState(false)
    const [isShowForm,setIsShowForm] = useState(false)
    const [refresh,setRefresh] = useState(false)
    const [idCategoryEdit,setIdCategoryEdit] = useState(null)
    const [listCategorySelected,setListCategorySelected] = useState([])
    const {search,deleteEntity,setMessage,setShowMessage} = useContext(DataBaseContext)
    const [isLoading,setIsLoading] = useState(false)
    const [keyword,setKeyword] = useState('')

    const storage = getStorage()

    const handleToggleEdit = (id) => {
        setIdCategoryEdit(id)
        setIsShowForm(true)
    }

    const handleDeleteCategory = () => {
        let textConfirm = "Bạn chắc chắn muốn xóa không ?"
        if(window.confirm(textConfirm)){
            setIsLoading(true)
            const promises = []

            listCategorySelected.forEach(category => {
                const res = deleteEntity("Category",category["CategoryId"])

                const imageRef = ref(storage,category["CategoryImage"])

                const imageDelete = deleteObject(imageRef)

                promises.push(imageDelete)
                promises.push(res)
            })

            Promise.all(promises).then(() => {
                setMessage(`Bạn đã xóa thành công ${listCategorySelected.length} thể loại !`)
                setShowMessage(true)

                setTimeout(() => {
                    setShowMessage(false)
                },3000)

                setIsLoading(false)
                setRefresh(!refresh)
                setListCategorySelected([])
                setIsShowTrash(false)
            }).catch(err => {
                alert("Hãy F5 !")
            })
        }
    }  
    
    const handleSearch = () => {
        search("Category",keyword)
    }

    return (
        <div className="theCategory">

            {isLoading ? 
                <div className="loading">
                    <SlidingPebbles color="white" text="Chờ xíu nhoa <3" bgColor="#A62B4D" />
                </div>
                : null
            }

            {isShowForm ? <TheFormCategory setRefresh={setRefresh} id={idCategoryEdit} setShowForm={setIsShowForm} /> : null}

            <div className="theCategoryTitle">Danh sách thể loại</div>

            <div className="theCategoryFunc">
                <BaseInputIcon method={handleSearch} value={keyword} setValue={setKeyword} />

                <div className="theCategoryIconButtonWrapper">

                    <div onClick={() => handleDeleteCategory()} style={{"display":isShowTrash ? "flex" : "none"}} className="theCategoryIconButton">
                        <FaTrash size={20} />
                    </div>

                    <div onClick={() => {
                            setKeyword('')
                            setRefresh(!refresh)
                        }} className="theCategoryIconButton"
                    >
                        <FaUndoAlt size={20} />
                    </div>

                    <div onClick={() => {
                            setIdCategoryEdit(null)
                            setIsShowForm(true)
                        }}
                        className="theCategoryIconButton"
                    >
                        <FaPlus size={20} />
                    </div>
                </div>
            </div>

            <BaseGridTable
                refresh={refresh} 
                showTrash={setIsShowTrash} 
                entity={Category} 
                entityApi="Category" 
                handleToggleEdit={handleToggleEdit} 
                setListItem={setListCategorySelected}
                listItemSelected={listCategorySelected}
            />
        </div>
    );
};

export default TheCategory;