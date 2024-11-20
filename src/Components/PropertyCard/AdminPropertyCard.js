// PropertyCard.js
import React from 'react';
import locationVector from '../../Assets/LocationVector.png';
import bedImage from '../../Assets/bedIcon.svg';
import washroomImage from '../../Assets/washroom.png';
import areaImage from '../../Assets/area.png';
import './PropertyCard.css';
import './AdminPropertyCard.css';
import { TiTick } from "react-icons/ti";
import { MdOutlineCancel } from "react-icons/md";
import adminAcceptIcon from '../../Assets/adminAccept.svg';
import adminRejectIcon from '../../Assets/adminReject.svg';

const AdminPropertyCard = ({ type, title, location, price, beds, washrooms, area, height}) => {
  return (
    <div className="card propertylistingcard" style={{height: '350px'}} >
      <div className='propertyTagsWrapper'>
        <div className="propertyTags" style={{marginTop:'5px'}}>
        <div className='propertyTag rent' style={{height:'30px', width:'auto',padding:'8px 10px 0px 10px'}}>For {type}</div>
        {/* <div className='propertyTag featured'style={{height:'30px', width:'auto',padding:'5px 10px'}}>Featured</div> */}
        </div>
        <div className="adminpropertyApprovals">
          <div className="propertyAccept">
          <img src={adminAcceptIcon}/>
          </div>
          <div className="propertyReject">
         <img src={adminRejectIcon}/>
          </div>
        </div>
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
              <span>{beds}</span>
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

export default AdminPropertyCard;
