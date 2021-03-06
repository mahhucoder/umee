import React, { useContext, useEffect, useState } from 'react';
import "../css/views/CategoryPage.css"
import { SlidingPebbles } from 'react-spinner-animated';
import BaseFilterField from '../components/Base/BaseFilterField';
import { DataBaseContext } from '../Context/DataBase';
import BaseProduct from '../components/Base/BaseProduct';
import ReactPaginate from  "react-paginate"
import { useNavigate, useParams } from 'react-router-dom';

const CategoryPage = () => {

    const [isLoading,setIsLoading] = useState(true)
    const [categoryId,setCategoryId] = useState(null)
    const [priceRage,setPriceRage] = useState({min:null,max:null})
    const [priceSort,setPriceSort] = useState(null)
    const [pageNumber,setPageNumber] = useState(1)
    const [soldSort,setSoldSort] = useState(null)
    const {pagingProduct} = useContext(DataBaseContext)
    const [listProduct,setListProduct] = useState([])
    const [totalPage,setTotalPage] = useState(0)
    const [onlyAccessory,setOnlyAccessory] = useState(false)
    const {CategoryId} = useParams()
    const navigate = useNavigate()

    const handleSelectFilter = ({type,value}) => {
        setPageNumber(1)
        if(type === 'Category'){
            if(value == categoryId)
            {
                navigate("/category")
                return setCategoryId(null)
            }
            
            setOnlyAccessory(false)
            navigate(`/category/${value}`)
            return setCategoryId(value)
        }

        if(type === 'Price'){
            if(value == priceRage)
                return setPriceRage({min:null,max:null})
            
            return setPriceRage(value)
        }

        if(value["by"] == "Price"){
            setSoldSort(null)
            return setPriceSort(value["sort"])
        }

        setPriceSort(null)
        setSoldSort(value["sort"])
    }

    const handlePageClick = (event) => {
        setPageNumber(event.selected + 1)
    }

    useEffect(() => {
        if(CategoryId == "accessory"){
            setOnlyAccessory(true)
            setCategoryId(null)
        }

        if(CategoryId && CategoryId != "accessory"){
            setCategoryId(CategoryId)
            setOnlyAccessory(false)
        }

        pagingProduct(pageNumber,9,categoryId,priceRage["min"],priceRage["max"],priceSort,soldSort,onlyAccessory)
            .then((res) => {
                const {data,totalPage} = res

                setListProduct(data)
                setTotalPage(totalPage)
                setIsLoading(false)
            }).catch((err) => {
                console.log(err)
            })

        return () => {
            setCategoryId(null)
        }

    },[pageNumber,categoryId,priceRage,priceSort,soldSort,CategoryId,onlyAccessory])

    return (
        <div className="categoryPageContainer">
            
            {isLoading ? 
                <div className="loading">
                    <SlidingPebbles color="white" text="Ch??? x??u nhoa <3" bgColor="#A62B4D" />
                </div>
                : null
            }

            <div className="categoryPageHeader">
                Trang ch??? &gt; Danh s??ch s???n ph???m
            </div>

            <div className="categoryPageTitle">Danh s??ch s???n ph???m</div>

            <div className="categoryPageContent">
                <div className="categoryFilterSide">
                    <BaseFilterField filterSelected={categoryId} handleSelectFilter={handleSelectFilter} filterType="Category" title="Th??? lo???i"/>
                    <BaseFilterField filterSelected={priceRage} handleSelectFilter={handleSelectFilter} filterType="Price" title="Gi??"/>
                    <BaseFilterField handleSelectFilter={handleSelectFilter} filterType="Sort" title="S???p x???p"/>
                </div>

                <div className="categoryListProduct">
                    {listProduct.length == 0 ? <div className="listProductEmpty">Kh??ng c?? danh s??ch s???n ph???m ph?? h???p</div> : null}
                    {listProduct.map((product,index) => 
                        <BaseProduct 
                            id={product["ProductId"]}
                            key={index} 
                            sold={product["Sold"]}
                            imageUrl={product["ImageUrl"]} 
                            name={product["ProductName"]} 
                            price={product["Price"]} 
                            style={{marginBottom:"20px",marginRight:"12px"}}
                        />)}

                </div>
            </div>
            <div className="categoryProductPaging">
                <ReactPaginate
                    nextLabel="sau >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={totalPage}
                    previousLabel="< tr?????c"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                />
            </div>
        </div>
    );
};

export default CategoryPage;