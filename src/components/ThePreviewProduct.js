import React, { useContext, useEffect, useState } from 'react';
import { SlidingPebbles } from 'react-spinner-animated';
import { DataBaseContext } from '../Context/DataBase';
import "../css/ThePreviewProduct.css"
import {BsArrowsAngleContract} from "react-icons/bs"
import ImageLoadFailed from "../source/images_webUMEE/image_load_failed.png"
import accounting from 'accounting'

const ThePreviewProduct = (props) => {

    const {productId,setShowPreview} = props
    const {getProductById,getImageByProId,listImage} = useContext(DataBaseContext)
    const [isLoading,setIsLoading] = useState(true)
    const [currentImage,setCurrentImage] = useState(null)
    const [product,setProduct] = useState(null)

    useEffect(() => {

        const getProduct = getProductById(productId)
            
        const getImage = getImageByProId(productId)

        Promise.all([getProduct,getImage])
            .then(res => {
                if(res[0]){
                    setProduct(res[0])
                    setCurrentImage(res[0].ImageUrl)
                }else
                    setCurrentImage(ImageLoadFailed)
                setIsLoading(false)
            })

    },[productId])

    return (
        <div className="previewProductBg">
            {isLoading ? <div className="loading"> <SlidingPebbles color="white" text="Chờ xíu nhoa <3" bgColor="#A62B4D" /></div>: null}
            

            <div className="previewProductWrapper">
                <div onClick={() => setShowPreview(false)} className="closePreviewProduct">
                    <BsArrowsAngleContract color="#fff" />
                </div>

                <div className="previewProductImageWrapper">
                    <div style={{backgroundImage:`url("${currentImage}")`}} className="previewProductImageArea"></div>

                    <div className="previewProductImage">
                        <div 
                            onClick={() => setCurrentImage(product["ImageUrl"])}
                            style={{backgroundImage:`url("${product ? product.ImageUrl : null}")`}} 
                            className={product != null && currentImage == product["ImageUrl"] ? "previewProductImageAttr imageProductSelected" : "previewProductImageAttr"}
                        >
                        </div>
                        <div style={{fontSize:"24px",fontWeight:"bold"}}>&</div>
                        <div className="previewProductImages">
                            {listImage.length > 0 ? listImage.map((image,index) => 
                                <div key={index} 
                                    className={currentImage == image ? "previewProductImagesItem imageProductSelected" : "previewProductImagesItem"} 
                                    style={{backgroundImage:`url("${image}")`}}
                                    onClick={() => setCurrentImage(image)}
                                >
                                </div>
                            ) : <div className="previewProductImagesEmpty">Không có ảnh chi tiết.</div>}
                        </div>
                    </div>
                </div>

                <div className="previewProductInfo">
                    <div className="previewProductInfoBasic">
                        <div className="previewProductKeys">
                            <div className="previewProductKey">Tên sản phẩm</div>
                            <div className="previewProductKey">Số lượng có</div>
                            <div className="previewProductKey">Số lượng đã bán</div>
                            <div className="previewProductKey">Thể loại</div>
                            <div className="previewProductKey">Giá</div>
                        </div>
                        <div style={{height:"100%",width:"1px",backgroundColor:"#000"}}></div>
                        <div className="previewProductValues">
                            <div className="previewProductValue">{product ? product["ProductName"] : null}</div>
                            <div className="previewProductValue">{product ? product["Amount"] : null}</div>
                            <div className="previewProductValue">{product ? product["Sold"] : null}</div>
                            <div className="previewProductValue">{product ? product["CategoryName"] : null}</div>
                            <div className="previewProductValue money">{product ? accounting.formatMoney(product["Price"], "₫ ", 0)  : null}</div>
                        </div>
                    </div>

                    <div className="previewProductDescriptionWrapper">
                        <div className="previewProductDescriptionTitle">Mô tả</div>
                        <div className="previewProductDescription">{product ? product["Description"] : null}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThePreviewProduct;