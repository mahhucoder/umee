import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, 
        sendPasswordResetEmail, 
        getAuth, 
        onAuthStateChanged, 
        signInWithEmailAndPassword, 
        signOut,
        updatePassword,
    } from "firebase/auth"
import firebase from '../Firebase/config';

const UserContext = createContext()

const User = ({children}) => {

    const [user,setUser] = useState(null)
    // const [userFirebase,setUserFirebase] = useState(null)

    const auth = getAuth(firebase)

    const loginWithEmailAndPassword = async (email, password) =>{
        return new Promise((resolve, reject) => {

            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("Happy login !")

                const uid = userCredential.user.uid

                //Lay du lieu user trong databasse

                //setUser

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
                console.log("Happy Register !")
                const uid = userCredential.user.uid

                //Tao user moi

                //lay user moi

                //setUser moi

                resolve()
              })
              .catch((error) => {
                const errorCode = error.code;
    
                console.log(`error code : ${errorCode}`)
                reject(errorCode)
              });
        })
    }

    const changePassword = (password) => {

        updatePassword(user, password)
            .then(() => {

            })
    }

    const logout = () => {
        signOut(auth)
            .then(() => {
                setUser(null)
            }).catch(error => console.log(error))
    }

    const resetPassword = () => {
        sendPasswordResetEmail(auth,user.email)
            .then(() => {
                console.log("sent password reset email")
            }).catch(error => console.log(error))
    }

    useEffect(() => {
        onAuthStateChanged(auth, (userFirebase) => {
            if (userFirebase) {
                setUser(userFirebase)
            } else {
                setUser(null)
            }})
    },[auth])

    return (    
        <UserContext.Provider
            value={{
                user,
                loginWithEmailAndPassword,
                registerUser,
                logout,
                resetPassword
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default User;
export {UserContext};