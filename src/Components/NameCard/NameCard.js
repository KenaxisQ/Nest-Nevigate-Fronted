import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './NameCard.css'
import { IoIosArrowDropdown } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { CiViewList } from "react-icons/ci";
export default function NameCard({name,designation,avatar,userOptions}) {
  const[isUserOptionsOpen,setIsUserOptionsOpen] =useState(false);
  const navigate = useNavigate();
  return (
    <div className="namecard"  onClick={()=>
      userOptions&&setIsUserOptionsOpen(!isUserOptionsOpen)
    }
    style={{cursor:userOptions?'pointer':'auto'}}>
    <img src={avatar} alt="" onMouseOver={()=>setIsUserOptionsOpen(true)}
      onMouseLeave={()=>setIsUserOptionsOpen(false)} />
    <div className="agentspecs">
    <p className='col_black'>{name}</p>
    <p style={{marginTop: '0px',color:'#292D3270'}}>{designation}&nbsp;
      {userOptions&&<IoIosArrowDropdown
      style={{cursor:"pointer",position:'relative'}}
      />}</p>
      <div className='userOptions' style={{display:isUserOptionsOpen?"block":'none'}}>
        <button className='btn btn-light m-2' onClick={()=>navigate(`/`)}><IoHomeOutline/>&nbsp; Home</button>
        <button className='btn btn-light m-2' onClick={()=>navigate(`/listings`)}>
          <CiViewList/>&nbsp; Listings</button>
        <button className='btn btn-danger m-2'>Logout</button>
      </div>
    </div>

  </div>
  )
}

