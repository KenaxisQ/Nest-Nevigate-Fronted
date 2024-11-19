import React from 'react'
import './Userlistings.css'

export default function Userlistings() {
  return (
    <div >
        <div className="profile-buttons">
            
                    <div className='listing_btn_wrapper'>
                    <button className="listings">View Listings</button>
                    <button className="listings">WishList</button>
                    <button className="listings">Edit Profile</button>
                    </div>
                    <button className="listings logout ">Logout Account</button>
                  
                </div>
          
            <h1>view all Listings </h1>
            <p>Fill the form below to list a property , Remember each listing requires 50 tokens.</p>
           
    </div>
  )
}
