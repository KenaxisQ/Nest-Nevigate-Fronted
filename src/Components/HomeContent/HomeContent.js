import React from 'react'
import './HomeContent.css'
export default function HomeContent() {
  return (
    <div className='container homeContentBody'>
      <p>From as low as $10 per day with limited time offer discounts.</p>
      <br/>
      <h1>Simplifying Real Estate in Srikakulam<br/>Find your Perfect Place with Next Navigators </h1>
      <div className='filterProperties'>
        <div className='propertyFilter selectedFilter'>
          Buy
        </div>
        <div className='propertyFilter'>
          Rent
        </div>
        <div className='propertyFilter'>
          PG/Coliving
        </div>
        <div className='propertyFilter'>
          Commercial
        </div>
        <div className='propertyFilter'>
          Plot/Land
        </div>

      </div>
        <div className='searchSectionWrapper row'>
        <div className='categoryWapper selectWrapper col-lg-1'>
        <select className="selectBox">
          <option>Buy</option>
          <option>Rent</option>
          <option>PG/Coliving</option>
          <option>Commercial</option>
          <option>Plot/Land</option>
        </select>
        </div>
        <div className='selectWrapper col-lg-3'>
        <select className="selectBox">
          <option>All</option>
          <option>Land</option>
          <option>House</option>
          <option>Apartment/Flat</option>
        </select>
        </div>
        <div className='searchBoxWrapper col-lg-6'>
        <input type="text" placeholder="Enter Keywords"/>
        </div>
        <div className='searchButtonWrapper col-lg-2'>
        <button className='btn btn-primary searchButton'>Search</button>
        </div>
        </div>
        <div className='Gap_150'>

        </div>
    </div>
  )
}
