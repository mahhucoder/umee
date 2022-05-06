import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DataBaseContext } from '../Context/DataBase';
import accounting from 'accounting';
import "../css/views/ProductPage.css"
import BaseButton from '../components/Base/BaseButton'
import BaseProduct from '../components/Base/BaseProduct'

const ProductPage = (props) => {

    const {id} = useParams()
    const {getProductById,getImageByProId,pagingProduct,pushIdToSessions} = useContext(DataBaseContext)
    const [product,setProduct] = useState(null)
    const [listImage,setListImage] = useState([])
    const [indexImage,setIndexImage] = useState(0)
    const [listProductCategorySame,setListProductCategorySame] = useState([])
    const [listProductPriceSame,setListProductPriceSame] = useState([])
    const navigate = useNavigate()

    const buyNow = () => {
        navigate(`/payment/${id}`)
    }

    useEffect(() => {

        getProductById(id)
            .then((prd) => {
                const min = prd["Price"] - 500000
                const max = prd["Price"] + 500000
                setProduct(prd)
                getImageByProId(id)
                    .then(images => {
                        setListImage([prd["ImageUrl"],...images])
                    }).catch((error) => console.log(error))
                
                pagingProduct(1,4,prd["CategoryId"],null,null,null,null,null)
                    .then(products => {
                        setListProductCategorySame(products.data)
                    })

                pagingProduct(1,4,null,min,max,null,null,null)
                    .then(products => {
                        setListProductPriceSame(products.data)
                    })
            }).catch((error) => console.log(error))

        
    },[id])

    return (
        <div className="productPageContainer">

            <div className="productPageHeader">
                Trang chủ &gt; Tài khoản &gt; {product ? product["ProductName"] : null}
            </div>

            <div className="productPageInfo">
                <div style={{backgroundImage:`url('${listImage[indexImage]}')`}} className="productPageImageArea"></div>
                <div className="productPageListImage">
                    {
                        listImage.map((image, index) => 
                            <div 
                                onClick={() => setIndexImage(index)}
                                key={index} 
                                style={{
                                    backgroundImage:`url('${image}')`,
                                    border:index == indexImage ? "2px solid #A62B4D" : ""
                                }} 
                                className="productPageImageItem"
                            >
                            </div>)
                    }
                </div>
                <div className="productPageInfoDetail">
                    <div className="productPageInfoBasic">
                        <div className="productPageKeys">
                            <div className="productPageKey">Tên sản phẩm</div>
                            <div className="productPageKey">Số lượng có</div>
                            <div className="productPageKey">Số lượng đã bán</div>
                            <div className="productPageKey">Thể loại</div>
                            <div className="productPageKey">Giá</div>
                        </div>
                        <div style={{height:"100%",width:"1px",backgroundColor:"#000"}}></div>
                        <div className="productPageValues">
                            <div className="productPageValue">{product ? product["ProductName"] : null}</div>
                            <div className="productPageValue">{product ? product["Amount"] : null}</div>
                            <div className="productPageValue">{product ? product["Sold"] : null}</div>
                            <div className="productPageValue">{product ? product["CategoryName"] : null}</div>
                            <div className="productPageValue money">{product ? accounting.formatMoney(product["Price"], "₫ ", 0)  : null}</div>
                        </div>
                    </div>

                    <div className="productPageButton">
                        <BaseButton method={() => pushIdToSessions(id)} width={240} bgColor="#fff" text="Thêm vào giỏ hàng" />
                        <BaseButton method={() => buyNow()} width={160} color="#fff" text="Mua ngay" />
                    </div>

                </div>

            </div>

            <div className="productPageDescription">
                <div className="productDescriptionTitle">Mô tả</div>
                <div className="productDescriptionText">
                    {product ? product["Description"] : null}
                </div>
            </div>

            <hr/>
            <div className="productDescriptionCategorySameTitle">Sản phẩm cùng thể loại</div>
            <div className="productPageCategorySame">
                {
                    listProductCategorySame.map((productSame,index) => 
                        <BaseProduct 
                            style={{width:"320px"}}
                            id={productSame["ProductId"]} 
                            key={index} 
                            imageUrl={productSame["ImageUrl"]} 
                            name={productSame["ProductName"]} 
                            price={productSame["Price"]} 
                        />)
                }
            </div>
            
            <hr/>
            <div className="productDescriptionPriceSameTitle">Sản phẩm cùng tầm giá</div>
            <div className="productPagePriceSame">
                {
                    listProductPriceSame.map((productSame,index) => 
                        <BaseProduct 
                            style={{width:"320px"}}
                            id={productSame["ProductId"]} 
                            key={index} 
                            imageUrl={productSame["ImageUrl"]} 
                            name={productSame["ProductName"]} 
                            price={productSame["Price"]} 
                        />)
                }
            </div>
        </div>
    )
}

export default ProductPage