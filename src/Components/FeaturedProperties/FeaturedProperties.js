import React from 'react'
import './FeaturedProperties.css'
import locationVector from '../../Assets/LocationVector.png'
import bedImage from '../../Assets/bed.png'
import washroomImage from '../../Assets/washroom.png'
import area from '../../Assets/area.png'
import { IoIosArrowRoundForward } from "react-icons/io";
import ProgressBar from '../progressBar/progressBar'
export default function FeaturedProperties() {
  return (
    <div className='featuedProperties'>
      <h1>Featured Properties</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <div className='rentSaleAll'>
        <button className='btn activebtn'>All Properties</button>
        <button className='btn'>For Sale</button>
        <button className='btn'>For Rent</button>
      </div>
      <div className='propertyList row'>
      <div className='col-lg-3 cardWrapper'>
      <div className="card propertyCard">
      <div className='propertyTags'>
        <div className='propertyTag rent'>Rent</div>
        <div className='propertyTag featured'>Featured</div>
      </div>
      <div className='propertyInfo'>
      <div className='propertyTitle'>Skyper Pool Apartment</div>
      <div className='propertyLocation'><img  src={locationVector}/> &nbsp;1800-1818 79th St</div>
      <div className='priceAmenity'>
      <div className='propertyPrice'>$&nbsp;3,95,000</div>
      <div className='amenities'>
        <div className='amenity'>
        <img src={bedImage} alt='beds'/>
        <span>&nbsp;2</span>
        </div>
       <div className='amenity'>
        <img src={washroomImage} alt='washrooms'/>
        <span>&nbsp;6</span>
        </div>
        <div className='amenity'>
        <img src={area} alt='area'/>
        <span>&nbsp;4</span>
        </div>
       

        </div>
        </div>
      </div>
      </div>
      </div>
      <div className='col-lg-3 cardWrapper'>
      <div className="card">
      </div>
      </div>
      <div className='col-lg-3 cardWrapper'>
      <div className="card">
      </div>
      </div>
      <div className='col-lg-3 cardWrapper'>
      <div className="card">
      </div>
      </div>
      </div>
      <div className='propertyList row'>
      <div className='col-lg-3 cardWrapper'>
      <div className="card">
      </div>
      </div>
      <div className='col-lg-3 cardWrapper'>
      <div className="card">
      </div>
      </div>
      <div className='col-lg-3 cardWrapper'>
      <div className="card">
      </div>
      </div>
      <div className='col-lg-3 cardWrapper'>
      <div className="card">
      </div>
      </div>
      </div>
      <buttton className='btn seeAllListings'>See All Listing <IoIosArrowRoundForward /></buttton>
    </div>
  )
}
