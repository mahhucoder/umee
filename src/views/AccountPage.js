import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { UserContext } from '../Context/UserContext';
import BaseAccountField from '../components/Base/BaseAccountField';
import "../css/views/AccountPage.css"
import BaseButton from '../components/Base/BaseButton'
import { SlidingPebbles } from 'react-spinner-animated';
import TheReceiptTable from '../components/TheReceiptTable';

const AccountPage = props => {

    const {user,UpdateAccount,fetchAccountFromDTB} = useContext(UserContext)
    const [isLoading,setIsLoading] = useState(true)
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [dateOfBirth,setDateOfBirth] = useState('')
    const [gender,setGender] = useState('')
    const [disabled,setDisabled] = useState(true)

    const updateAccount = () => {

        setIsLoading(true)

        const userUpdate = {
            "accountId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            "firebaseUID": "string",
            "name": name,
            "admin": true,
            "email": "string@gmail.com",
            "dateOfBirth": dateOfBirth,
            "gender": gender
          }

        UpdateAccount(userUpdate)
          .then(() => {
            fetchAccountFromDTB(user.FirebaseUID)
            setDisabled(true)
            setIsLoading(false)
          }).catch(err => {
              console.log(err)
          })
    }

    useEffect(() => {

        if(user){
            setName(user.Name)
            setEmail(user.Email)
            setDateOfBirth(user.DateOfBirth)
            setGender(user.Gender)
            setIsLoading(false)
        }

    },[user,disabled])

    return (
        <div className="accountPageContainer">

            {isLoading ? 
                <div className="loading">
                    <SlidingPebbles color="white" text="Chờ xíu nhoa <3" bgColor="#A62B4D" />
                </div>
                : null
            }

            <div className="accountPageHeader">
                Trang chủ &gt; Tài khoản
            </div>

            <div className="accountFormTitle">Thông tin tài khoản</div>
            <div className="accountPageForm">
                <div className="accountPageFormLeft">
                    <BaseAccountField type="text" disabled={disabled} method={setName} value={name} title="Tên"/>
                    <BaseAccountField type="email" disabled={disabled} value={email} method={setEmail} title="Email" />
                </div>

                <div className="accountPageFormRight">
                    <BaseAccountField type="date" disabled={disabled} method={setDateOfBirth} value={dateOfBirth.slice(0,10)} title="Ngày sinh" />
                    <BaseAccountField type="radio" method={setGender} disabled={disabled} value={gender} title="Giới tính" />
                </div>

                <div className="accountPageFormButton">
                    {disabled ? 
                        <BaseButton color="#fff" text="Chỉnh sửa" method={() => setDisabled(!disabled)} />
                    : 
                        <div className="accountButtonFuc">
                            <BaseButton color="#fff" text="Hủy" method={() => setDisabled(true)} />
                            <BaseButton bgColor="#fff" text="Lưu" method={updateAccount} />
                        </div>
                    }
                </div>
            </div>

            <div className="accountPageReceiptTable">
                <div className="receiptTitle">Đơn hàng của bạn</div>
                <TheReceiptTable />
            </div>
        </div>
    );
};

AccountPage.propTypes = {
    
};

export default AccountPage;