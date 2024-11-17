// PropertyCard.js
import React from 'react';
import locationVector from '../../Assets/LocationVector.png';
import bedImage from '../../Assets/bedIcon.svg';
import washroomImage from '../../Assets/washroom.png';
import areaImage from '../../Assets/area.png';
import './PropertyCard.css';

const PropertyCard = ({ type, title, location, price, beds, washrooms, area }) => {
  return (
    <div className="card propertylistingcard">
      <div className='propertyTags'>
        <div className='propertyTag rent'>{type}</div>
        <div className='propertyTag featured'>Featured</div>
      </div>
      <div className='propertyInfo'>
        <div className='propertyTitle'>{title}</div>
        <div className='propertyLocation'>
          <img alt="location" src={locationVector} /> &nbsp;{location}
        </div>
        <div className='priceAmenity'>
          <div className='propertyPrice'>{price}</div>
          <div className='amenities'>
            <div className='amenity'>
              <img src={bedImage} alt='beds' />
              <span>&nbsp;{beds}</span>
            </div>
            <div className='amenity'>
              <img src={washroomImage} alt='washrooms' />
              <span>&nbsp;{washrooms}</span>
            </div>
            <div className='amenity'>
              <img src={areaImage} alt='area' />
              <span>&nbsp;{area}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
