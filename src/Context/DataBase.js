import axios from 'axios';
import { deleteObject, getDownloadURL, getStorage, listAll, ref, uploadBytesResumable } from 'firebase/storage';
import React, { createContext, useState } from 'react';

const DataBaseContext = createContext()

const DataBase = ({children}) => {

    const [data,setData] = useState([])
    const [listImage,setListImage] = useState([])

    const storage = getStorage()

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

    const fetchData = (entity,id) => {
        axios.get(`https://localhost:7236/api/v1/${entity}${id ? '/'+id : ''}`)
            .then(response => setData(response.data))
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
                    resolve()
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
                browseReceipt
            }}
        >
            {children}
        </DataBaseContext.Provider>
    );
};

export default DataBase;
export {DataBaseContext};