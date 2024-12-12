import Navbar from "../CustomNavbar/CustomNavbar"
import { useLocation } from "react-router-dom";
import { UserInfo } from "./UserInfo/UserInfo"
import './PropertyForm.css';
import { AddProperty } from "./Property/AddProperty";
export const PropertyForm = () => {
    // const location = useLocation();
    // const { customData } = location.state || {}; // Accessing state
    return(
        <>
            <Navbar />
            <div className="property-main">
                {/* <UserInfo /> */}
            </div>
            <AddProperty />
        </>
    )
}