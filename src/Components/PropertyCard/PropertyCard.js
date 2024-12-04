// PropertyCard.js
import React, {useState, useRef} from 'react';
import locationVector from '../../Assets/LocationVector.png';
import bedImage from '../../Assets/bedIcon.svg';
import washroomImage from '../../Assets/washroom.png';
import areaImage from '../../Assets/area.png';
import wish from '../../Assets/wish.svg';
import wishheart from '../../Assets/wishheart.svg';
import './PropertyCard.css';
import cardbg from '../../Assets/p1.jpg';
import ShareIcon from '../../Assets/share.svg'
import adminRejectIcon from '../../Assets/adminReject.svg';
import { AdminEditForm } from './EditForm/AdminEditForm';
const PropertyCard = ({ type, title, location, price, beds, washrooms, area, isFeatured=true, height,bg,like,share, isEdit =false }) => {
  const [isPropertyLiked,setIsPropertyLiked]= useState(false)
  const canEditRef = useRef(null);
  const [canEdit, setCanEdit] = useState(false);
  const onEditForm = (event) => {
    setCanEdit(true);
    console.log('changePassword', event);
    const modal = new window.bootstrap.Modal(canEditRef?.current);
    modal.show();
}
  return (
    <>
    <div className="card propertylistingcard" style={{height:height,background:bg?`url(${bg})`:`url(${cardbg})`}}>
      <div className='propertyTags'>
        <div className='PropertyTagWrapper'>
          <div className='propertyTag rent'>{type}</div>
          {isFeatured && <div className='propertyTag featured'>{"Featured"}</div>}
        </div>
      <div className='likeAndShareBtnWrapper'>
      {share&& <div className='propertyTaglike'>
        <div className=' wish'
        ><img src={ShareIcon} alt= ''  /></div>
      </div>}
       {like&& <div className='propertyTaglike'>
        <div className=' wish'
        ><img src={isPropertyLiked?wishheart:wish} alt= '' onClick={()=>setIsPropertyLiked(!isPropertyLiked)} /></div>
      </div>}
      {isEdit&&<div className="propertyAccept">
         <img src={adminRejectIcon} onClick={onEditForm} alt='Edit Form'/>
          </div>}
      
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
    <AdminEditForm property={[]} canEditRef={canEditRef}/>
</>
  );
};

export default PropertyCard;
