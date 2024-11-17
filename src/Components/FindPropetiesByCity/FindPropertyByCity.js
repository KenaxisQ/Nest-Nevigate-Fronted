import React from 'react'
import './FindPropertyByCity.css'
import CityCarousel from '../carousel/CityCarousel'
import BecomeAnAgent from "../Become an Agent/BecomeAnAgent";
import CityImage1 from '../../Assets/city1.jpg';
import CityImage2 from '../../Assets/city2.jpg';
import CityImage3 from '../../Assets/city3.jpg';
import CityImage4 from '../../Assets/city4.jpg';
import CityImage5 from '../../Assets/city5.jpg';

export default function FindPropertyByCity() {
  const cityInfo = [
    {
      Image:CityImage1,
        Name:"Palasa",
        Properties:2
    },
    {
      Image:CityImage2,
      Name:"Tikkali",
      Properties:12
    },
    {
       Image:CityImage3,
       Name:"Srikakulam",
       Properties:5
    },
    {
      Image:CityImage4,
      Name:"Ichapuram",
      Properties:10
    },
    {
      Image:CityImage5,
      Name:"Pathapatnam",
      Properties:16
    }
  ]

  return (
    <div className='container '>
      <div className='propertiesByCity'>
      <h1>Find Properties In These Cities</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <CityCarousel cityPropertiesInfo={cityInfo}/>
      </div>
      <BecomeAnAgent/>
    </div>
  )
}
