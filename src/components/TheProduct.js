import React, { useContext, useState } from 'react';
import BaseInputIcon from './Base/BaseInputIcon';
import {FaTrash,FaUndoAlt,FaPlus,FaInfo} from "react-icons/fa"
import BaseGridTable from './Base/BaseGridTable';
import { Product } from '../Entity/entity';
import "../css/TheProduct.css"
import ThePreviewProduct from './ThePreviewProduct';
import TheFormProduct from './TheFormProduct';
import { DataBaseContext } from '../Context/DataBase';

const TheProduct = () => {

    const [isShowTrash,setIsShowTrash] = useState(false)
    const [isShowPreview,setIsShowPreview] = useState(false)
    const [idPreview,setIdPreview] = useState(null)
    const [refresh,setRefresh] = useState(false)
    const [isShowForm,setIsShowForm] = useState(false)
    const [idProductEdit,setIdProductEdit] = useState(null)
    const [listProductSelected,setListProductSelected] = useState([])
    const [keyword,setKeyword] = useState('')
    const {deleteCategory,search} = useContext(DataBaseContext)

    const handleToggleEdit = (id) => {
        setIdProductEdit(id)
        setIsShowForm(true)
    }

    const handleSearch = () => {
        search("Product",keyword)
    }

    return (
        <div className="theProduct">
            {
                isShowPreview ? <ThePreviewProduct setShowPreview={setIsShowPreview} productId={idPreview} /> : null
            }

            {
                isShowForm ? <TheFormProduct setRefresh={setRefresh} id={idProductEdit} setShowForm={setIsShowForm} /> : null
            }

            <div className="theProductTitle">Danh sách sản phẩm</div>

            <div className="theProductFunc">
                <BaseInputIcon method={handleSearch} value={keyword} setValue={setKeyword} />

                <div className="theProductIconButtonWrapper">
                    <div onClick={() => setIsShowPreview(true)} style={{"display":idPreview ? "flex" : "none"}} className="theCategoryIconButton">
                        <FaInfo size={20} />
                    </div>

                    <div style={{"display":isShowTrash ? "flex" : "none"}} className="theProductIconButton">
                        <FaTrash size={20} />
                    </div>

                    <div onClick={() => setRefresh(!refresh)} className="theProductIconButton">
                        <FaUndoAlt size={20} />
                    </div>

                    <div onClick={() => {
                            setIdProductEdit(null) 
                            setIsShowForm(true)
                    }} 
                        className="theProductIconButton"
                    >
                        <FaPlus size={20} />
                    </div>
                </div>
            </div>

            <BaseGridTable 
                handleToggleEdit={handleToggleEdit} 
                refresh={refresh} 
                setIdPreview={setIdPreview} 
                showTrash={setIsShowTrash} 
                entity={Product} 
                entityApi="Product" 
                setListItem={setListProductSelected}
                listItemSelected={listProductSelected}
            />
        </div>
    );
};

export default TheProduct;