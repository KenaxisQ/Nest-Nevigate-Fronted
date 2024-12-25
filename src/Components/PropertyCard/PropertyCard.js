import React, { useState, useRef, useEffect } from 'react';
import locationVector from '../../Assets/LocationVector.png';
import bedImage from '../../Assets/bedIcon.svg';
import washroomImage from '../../Assets/washroom.png';
import areaImage from '../../Assets/area.png';
import wish from '../../Assets/wish.svg';
import wishheart from '../../Assets/wishheart.svg';
import './PropertyCard.css';
import cardbg from '../../Assets/p1.jpg';
import ShareIcon from '../../Assets/share.svg';
import adminRejectIcon from '../../Assets/adminReject.svg';
import { useAuth } from '../SignIn/AuthContext';
import { AdminEditForm } from './EditForm/AdminEditForm';
import HttpService from '../../Services/http';
import { useNavigate } from 'react-router-dom';
import propertyPlaceholder from '../../Assets/propertyPlaceholder.png'

const PropertyCard = ({
  type,
  title,
  location,
  price,
  beds,
  washrooms,
  area,
  isFeatured = true,
  height,
  bg,
  like,
  share,
  isEdit = false,
  props,
}) => {
  const { userData, setUserData } = useAuth();
  const [isPropertyLiked, setIsPropertyLiked] = useState();
  const canEditRef = useRef(null);
  const [canEdit, setCanEdit] = useState(false);
  const [thumbnail, setThumbnail] = useState(); // Initial state for thumbnail
  const navigate = useNavigate();
  const apicb = new HttpService();

  console.log('isPropertyLiked', isPropertyLiked);
  console.log('props', props);
  console.log('userData', userData);

  const onEditForm = (event) => {
    setCanEdit(true);
    const modal = new window.bootstrap.Modal(canEditRef?.current);
    modal.show();
  };

  const addPropertyToWishList = async () => {
    const userFavourites = userData?.favourites;
    let favouritesList = userFavourites?.split(',').filter(Boolean) ?? [];
    const isFavourite = favouritesList?.includes(props?.id);

    if (!isFavourite) {
      favouritesList.push(props?.id);
    } else {
      favouritesList = favouritesList?.filter(fav => fav !== props?.id);
    }
    
    const updatedFavourites = favouritesList?.join(',') || ' ';
    userData.favourites = updatedFavourites;
    setUserData(userData);

    const response = await apicb.put(`user/addToFavourites/${userData?.id}`, updatedFavourites, true);
  };

  const getCardThumbnailImg = () => {
    if (props?.media != null) {
      const images = typeof props.media === 'string' ? JSON.parse(props.media).images : props.media.images;
      // Ensure the images array exists and set the first image as the thumbnail
      if (images && images.length > 0) {
        setThumbnail(images[0]);
      }
    } else {
      setThumbnail(propertyPlaceholder); // Fallback image
    }
  };

  // Corrected useEffect
  useEffect(() => {
    debugger;
    getCardThumbnailImg(); // This will fetch the thumbnail image
  }, [props?.media]); // Re-run only if props.media changes

  return (
    <>
      <div
        className="card propertylistingcard"
        style={{ height: height, background: bg==true?`url(${thumbnail})`:`url(${cardbg})` ,backgroundSize: thumbnail==propertyPlaceholder?"contain":""}}
      >
        <div className="propertyTags">
          <div className="PropertyTagWrapper">
            <div className="propertyTag rent">{type}</div>
            {isFeatured && <div className="propertyTag featured">{"Featured"}</div>}
          </div>
          <div className="likeAndShareBtnWrapper">
            {share && (
              <div className="propertyTaglike">
                <div className="wish">
                  <img src={ShareIcon} alt="" />
                </div>
              </div>
            )}
            {like && (
              <div className="propertyTaglike">
                <div className="wish">
                  <img
                    src={userData?.favourites?.split(',').includes(props?.id) ? wishheart : wish}
                    alt=""
                    onClick={() => {
                      setIsPropertyLiked(!isPropertyLiked);
                      addPropertyToWishList();
                    }}
                  />
                </div>
              </div>
            )}
            {isEdit && (
              <div className="propertyAccept">
                <img src={adminRejectIcon} onClick={onEditForm} alt="Edit Form" />
              </div>
            )}
          </div>
        </div>
        <div className="propertyInfo" onClick={() => {
          navigate(`/detail/${props.id}`, { state: { data: props } });
        }}>
          <div className="propertyTitle">{title}</div>
          <div className="propertyLocation">
            <img alt="location" src={locationVector} /> &nbsp;{location}
          </div>
          <div className="priceAmenity">
            <div className="propertyPrice">{`Rs ${price}`}</div>
            <div className="amenities">
              <div className="amenity">
                <img src={bedImage} alt="beds" />
                <span>{beds}</span>
              </div>
              <div className="amenity">
                <img src={washroomImage} alt="washrooms" />
                <span>&nbsp;{washrooms}</span>
              </div>
              <div className="amenity">
                <img src={areaImage} alt="area" />
                <span>&nbsp;{area}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isEdit && <AdminEditForm property={props} canEditRef={canEditRef} propertyDetails={props} />}
    </>
  );
};

export default PropertyCard;
