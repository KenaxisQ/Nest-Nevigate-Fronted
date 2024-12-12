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
import { useAuth } from '../SignIn/AuthContext';
import { AdminEditForm } from './EditForm/AdminEditForm';
import HttpService from '../../Services/http';
import { useNavigate } from 'react-router-dom';
const PropertyCard = ({ type, title, location, price, beds, washrooms, area, isFeatured=true, height,bg,like,share, isEdit =false, props }) => {
  const {userData, setUserData} = useAuth();

  const [isPropertyLiked,setIsPropertyLiked]= useState()
  const canEditRef = useRef(null);
  const [canEdit, setCanEdit] = useState(false);
  console.log('isPropertyLiked', isPropertyLiked);
  console.log('props', props);
  console.log('userData', userData);
  const onEditForm = (event) => {
    setCanEdit(true);
    console.log('changePassword', event);
    const modal = new window.bootstrap.Modal(canEditRef?.current);
    modal.show();
}
  const navigate = useNavigate();
  
  const addPropertyToWishList = async () =>{
    
    const userFavourites = userData?.favourites;
    var favouritesList = userFavourites?.split(",").filter(Boolean) ?? [];
    const isFavourite = favouritesList?.includes(props?.id);

    if (!isFavourite) {
      // Add props.id to the list if not already present
      favouritesList?.push(props?.id);
  } else {
      // Optionally, remove props.id if you want toggle-like behavior
      favouritesList = favouritesList?.filter(fav => fav !== props?.id);
  }
    const updatedFavourites = favouritesList?.join(",") || " ";
    userData.favourites = updatedFavourites;
    setUserData(userData)
    const https = new HttpService();
    console.log('updatedFavourites', updatedFavourites)
    const response = await https.put(`user/addToFavourites/${userData?.id}`,updatedFavourites, true)
  }
  return (
    <>
    <div className="card propertylistingcard" style={{height:height,background:bg?`url(${bg})`:`url(${cardbg})`}} onClick={()=>{navigate(`/detail/${props.id}}`,{state: {data:props}})}}>
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
        ><img src={userData?.favourites?.split(',').includes(props?.id)?wishheart:wish} alt= '' onClick={()=>{setIsPropertyLiked(!isPropertyLiked); addPropertyToWishList()}} /></div>
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
          <div className='propertyPrice'>{`Rs ${price}`}</div>
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
    {isEdit && <AdminEditForm property={props} canEditRef={canEditRef} propertyDetails={props}/>}
</>
  );
};

export default PropertyCard;
