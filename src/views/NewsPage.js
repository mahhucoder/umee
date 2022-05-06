import React, { useContext, useEffect } from 'react';
import TheNewFive from '../components/TheNewFive';
import TheNewFour from '../components/TheNewFour';
import TheNewOne from '../components/TheNewOne';
import TheNewThree from '../components/TheNewThree';
import TheNewTwo from '../components/TheNewTwo';
import { DataBaseContext } from '../Context/DataBase';
import "../css/views/NewsPage.css"

const NewsPage = () => {

    const {newsIndex,news,setNewsIndex} = useContext(DataBaseContext)

    return (
        <div className="newsPageContainer">
            <div className="newsPageHeader">
                Trang chủ &gt; Tin tức
            </div>

            <div className="newsPage">
                <div className="newsPageContent">
                    {
                        newsIndex == 1 ? <TheNewOne /> : newsIndex == 2 ? <TheNewTwo /> : newsIndex == 3 ? <TheNewThree /> : newsIndex == 4 ? <TheNewFour /> : newsIndex == 5 ? <TheNewFive /> :null
                    }
                </div>
                <div className="newsPageSlideBar">
                    <div className="newsPageSlideBarTitle">Tất cả tin tức</div>

                    <div className="newsPageList">
                        {news.map((n,index) => <div onClick={() => setNewsIndex(index+1)} className="newsItem">
                            <div style={{backgroundImage:`url(${n["imageUrl"]})`}} className="newsItemImage"></div>
                            <div className="newsItemTitle">{n["title"]}</div>
                        </div>)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsPage;