import axios from 'axios';
import { deleteObject, getDownloadURL, getStorage, listAll, ref, uploadBytesResumable } from 'firebase/storage';
import React, { createContext, useEffect, useState } from 'react';
import Image1 from '../source/images_webUMEE/newone/59-06-22-155909.png'
import image1 from "../source/images_webUMEE/newtwo/1.png"
import Zero from "../source/images_webUMEE/newthree/0.png"
import Default from "../source/images_webUMEE/newfour/0.png"
import Default5 from "../source/images_webUMEE/newfive/0.png"

const DataBaseContext = createContext()

const DataBase = ({children}) => {

    const [data,setData] = useState([])
    const [listImage,setListImage] = useState([])
    const [showMessage,setShowMessage] = useState(false)
    const [message,setMessage] = useState('')
    const [listIdInCart,setListIdInCart] = useState([])
    const [newsIndex,setNewsIndex] = useState(1)

    const news = [
        {
            title:"Những cây guitar acoustic Taylor chất lượng cao bạn nên tham khảo",
            imageUrl:Image1,
            description:"Đối với những người yêu nhạc thế giới, những cây đàn Guitar Taylor là mơ ước. Guitar Taylor luôn là một trong số những cây đàn cao cấp và đắt đỏ nhất, cho thấy âm thanh tuyệt hảo cùng thiết kế đa dạng và cuốn hút mà chỉ có ở Taylor. Chất liệu gỗ làm đàn cao cấp, được chọn lọc kĩ lưỡng mang đến những cây đàn có chất lượng vượt trội. Taylor luôn được trang bị hệ thống âm thanh độc quyền với những thiết kế hiện đại và ấn tượng, tạo nên âm thanh chân thực, sống động và cuốn hút. Dưới đây là những cây guitar acoustic Taylor chất lượng cao bạn nên tham khảo."
        },
        {
            title:"12 cách bạn có thể tái tạo động lực chơi piano",
            imageUrl:image1,
            description:"Vài tháng đầu năm có thể là khoảng thời gian kỳ lạ đối với các nghệ sĩ piano. Thông thường, chúng ta thấy như đang mất động lực sau một thời gian gián đoạn trong thói quen luyện tập thường xuyên của mình, có lẽ đã không gặp giáo viên hoặc người bạn chơi đàn của chúng ta trong một thời gian. Vì vậy, với hy vọng khơi lại tình yêu của bạn dành cho piano, chúng tôi đã tổng hợp 12 ý tưởng để truyền cảm hứng cho bạn. Cho dù bạn là một người nghiệp dư, chuyên nghiệp hay chỉ là một người yêu âm nhạc, chắc chắn rằng sẽ có thứ gì đó ở đây kích thích sự thèm muốn của bạn đối với piano một lần nữa!"
        },
        {
            title:"Những cây guitar acoustic phù hợp cho người mới bắt đầu",
            imageUrl:Zero,
            description:"Những cây đàn dành cho đối tượng người chơi mới bắt đầu luôn sôi động và được nhiều thương hiệu quan tâm do nhu cầu của khách hàng rất lớn. Những người mới bắt đầu đều có mong muốn tìm ngay cho mình một cây đàn phù hợp và những cây đàn ở phân khúc này cũng có mức giá dễ tiếp cận dẫn đến người dùng có thể dễ dàng mua và thay đổi nếu thấy không phù hợp hoặc thấy thích một cây đàn khác hơn. Do đó nếu phải tìm ra những cây đàn đáng mua nhất cho người mới cũng không hề dễ dàng, vậy nên chúng tôi có một số gợi ý để bạn có thể tìm ra cho mình cây đàn phù hợp nhất để bắt đầu hành trình âm nhạc của mình."
        },
        {
            title:"Gợi ý 5 mẹo giúp bạn chơi guitar giỏi hơn",
            imageUrl:Default,
            description:"Những điều chỉnh dễ thực hiện này đối với cách bạn học sẽ giúp bạn mang lại kết quả nhanh hơn và tốt hơn. Vì vậy, hãy lấy cây đàn của bạn và bắt đầu!"
        },
        {
            title:"Gợi ý những cây đàn guitar acoustic chất lượng dành cho người chơi chuyên nghiệp",
            imageUrl:Default5,
            description:"Nếu bạn là một guitarist đang bước vào môi trường chuyên nghiệp, cần tìm cho mình một sự lựa chọn lý tưởng với giá cả phải chăng, chất lượng cao với giai điệu và khả năng chơi tuyệt vời thì chúng tôi có một số gợi ý những cây đàn guitar acoustic chất lượng đến từ các thương hiệu danh tiếng như Taylor, Fender dành cho người chơi chuyên nghiệp."
        },
    ]

    const storage = getStorage()

    const getShipFee = (service_id,money,district_id,ward_code) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url:`https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee?service_id=${service_id}&insurance_value=${money}&coupon=&from_district_id=3440&to_district_id=${district_id}&to_ward_code=${ward_code}&height=120&length=&weight=3000&width=80`,
                headers:{
                    token:'dc67a1b4-c45d-11ec-978e-429d56dd18cd',
                    shop_id:'2677200'
                }
            }).then(res => {
                resolve(res.data.data)
            }).catch(err => reject(err))
        })
    }

    const getServiceShip = (to_district) => {
        return new Promise((resolve, reject) => {
            axios({
                method: 'GET',
                url:`https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services?shop_id=2677200&from_district=3440&to_district=${to_district}`,
                headers: {
                    token: 'dc67a1b4-c45d-11ec-978e-429d56dd18cd'
                }
            }).then(res => {
                resolve(res.data.data)
            }).catch(err => reject(err))
        })
    }

    const getProvinces = () => {
        return new Promise((resolve, reject) => {
            axios({
                method:"GET",
                url:'https://online-gateway.ghn.vn/shiip/public-api/master-data/province',
                headers:{
                    token:'dc67a1b4-c45d-11ec-978e-429d56dd18cd'
                }
            }).then((response) => {
                const list = response.data.data

                const newList = list.map(item => {
                    return {
                        display:item["ProvinceName"],
                        id:item["ProvinceID"]
                    }
                })

                resolve(newList)
            }).catch((error) => reject(error))
        })
    }

    const getDistricts = (id) => {
        return new Promise((resolve, reject) => {
            axios({
                method:"GET",
                url:`https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${id}`,
                headers:{
                    token:'dc67a1b4-c45d-11ec-978e-429d56dd18cd'
                }
            }).then((response) => {
                const list = response.data.data

                const newList = list.map(item => {
                    return {
                        display:item["DistrictName"],
                        id:item["DistrictID"]
                    }
                })

                resolve(newList)
            }).catch((error) => reject(error))
        })
    }

    const getWards = (id) => {
        return new Promise((resolve, reject) => {
            axios({
                method:"GET",
                url:`https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${id}`,
                headers:{
                    token:'dc67a1b4-c45d-11ec-978e-429d56dd18cd'
                }
            }).then((response) => {
                const list = response.data.data

                const newList = list.map(item => {
                    return {
                        display:item["WardName"],
                        id:item["WardCode"]
                    }
                })

                resolve(newList)
            }).catch((error) => reject(error))
        })
    }

    const pushIdToSessions = (id) => {
        const listId = JSON.parse(sessionStorage.getItem("product_id"))

        if(listId && !listId.includes(id)){
            setMessage("Một sản phẩm đã được thêm vào giỏ hàng.")
            setShowMessage(true)
        }
        
        if(listId && !listId.includes(id)) {
            listId.push(id);
            
            setListIdInCart(listId)
            sessionStorage.setItem("product_id", JSON.stringify(listId))
        }
        
        if(!listId) {
            setListIdInCart([id])
            sessionStorage.setItem("product_id",JSON.stringify([id]))
            setMessage("Một sản phẩm đã được thêm vào giở hàng.")
            setShowMessage(true)
        }
        
        setTimeout(() => {
            setShowMessage(false)
        },3000)
    }

    const removeIdFromSession = (id) => {
        const listId = JSON.parse(sessionStorage.getItem("product_id"))

        const newListId = listId.filter(i => i != id)

        setListIdInCart(newListId)

        sessionStorage.setItem("product_id", JSON.stringify(newListId))

        setMessage("Một sản phẩm đã được xóa khỏi giỏ hàng.")
        setShowMessage(true)

        setTimeout(() => {
            setShowMessage(false)
        },3000)
    }

    const browseReceipt = (id,status) => {
        return new Promise((resolve, reject) => {
            axios.put(`https://localhost:7236/api/v1/Receipts/${id}`,{
                "receiptId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "accountId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "createdAt": "2022-04-28T17:11:49.248Z",
                "status": status,
                "transportFee": 0,
                "receiverName": "string",
                "address": "string",
                "phoneNumber": "string"
            }).then(res => {
                resolve(res)
            }).catch(err => reject(err))
        })
    }

    const pagingProduct = (pageNumber,pageSize,categoryId,min,max,priceSort,soldSort,onlyAccessory) => {
        return new Promise((resolve, reject) => {
            let url = `https://localhost:7236/api/v1/Products/paging?pageNumber=${pageNumber}&pageSize=${pageSize}${categoryId ? `&categoryId=${categoryId}` : ''}${min ? `&minPrice=${min}` : ''}${max ? `&maxPrice=${max}` : ''}${priceSort ? `&priceSort=${priceSort}` : ''}${soldSort ? `&soldSort=${soldSort}` : ''}${onlyAccessory ? `&onlyAccessory=${onlyAccessory}` : ''}`

            axios.get(url)
                .then(res => {
                    resolve(res.data)
                }).catch(err => reject(err))
        })
    }

    const fetchData = (entity,id) => {
        return new Promise((resolve, reject) => {
            axios.get(`https://localhost:7236/api/v1/${entity}${id ? '/'+id : ''}`)
                .then(response => {
                    setData(response.data)
                    resolve(response.data)
                }).catch(error => reject(error))
        })
    }

    const getImageByProId = (productId) => {
        return new Promise((resolve, reject) => {
            const listRef = ref(storage,`${productId}/`)
            
            listAll(listRef).then((res) => {
                const promises = []

                res.items.forEach((itemRef) => {
                    const getUrl = getDownloadURL(itemRef)
                    promises.push(getUrl)
                })

                Promise.all(promises)
                    .then(res => {
                        setListImage(res)
                        resolve(res)
                    })
            }).catch((error) => {
                reject(error)
            })
        })

    }

    const getProductById = (id) => {
        return new Promise((resolve, reject) => {
            axios.get(`https://localhost:7236/api/v1/Products/${id}`)
                .then(response => {
                    axios.get(`https://localhost:7236/api/v1/Categorys/${response.data["CategoryId"]}`).then(res => {
                        const {CategoryName,CategoryId} = res.data

                        const prd = {
                            ...response.data,
                            CategoryName,
                            CategoryId,
                        }   

                        resolve(prd)

                    }).catch(e => reject(e))
                }).catch(e => reject(e))
        })
    }

    const getCategories = () => {
        return new Promise((resolve, reject) => {
            axios.get(`https://localhost:7236/api/v1/Categorys`)
                .then(response => resolve(response.data))
                .catch(err => reject(err))
        })
    }

    const getReceiptDetails = (id) => {
        return new Promise((resolve, reject) => {
            axios.get(`https://localhost:7236/api/v1/ReceiptDetails/foreignkey/${id}`)
                    .then(response => {
                        resolve(response.data)
                    }).catch(err => reject(err))
        })
    }

    const getDetailReceiptById = (id) => {
        return new Promise((resolve, reject) => {
            axios.get(`https://localhost:7236/api/v1/Receipts/${id}`)
                .then(response => {
                    const receipt = response.data

                    getReceiptDetails(id)
                        .then(details => {
                            resolve({...receipt,details})
                        }).catch(err => reject(err))

                }).catch(err => reject(err))
        })
    }

    const getCategoryById = (id) => {
        return new Promise((resolve, reject) => {
            axios.get(`https://localhost:7236/api/v1/Categorys/${id}`).then(res => {                
                resolve(res.data)

            }).catch(e => reject(e))
        })
    }

    const insertEntity = (entity,newEntity) => {
        return new Promise((resolve, reject) => {
            axios.post(`https://localhost:7236/api/v1/${entity}s`,newEntity)
                .then(res => {
                    resolve(res.data)
                }).catch(e => reject(e))
        })
    }

    const deleteEntity = (entity,id) => {
        return new Promise((resolve, reject) => {
            axios.delete(`https://localhost:7236/api/v1/${entity}s/${id}`)
                .then(res => resolve(res.data))
                .catch(e => reject(e))
        })
    }

    const search = (entity,keyword) => {
        return new Promise((resolve, reject) => {
            axios.get(`https://localhost:7236/api/v1/${entity}s${keyword != "" ? `/search?keyword=${keyword}` : ""}`)
                .then(res => {
                    setData(res.data)
                    resolve(res.data)
                })
                .catch(e => reject(e))
        })
    }

    const update = (entity,newEntity,id) => {
        return new Promise((resolve, reject) => {
            axios.put(`https://localhost:7236/api/v1/${entity}s/${id}`,newEntity)
                .then(res => resolve(res.data))
                .catch(e => reject(e))
        })
    }

    const postImageToStorage = (file,refLocation) => {
        return new Promise((resolve, reject) => {
            const storageRef = ref(storage, `${refLocation}` + Date.now());
            const uploadTask = uploadBytesResumable(storageRef, file);
    
            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                }, 
                (error) => {
                    reject(error);
                }, 
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL)
                    }).catch((error) => reject(error));
                }
                );
        })
    }

    const postMultipleImage = (listFile,refLocation) => {
        return new Promise((resolve, reject) => {
            const promises = [];
            listFile.forEach(file => {
                const postImage = postImageToStorage(file, refLocation)
            
                promises.push(postImage)
            })

            Promise.all(promises).then(() => resolve()).catch((error) => reject(error));
        })
    }

    const deleteMultipleImage = (listUrl) => {
        return new Promise((resolve, reject) => {
            const promises = []

            listUrl.forEach((url) => {
                const imageRef = ref(storage,url)
                const deleteImage = deleteObject(imageRef)

                promises.push(deleteImage)
            })

            Promise.all(promises).then(() => resolve()).catch((err) => reject(err))
        })
    }

    const deleteImageInStorage = (id) => {
        return new Promise((resolve, reject) => {
            getImageByProId(id)
                .then(images => {
                    const promises = []
                    images.forEach(image => {
                        const imageRef = ref(storage,image)
                        const deleteImage = deleteObject(imageRef)

                        promises.push(deleteImage)
                    })

                    Promise.all(promises)
                        .then(() => resolve())
                        .catch(error => reject(error))
                }).catch(error => reject(error))
        })
    }

    const getEntitiesViaForeignKey = (entity,id) => {
        return new Promise((resolve, reject) => {
            axios.get(`https://localhost:7236/api/v1/${entity}s/foreignkey/${id}`)
                .then((response) => {
                    resolve(response.data)
                }).catch(error => reject(error))
        })
    }

    const updateAmount = (id,amount) => {
        return new Promise((resolve, reject) => {
            axios.put(`https://localhost:7236/api/v1/Products/amout?id=${id}&amount=${amount}`)
                .then((response) => {
                    resolve(response.data)
                }).catch(err => reject(err))
        })
    }

    useEffect(() => {
        const listId = JSON.parse(sessionStorage.getItem("product_id"))

        if(listId){
            setListIdInCart(listId)
        }
    },[])

    return (    
        <DataBaseContext.Provider
            value={{
                data,
                fetchData,
                getProductById,
                getCategories,
                getCategoryById,
                getDetailReceiptById,
                insertEntity,
                deleteEntity,
                search,
                update,
                postImageToStorage,
                deleteImageInStorage,
                getImageByProId,
                listImage,
                setListImage,
                postMultipleImage,
                deleteMultipleImage,
                browseReceipt,
                pagingProduct,
                getEntitiesViaForeignKey,
                showMessage,
                setMessage,
                message,
                setShowMessage,
                pushIdToSessions,
                listIdInCart,
                removeIdFromSession,
                getProvinces,
                getDistricts,
                getWards,
                getServiceShip,
                getShipFee,
                updateAmount,
                news,
                newsIndex,
                setNewsIndex
            }}
        >
            {children}
        </DataBaseContext.Provider>
    );
};

export default DataBase;
export {DataBaseContext};