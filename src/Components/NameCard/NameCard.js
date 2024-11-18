import React from 'react'
import './NameCard.css'
export default function NameCard({name,designation,avatar}) {
  return (
    <div className="namecard">
    <img src={avatar} alt="" />
    <div className="agentspecs">
    <p className='col_black'>{name}</p>
    <p style={{marginTop: '0px',color:'#292D3270'}}>{designation}</p>
    </div>
  </div>
  )
}

