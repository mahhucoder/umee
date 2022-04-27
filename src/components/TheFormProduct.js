import React, { useContext, useEffect, useState } from 'react';
import "../css/TheFormProduct.css"
import BaseInputField from '../components/Base/BaseInputField'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import BaseTextArea from './Base/BaseTextArea';
import {FaFolderPlus,FaExclamation} from "react-icons/fa"
import BaseButton from "../components/Base/BaseButton"
import BaseImageItem from './Base/BaseImageItem';
import ImageLoadFailed from "../source/images_webUMEE/image_load_failed.png"
import { DataBaseContext } from '../Context/DataBase';
import BaseDropdown from './Base/BaseDropDown';
import Guid from 'guid';
import { SlidingPebbles } from 'react-spinner-animated';

const TheFormProduct = (props) => {

    const [imageFile,setImageFile] = useState(null)
    const [requireImageMsg,setRequireImageMsg] = useState(null)
    const {setShowForm,id,setRefresh} = props
    const [imageIndex,setImageIndex] = useState(0)
    const {getProductById,getCategories,postImageToStorage,insertEntity,listImage,getImageByProId} = useContext(DataBaseContext)
    const [categories,setCategories] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const [productEdit,setProductEdit] = useState(null)
    const [listImageForm,setListImageForm] = useState([])

    const productFormik = useFormik({
        initialValues:{
            "ProductName":'',
            "CategoryId":'',
            "Amount":'',
            "Sold":'',
            "Description":'',
            "Price":'',
        },

        validationSchema:Yup.object({
            ProductName:Yup.string().required("Bạn cần nhập tên sản phẩm !"),
            CategoryId:Yup.string().required("Vui lòng nhập thể loại !"),
            Amount:Yup.number("Bạn cần nhập số !").required("Hãy nhập !"),
            Sold:Yup.number("Bạn cần nhập số !").required("Hãy nhập !"),
            Description:Yup.string().required("Hãy thêm mô tả về sản phẩm này !"),
            Price:Yup.number().required("Hãy nhập giá cho sản phẩm !")
        }),

        onSubmit:values => {
            if(imageFile == null)
                return  setRequireImageMsg("Hãy chọn ảnh minh họa cho sản phẩm");

            setIsLoading(true)

            if(!id){
                const promises = []
                const idNewProduct = Guid.create().value
                postImageToStorage(imageFile,"product images/")
                    .then(res => {
                        const newProduct = {
                            "productId": idNewProduct,
                            "productName": values.ProductName,
                            "categoryId": values.CategoryId,
                            "amount": values.Amount,
                            "sold": values.Sold,
                            "description": values.Description,
                            "price": values.Price,
                            "imageUrl": res,
                        }
    
                        const insert = insertEntity("Product",newProduct)
    
                        listImageForm.forEach(({file}) => {
                            const postImage = postImageToStorage(file,`${idNewProduct}/`)
    
                            promises.push(postImage)
                        })
    
                        Promise.all(promises)
                            .then((res) =>{
                                setIsLoading(false)
                                setRefresh(pre => !pre)
                                setShowForm(false)
                            })
                            .catch((err) => console.log(err))
                    })
            }

            console.log(values)

            console.log(listImageForm)
            console.log(imageFile)
        }
    })

    const handleSelectImage = (e) => {
        const file = e.target.files[0]
        const promises = []

        if(file)
            setImageFile(file)
        else
            setImageFile(null)
    }

    const handleSelectListImage = (files) => {
        const newList = []

        for(let i = 0; i < files.length; i++) {
            const newImageObject = {
                url:URL.createObjectURL(files[i]),
                file:files[i],
            }

            newList.push(newImageObject)
        }

        setListImageForm([...listImageForm, ...newList])
    }

    const handleDeleteImage = () => {
        const newList = listImageForm.filter((image,index) => index != imageIndex)

        setListImageForm(newList)
        setImageIndex(0)
    }

    useEffect(() => {

        if(id){
            getProductById(id)
            .then(res => {
                const {ProductName,CategoryId,Amount,Sold,Description,Price,ImageUrl} = res
    
                setProductEdit(res)
                productFormik.values.ProductName = ProductName
                productFormik.values.CategoryId = CategoryId
                productFormik.values.Amount = Amount
                productFormik.values.Sold = Sold
                productFormik.values.Description = Description
                productFormik.values.Price = Price
                setImageFile(ImageUrl)
            })
    
            getImageByProId(id)
                .then((images) => {
                    console.log(id)
                    images.forEach((image) => {
                        setListImageForm(pre => [...pre,{url: image,file:""}])
                    })

                    setIsLoading(false)
                })
        }else
            setIsLoading(false)

        getCategories()
            .then((ctg) => {
                if(ctg.length > 0){
                    const newList = ctg.map(category => {return {display:category["CategoryName"],value:category["CategoryId"]}})
                    setCategories(newList)
                }
            })
            .catch((err) => console.log(err))
    },[id])

    return (
        <div className="theFormProductBg">
            {isLoading ? <div className="loading"> <SlidingPebbles color="white" text="Chờ xíu nhoa <3" bgColor="#A62B4D" /></div>: null}

            <div className="theFormProductWrapper">
                
                <div className="theFormProductTitle">{id ? "Chỉnh sửa sản phẩm" : "Thêm mới sản phẩm"}</div>

                <div className="theFormProduct">
                    <div className="theFormProductLeft">
                        <BaseInputField 
                            width={240} 
                            titleColor="#000" 
                            name="ProductName" 
                            type="text" 
                            title="Tên sản phẩm" 
                            formik={productFormik} 
                        />

                        <BaseDropdown 
                            width={240} 
                            titleColor="#000" 
                            name="CategoryId" 
                            type="text" 
                            title="Thể loại" 
                            formik={productFormik} 
                            list={categories}
                        />

                        <BaseTextArea 
                            width={240}
                            height={240} 
                            formik={productFormik} 
                            name="Description" 
                            title="Mô tả :" 
                        />
                    </div>

                    <div className="theFormProductCenter">
                        <BaseInputField
                            width={240} 
                            titleColor="#000" 
                            name="Price" 
                            type="number"
                            title="Giá" 
                            formik={productFormik} 
                        />

                        <div style={{"display":"flex","width":"240px","justifyContent":"space-between"}}>
                            <BaseInputField
                                width={110} 
                                titleColor="#000" 
                                name="Amount" 
                                type="number" 
                                title="Số lượng" 
                                formik={productFormik} 
                            />

                            <BaseInputField
                                width={110} 
                                titleColor="#000" 
                                name="Sold" 
                                type="number"
                                title="Đã bán" 
                                formik={productFormik} 
                            />
                        </div>

                        <div className="theFormProductImageField">
                            <div>Ảnh minh họa : </div>
                            <div 
                                style={{
                                    backgroundImage:`url("${imageFile && typeof(imageFile) == 'object' ? 
                                    URL.createObjectURL(imageFile) : 
                                    typeof(imageFile) == 'string' ? 
                                    imageFile : 
                                    ImageLoadFailed}")`
                                }} 
                                className="theFormProductImageArea"
                            >
                            </div>
                            

                            <label className="custom-file-upload">
                                <input 
                                    onChange={e => handleSelectImage(e)} 
                                    type="file" 
                                    className="theFormProductImageInput"
                                />
                                <FaFolderPlus color="#A62B4D" size={48} />
                            </label>

                            {!imageFile && requireImageMsg ? <>
                                <div className="invalidMsg">{requireImageMsg}</div>
                                <div className="inputIconVAlid">
                                    <FaExclamation color="red" />
                                </div>
                            </> : null}
                        </div>
                    </div>

                    <div className="theFormProductRight">

                        <div className="theFormProductImagesWrapper">
                            <div className="theFormProductImageDetailField">
                                <div>Ảnh mô tả chi tiết : </div>
                                <div 
                                    style={{backgroundImage:`url("${listImageForm.length > 0 ? listImageForm[imageIndex].url : ImageLoadFailed}")`}} 
                                    className="theFormProductImageDetailArea"
                                >
                                </div>
                            </div>

                            <div className="theFormProductListImage">
                                {
                                    listImageForm.map((image,index) => 
                                        <BaseImageItem selectImage={() => setImageIndex(index)} isSelected={imageIndex == index} key={index} url={image.url} />)
                                }
                            </div>
                        </div>

                        <div className="theFormProductImageFuc">
                            <label>
                                <input 
                                    multiple
                                    onChange={(e) => handleSelectListImage(e.target.files)} 
                                    type="file" 
                                    className="theFormProductImageInput"
                                />
                                <BaseButton bgColor="#fff" width={120} text="Thêm" color="#000" border="1px solid #000" />
                            </label>
                            <BaseButton method={() => handleDeleteImage()} bgColor="#fff" width={120} text="Xóa" color="#000" border="1px solid #000" />
                            <BaseButton method={() => setListImageForm([])} bgColor="#fff" width={120} text="Xóa hết" color="#000" border="1px solid #000" />
                        </div>
                    </div>
                </div>

                <div className="theFormProductButton">
                    <BaseButton method={() => setShowForm(false)} bgColor="#fff" color="#000" border="1px solid #000" width={160} text="Hủy" />
                    <BaseButton method={productFormik.handleSubmit} color="#fff" width={160} text="Lưu" />
                </div>

            </div>
        </div>
    );
};

export default TheFormProduct;