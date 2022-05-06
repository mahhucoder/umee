import React, { useContext, useEffect, useState } from 'react';
import BaseSlider from '../components/Base/BaseSlider';
import "../css/views/Home.css"
import BaseCategoryItem from '../components/Base/BaseCategoryItem';
import BaseProduct from '../components/Base/BaseProduct';
import BaseNewsItem from '../components/Base/BaseNewsItem';
import { DataBaseContext } from '../Context/DataBase';

const HomePage = props => {

    const [listCategory,setListCategory] = useState([])
    const [listBestSale,setListBestSale] = useState([])
    const {fetchData,pagingProduct,news} = useContext(DataBaseContext)

    useEffect(() => {

        const get = async () => {
            const results = await fetchData("Categorys")
            pagingProduct(1,3,null,null,null,null,"DESC")
                .then((res) => {
                    const {data} = res

                    setListBestSale(data)
                })

            const listGuitarCategory = results.filter(result => result.ForProduct == true)

            setListCategory(listGuitarCategory)
        }

        get()

    },[])

    return (
        <div className="homePageContainer">
            <BaseSlider width={"100%"} height={"320px"} />

            <div className="homeCategoryWrapper">
                <div className="homeCategoryTitle">Danh mục sản phẩm</div>
                
                <div className="homeCategory">
                    {listCategory.map((category,index) => 
                        <BaseCategoryItem 
                            key={index} 
                            text={category["CategoryName"]} 
                            imageUrl={category["CategoryImage"]} 
                            width={100/listCategory.length + 5}
                            height={320}
                        />
                    )}
                </div>
            </div>

            <div className="productBestSaleWrapper">
                <div className="productBestSaleTitle">Sản phẩm nổi bật</div>

                <div className="productBestSale">
                    {listBestSale.map((product,index) => 
                        <BaseProduct id={product["ProductId"]} key={index} imageUrl={product["ImageUrl"]} name={product["ProductName"]} price={product["Price"]} />)}
                </div>
            </div>

            <div className="newsWrapper">
                <div className="newsTitle">Tin Tức</div>

                <div className="news">
                    <div className="newsImage"></div>
                    <div className="newsList">
                        {news.map((news,index) => <BaseNewsItem index={index} key={index} news={news} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};

HomePage.propTypes = {
    
};

export default HomePage;