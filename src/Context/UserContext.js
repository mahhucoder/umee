import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, 
        sendPasswordResetEmail, 
        getAuth, 
        onAuthStateChanged, 
        signInWithEmailAndPassword, 
        signOut,
    } from "firebase/auth"
import firebase from '../Firebase/config';
import axios from 'axios';
import { SlidingPebbles } from 'react-spinner-animated';

const UserContext = createContext()

const User = ({children}) => {

    const [user,setUser] = useState(null)
    const [isLoading,setIsLoading] = useState(true)

    const auth = getAuth(firebase)

    const UpdateAccount = (account) => {
        return new Promise((resolve, reject) => {
            axios.put(`https://localhost:7236/api/v1/Accounts/${user.AccountId}`, account)
                .then(() => resolve())
                .catch(err => reject(err))
        })
    }

    const fetchAccountFromDTB = async (firebaseUID) => {
        const account = await axios({
            method: 'GET',
            headers:{
                "Content-Type": "application/json"
            },
            url:`https://localhost:7236/api/v1/Accounts/firebaseUID?firebaseUID=${firebaseUID}`
        })
            .then(response => {
                setUser(response.data)
            })
    }

    const createAccount = (newUser,uid) => {

        return new Promise(async (resolve, reject) => {
            await axios.post(`https://localhost:7236/api/v1/Accounts`,{
                "accountId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                "firebaseUID": uid,
                "name": newUser.name,
                "admin": false,
                "email": newUser.email,
                "dateOfBirth": newUser.birthday,
                "gender": newUser.gender
            }).then(() => {
                fetchAccountFromDTB(uid)
                resolve()
            }).catch(e => {
                reject(e)
            })
        })

    }

    const loginWithEmailAndPassword = async (email, password) =>{
        return new Promise((resolve, reject) => {

            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("Happy login !")

                const uid = userCredential.user.uid

                fetchAccountFromDTB(uid)

                resolve()
            })
            .catch((error) => {
                const errorCode = error.code;

                reject(errorCode)
            });
        })
    }

    const registerUser = (newUser) => {
        return new Promise((resolve, reject) => {
            createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
            .then((userCredential) => {
                const uid = userCredential.user.uid

                createAccount(newUser,uid)
                    .then(() => resolve())
                    .catch(e => reject(e))
              })
              .catch((error) => {
                const errorCode = error.code;
    
                console.log(`error code : ${errorCode}`)
                reject(errorCode)
              });
        })
    }

    const logout = () => {
        return new Promise((resolve, reject) => {
            signOut(auth)
                .then(() => {
                    setUser(null)
                    resolve()
                }).catch(error => {
                    reject(error)
                })

        })
    }

    const resetPassword = () => {
        return new Promise((resolve, reject) => {
            sendPasswordResetEmail(auth,user.Email)
                .then(() => {
                    resolve()
                }).catch(error => reject(error))
        })
    }

    useEffect(() => {
        onAuthStateChanged(auth, (userCredential) => {
            if (userCredential) {
                
                const uid = userCredential.uid
    
                fetchAccountFromDTB(uid)
                setIsLoading(false)
            } else {
                setUser(null)
                setIsLoading(false)
            }})

    },[auth])

    return (    
        <UserContext.Provider
            value={{
                user,
                loginWithEmailAndPassword,
                registerUser,
                logout,
                resetPassword,
                UpdateAccount,
                fetchAccountFromDTB
            }}
        >
            {isLoading ? 
                <div className="loading">
                    <SlidingPebbles color="white" text="Chờ xíu nhoa <3" bgColor="#A62B4D" />
                </div>
                : null
            }
            {children}
        </UserContext.Provider>
    );
};

export default User;
export {UserContext};