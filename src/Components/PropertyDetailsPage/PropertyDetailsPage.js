import React from 'react'
import Navbar from '../CustomNavbar/CustomNavbar'
import propertyImg1 from '../../Assets/propertyImg1.jpg'
import './PropertyDetailsPage.css'
export default function PropertyDetails() {
  return (
    <div className='propertyDetailsPage'>
        <Navbar/>
        <div className="propertyImages row">
            <div className="col-lg-6 activeImg">
                {/* <img src={propertyImg1}/> */}
            </div>
            <div className="col-lg-6">
            {/* <img src={propertyImg1}/> */}
            </div>
        </div>
    </div>
  )
}
