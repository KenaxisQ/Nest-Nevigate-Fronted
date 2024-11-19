import React from 'react'
import {IoMdMail} from "react-icons/io";
import { FaPhone } from "react-icons/fa6";
import './Userdashboard.css'
import Navbar from '../CustomNavbar/CustomNavbar';
import Footer from '../Footer/Footer';
import Userlistings from '../UserListings/Userlistings';
import PropertyCard from '../PropertyCard/PropertyCard';
import bg_0 from '../../Assets/bg0.svg';
import bg_1 from '../../Assets/bg1.svg';
import bg_2 from '../../Assets/bg1.svg';


// import ProgressBar from '../progressBar/progressBar'

export default function Userdashboard({properties}) {
    const Images =[bg_0,bg_1,bg_2]
  return (
    <div className="userdashboard">
        <Navbar />
        <div className="profile-header">
                <div className='usergreetings'>Hey! <span className="username">{'<UserName - First/Last Name>'}</span></div>
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
                
            </div>
        <Userlistings />
        <div className='userlistings row'>
        {properties.slice(0,4).map((property,index) => (
          <div className='col-lg-3 cardWrapper' key={property.id}>
            <PropertyCard
              type={property.type}
              title={property.title}
              location={property.location}
              price={property.price}
              beds={property.beds}
              washrooms={property.washrooms}
              area={property.area}
              like = {true}
              bg={Images[index]}
              height={'350px'}
              share={true}

            />
          </div>
        ))}
        </div>
        <Footer/>
    </div>
    
  )
}

