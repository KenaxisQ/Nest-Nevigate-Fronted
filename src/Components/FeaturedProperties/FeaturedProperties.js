import React, { useState, useEffect } from 'react';
import './FeaturedProperties.css';
import PropertyCard from '../PropertyCard/PropertyCard';  // Import the PropertyCard component
import { IoIosArrowRoundForward } from "react-icons/io";
import HttpService from '../../Services/http';

export default function FeaturedProperties({ properties}) {

  // State to toggle between showing 12 or all properties
  const [showAll, setShowAll] = useState(false);
  const [featuredProperties, setFeaturedProperties] = useState([]);
  useEffect(() => {
    const getFeaturedProperties = async () => {
      const https = new HttpService();
      const allProps = await https.get('property');
      setFeaturedProperties(allProps?.data);
    };
    getFeaturedProperties();
  }, [])
  // Toggle the showAll state
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };
  console.log('featuredProperties', featuredProperties)
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
        {properties?.slice(0, showAll ? properties?.length : 4).map((property) => (
          <div className='col-lg-3 cardWrapper' key={property.id}>
            <PropertyCard
              type={property.type}
              title={property.title}
              location={property.location}
              price={property.price}
              beds={property.beds}
              washrooms={property.washrooms}
              area={property.area}
              like ={ true}
              props={property}
            />
          </div>
        ))}
      </div>
      
      {/* DB Properties */}
      <div className='propertyList row'>
        <p>{"feature"}</p>
        {featuredProperties?.slice(0, showAll ? featuredProperties.length : 4).map((property) => (
          <div className='col-lg-3 cardWrapper' key={property.id}>
            <PropertyCard
              type={property.propertyListingFor}
              title={property.title}
              location={property.village}
              price={property.price}
              beds={property.noOfBedrooms}
              washrooms={property.noOfBathrooms}
              area={property.carpetArea}
              like ={ true}
              props={property}
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
