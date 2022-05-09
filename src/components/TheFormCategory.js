import React, { useContext, useEffect, useState } from 'react';
import "../css/TheFormCategory.css"
import BaseButton from '../components/Base/BaseButton'
import ImageLoadFailed from "../source/images_webUMEE/image_load_failed.png"
import {BsArrowsAngleContract} from "react-icons/bs"
import {FaFolderPlus} from "react-icons/fa"
import { DataBaseContext } from '../Context/DataBase';
import { getStorage, ref } from "firebase/storage";
import { HalfMalf } from 'react-spinner-animated';
import BaseCheckbox from './Base/BaseCheckbox';

const TheFormCategory = (props) => {
    const {setShowForm,id,setRefresh} = props

    const [imageFile,setImageFile] = useState(null)
    const [categoryName,setCategoryName] = useState('')
    const {getCategoryById,insertEntity,update,postImageToStorage,deleteImageInStorage,setMessage,setShowMessage} = useContext(DataBaseContext)
    const [categoryEdit,setCategoryEdit] = useState(null)
    const [loadingPost,setLoadingPost] = useState(false)
    const [errorMsg,setErrorMsg] = useState(null)
    const [forProduct,setForProduct] = useState(true)

    const storage = getStorage();

    const handleSelectImage = (e) => {
        const file = e.target.files[0]
        const promises = []

        if(file)
            setImageFile(file)
        else
            setImageFile(null)
    }

    const addNewCategory = () => {
        if(categoryName == '')
            return setErrorMsg("Hãy điền tên thể loại !")

        if(!imageFile) 
            return setErrorMsg("Hãy chọn ảnh minh họa cho thể loại mới !")

        setLoadingPost(true)

        postImageToStorage(imageFile,"category images/")
            .then(res => {
                const newCategory = {
                    "categoryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                    "categoryName": categoryName,
                    "categoryImage": res,
                    "forProduct":forProduct
                }

                insertEntity('Category',newCategory)
                    .then(res => {
                        console.log(res)
        
                        setMessage("Thêm mới thành công một thể loại !")
                        setShowMessage(true)

                        setTimeout(() => {
                            setShowMessage(false)
                        },3000)

                        setLoadingPost(false)
                        setShowForm(false)
                        setRefresh(pre => !pre)
                    }).catch(err => {
                        console.log(err)
        
                        alert("Có lỗi !")
                    })
            })


    }

    const getUrl = () => {
        return new Promise((resolve, reject) => {
            const promises = []

            if(imageFile != categoryEdit["CategoryImage"]){
                const imageRef = ref(storage,categoryEdit["CategoryImage"])
    
                const postImage = postImageToStorage(imageFile,"category images/")
                const deleteImage = deleteImageInStorage(imageRef)
                
                promises.push(postImage)
                promises.push(deleteImage)

                Promise.all(promises)
                    .then(res => {
                        resolve(res[0])
                    }).catch(e => reject(e));
            }else
                resolve(categoryEdit["CategoryImage"])
        })
    }

    const updateCategory = () => {
        setLoadingPost(true)
        getUrl().then(res => {
            console.log(res)
            
            update("Category",{
                "categoryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "categoryName": categoryName,
                "categoryImage": res,
                "forProduct": forProduct
            },id).then((res) => {
                console.log(res)
                setMessage("Cập nhật thành công !")
                setShowMessage(true)

                setTimeout(() => {
                    setShowMessage(false)
                },3000)

                setShowForm(false)
                setRefresh(pre => !pre)
                setLoadingPost(false)
            }).catch(e => console.log(e))
        })

    }

    useEffect(() => {
        if(id){
            getCategoryById(id)
                .then(category => {
                    setCategoryEdit(category)
                    setCategoryName(category.CategoryName)
                    setImageFile(category.CategoryImage)
                    setForProduct(category.ForProduct)
                })
        }
    },[id])

    return (
        <div className="theFormCategoryBg">
            <div style={{"display":loadingPost ? "flex" : "none"}} className="loadingForPost">
                <HalfMalf />
            </div>
            <div className="theFormCategory">

                <div onClick={() => setShowForm(false)} className="closeFormCategory">
                    <BsArrowsAngleContract color="#fff" />
                </div>

                <div className="theFormCategoryTitle">{id ? "Chỉnh sửa" : "Thêm mới một thể loại"}</div>
                
                <div className="theFormCategoryInputLabel">Tên thể loại</div>
                <input 
                    value={categoryName} 
                    onChange={(e) => setCategoryName(e.target.value)} 
                    type="text" 
                    className="theFormCategoryInput" 
                />


                <div style={{
                    backgroundImage: `url("${imageFile && typeof(imageFile) == 'object' ? 
                    URL.createObjectURL(imageFile) : 
                    typeof(imageFile) == 'string' ? 
                            imageFile : 
                            ImageLoadFailed}")`
                        }} 
                        className="theFormCategoryImageArea"
                >
                    <label className="theFormCategoryInputFileLabel">
                        <input 
                            onChange={e => handleSelectImage(e)} 
                            type="file" className="theFormCategoryInputFile"
                        />
                        <FaFolderPlus color="#A62B4D" size={48} />
                    </label>

                </div>
                <BaseCheckbox isChecked={forProduct} setChecked={setForProduct} title="Thể loại đàn ?" />

                {errorMsg ? <div className="theFormCategoryErrorMsg">{errorMsg}</div> : null}      

                <div className="theFormCategoryButton">
                    <BaseButton method={() => setShowForm(false)} width={120} text="Hủy" color="#fff" bgColor="#A62B4D" />
                    <BaseButton method={() => id ? updateCategory() : addNewCategory()}width={120} text="Lưu" color="#A62B4D" border="1px solid #000" bgColor="#fff" />
                </div>
            </div>
        </div>
    );
};

export default TheFormCategory;