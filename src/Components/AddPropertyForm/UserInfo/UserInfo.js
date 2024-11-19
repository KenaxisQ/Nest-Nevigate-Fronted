import './UserInfo.css';
import {IoMdMail} from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import React, { useState }from 'react';
import { useRef } from "react";
import {ChangePassword} from './Changepassword/ChangePassword';
export const UserInfo = () => {
    const modal1Ref = useRef(null);
    const [changePasswordPageOpen, setChangePasswordPageOpen] = useState(false);
    const changePassword = (event) => {
        setChangePasswordPageOpen(true);
        console.log('changePassword', event);
        const modal = new window.bootstrap.Modal(modal1Ref?.current);
        modal.show();
    }
    return (
        <>
            <div className="profile-header">
                <h1>Hey! <span className="username">UserName - First/Last Name</span></h1>
                <div className="profile-info">
                    <p>
                        <IoMdMail size={20} className="me-2" />
                        <span className="email">mailaddress@gmail.com</span>
                    </p>
                    <p>
                        <FaPhone size={20} className="me-2"/>
                        <span>+91 9717179191</span>
                    </p>
                </div>
                <div className="profile-buttons">
                    <button className="change-password" onClick={changePassword}>Change Password</button>
                    <button className="view-listings">View Listings</button>
                    <button className="logout-account">Logout Account</button>
                </div>
            </div>
            <div>
                <ChangePassword
                    changePasswordPageOpen={changePasswordPageOpen}
                    setChangePasswordPageOpen={setChangePasswordPageOpen}
                    modal1Ref={modal1Ref}
                />
            </div> 
        </>
    );
}