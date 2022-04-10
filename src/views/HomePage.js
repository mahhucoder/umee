import React, { useContext, useState } from 'react';
import BaseSlider from '../components/Base/BaseSlider';
import "../css/views/Home.css"
import { UserContext } from '../Context/UserContext';
import BaseCategoryItem from '../components/Base/BaseCategoryItem';
import {fakeBestSale, fakeNews, fakeUrlCategory} from "../FakeData/index"
import BaseProduct from '../components/Base/BaseProduct';
import BaseNewsItem from '../components/Base/BaseNewsItem';

const HomePage = props => {

    const {user} = useContext(UserContext)
    const [currentCategoryIndex,setCurrentCategoryIndex] = useState(0)

    return (
        <div className="homePageContainer">
            <BaseSlider width={"100%"} height={"320px"} />

            <div className="homeCategoryWrapper">
                <div className="homeCategoryTitle">Danh mục sản phẩm</div>
                
                <div className="homeCategory">
                    {fakeUrlCategory.map((category,index) => 
                        <BaseCategoryItem 
                            key={index} 
                            text={category.text} 
                            imageUrl={category.imageUrl} 
                            width={100/fakeUrlCategory.length + 5}
                            height={320}
                        />
                    )}
                </div>
            </div>

            <div className="productBestSaleWrapper">
                <div className="productBestSaleTitle">Sản phẩm nổi bật</div>

                <div className="productBestSale">
                    {fakeBestSale.map((product,index) => 
                        <BaseProduct key={index} imageUrl={product.imageUrl} name={product.name} price={product.price} />)}
                </div>
            </div>

            <div className="newsWrapper">
                <div className="newsTitle">Tin Tức</div>

                <div className="news">
                    <div className="newsImage"></div>
                    <div className="newsList">
                        {fakeNews.map((news,index) => <BaseNewsItem key={index} news={news} />)}
                    </div>
                </div>
            </div>
        </div>
    );
};

HomePage.propTypes = {
    
};

export default HomePage;