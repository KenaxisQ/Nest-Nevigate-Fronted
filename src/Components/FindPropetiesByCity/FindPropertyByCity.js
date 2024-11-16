import React from 'react'
import './FindPropertyByCity.css'
import CityCarousel from '../carousel/CityCarousel'
import BecomeAnAgent from "../Become an Agent/BecomeAnAgent";
export default function FindPropertyByCity() {

  return (
    <div className='container '>
      <div className='propertiesByCity'>
      <h1>Find Properties In These Cities</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <CityCarousel/>
      </div>
      <BecomeAnAgent/>
    </div>
  )
}
