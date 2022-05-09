import React, { useContext, useState } from 'react';
import BaseInputIcon from './Base/BaseInputIcon';
import {FaTrash,FaUndoAlt,FaPlus,FaInfo} from "react-icons/fa"
import BaseGridTable from './Base/BaseGridTable';
import { Product } from '../Entity/entity';
import "../css/TheProduct.css"
import ThePreviewProduct from './ThePreviewProduct';
import TheFormProduct from './TheFormProduct';
import { DataBaseContext } from '../Context/DataBase';
import { deleteObject, getStorage, ref } from 'firebase/storage';
import { SlidingPebbles } from 'react-spinner-animated';

const TheProduct = () => {

    const [isShowTrash,setIsShowTrash] = useState(false)
    const [isShowPreview,setIsShowPreview] = useState(false)
    const [idPreview,setIdPreview] = useState(null)
    const [refresh,setRefresh] = useState(false)
    const [isShowForm,setIsShowForm] = useState(false)
    const [idProductEdit,setIdProductEdit] = useState(null)
    const [listProductSelected,setListProductSelected] = useState([])
    const [keyword,setKeyword] = useState('')
    const {deleteEntity,search,deleteImageInStorage,setMessage,setShowMessage} = useContext(DataBaseContext)
    const [isLoading,setIsLoading] = useState(false)

    const storage = getStorage()

    const handleToggleEdit = (id) => {
        setIdProductEdit(id)
        setIsShowForm(true)
    }

    const handleDeleteProduct = () => {
        setIsLoading(true)
        const promises = []

        listProductSelected.forEach(async(product) => {
            const deleteProduct = deleteEntity("Product",product["ProductId"])

            const imageRef = ref(storage,product["ImageUrl"])

            const deleteImageRef = deleteObject(imageRef)

            const deleteListImage = deleteImageInStorage(product["ProductId"])

            promises.push(deleteImageRef)
            promises.push(deleteProduct)
            promises.push(deleteListImage)
        })

        Promise.all(promises).then(() => {
            setMessage(`Bạn đã xóa thành công ${listProductSelected.length} sản phẩm !`)
            setShowMessage(true)

            setTimeout(() => {
                setShowMessage(false)
            },3000)

            setIsLoading(false)
            setRefresh(!refresh)
            setListProductSelected([])
            setIsShowTrash(false)
        }).catch(err => {
            alert("Hãy F5 !")
        })
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

            {isLoading ? 
                <div className="loading">
                    <SlidingPebbles color="white" text="Chờ xíu nhoa <3" bgColor="#A62B4D" />
                </div>
                : null
            }

            <div className="theProductTitle">Danh sách sản phẩm</div>

            <div className="theProductFunc">
                <BaseInputIcon method={handleSearch} value={keyword} setValue={setKeyword} />

                <div className="theProductIconButtonWrapper">
                    <div onClick={() => setIsShowPreview(true)} style={{"display":idPreview ? "flex" : "none"}} className="theCategoryIconButton">
                        <FaInfo size={20} />
                    </div>

                    <div onClick={handleDeleteProduct} style={{"display":isShowTrash ? "flex" : "none"}} className="theProductIconButton">
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