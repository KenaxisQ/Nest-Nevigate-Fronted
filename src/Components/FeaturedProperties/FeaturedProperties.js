import React, { useState } from 'react';
import './FeaturedProperties.css';
import PropertyCard from '../PropertyCard/PropertyCard';  // Import the PropertyCard component
import { IoIosArrowRoundForward } from "react-icons/io";

export default function FeaturedProperties({ properties}) {

  // State to toggle between showing 12 or all properties
  const [showAll, setShowAll] = useState(false);

  // Toggle the showAll state
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className='featuredProperties'>
      <h1>Featured Properties</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <div className='rentSaleAll'>
        <button className='btn activebtn'>All Properties</button>
        <button className='btn'>For Sale</button>
        <button className='btn'>For Rent</button>
      </div>

      {/* Loop through properties, showing 12 or all based on showAll state */}
      <div className='propertyList row'>
        {properties.slice(0, showAll ? properties.length : 12).map((property) => (
          <div className='col-lg-3 cardWrapper' key={property.id}>
            <PropertyCard
              type={property.type}
              title={property.title}
              location={property.location}
              price={property.price}
              beds={property.beds}
              washrooms={property.washrooms}
              area={property.area}
            />
          </div>
        ))}
      </div>

      {/* Button to toggle between showing all or 12 properties */}
      <button className='btn NN_btn1' onClick={toggleShowAll}>
        {showAll ? 'See Less Listings' : 'See All Listings'}
        <IoIosArrowRoundForward />
      </button>
    </div>
  );
}
