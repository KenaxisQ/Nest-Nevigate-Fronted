import './UserInfo.css';
import {IoMdMail} from "react-icons/io";
import { FaPhone } from "react-icons/fa6";


export const UserInfo = () => {
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
                    <button className="change-password">Change Password</button>
                    <button className="view-listings">View Listings</button>
                    <button className="logout-account">Logout Account</button>
                </div>
            </div>
        </>
    );
}