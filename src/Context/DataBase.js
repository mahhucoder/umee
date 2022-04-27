import axios from 'axios';
import { deleteObject, getDownloadURL, getStorage, listAll, ref, uploadBytesResumable } from 'firebase/storage';
import React, { createContext, useState } from 'react';

const DataBaseContext = createContext()

const DataBase = ({children}) => {

    const [data,setData] = useState([])
    const [listImage,setListImage] = useState([])

    const storage = getStorage()

    const fetchData = (entity,id) => {
        axios.get(`https://localhost:7236/api/v1/${entity}${id ? '/'+id : ''}`)
            .then(response => setData(response.data))
    }

    const getImageByProId = (productId) => {
        return new Promise((resolve, reject) => {
            const listRef = ref(storage,`${productId}/`)
            
            listAll(listRef).then((res) => {
                res.items.forEach((itemRef) => {
                    getDownloadURL(itemRef)
                    .then((url) => {
                        setListImage(pre => [...pre,url])
                    }).catch(error => console.log(error))
                })
            
                resolve()
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
            axios.get(`https://localhost:7236/api/v1/${entity}s/search?keyword=${keyword}`)
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

    const deleteImageInStorage = (imageRef) => {
        return new Promise((resolve, reject) => {
            deleteObject(imageRef)
            .then(() => {
                resolve()
            }).catch(e => reject(e));
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
                setListImage
            }}
        >
            {children}
        </DataBaseContext.Provider>
    );
};

export default DataBase;
export {DataBaseContext};