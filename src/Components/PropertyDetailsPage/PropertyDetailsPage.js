import React, { useState } from 'react';
import Navbar from '../CustomNavbar/CustomNavbar';
import propertyImg1 from '../../Assets/propertyImg1.jpg';
import propertyImg2 from '../../Assets/propertyImg2.jpg';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './PropertyDetailsPage.css';
import locationVector from '../../Assets/LocationVector.png';
import bedImage from '../../Assets/bedIcon.svg';
import parking from '../../Assets/parking.svg'
import conditions from '../../Assets/condition.svg'
import legalDocuments from '../../Assets/legal-document.svg';
import ownerShip from '../../Assets/ownership.svg'
// Image items for the gallery
const images = [
  {
    original: propertyImg1,
    thumbnail: propertyImg1,
  },
  {
    original: propertyImg2,
    thumbnail: propertyImg2,
  },
  {
    original: propertyImg1,
    thumbnail: propertyImg1,
  },
  {
    original: propertyImg1,
    thumbnail: propertyImg1,
  },
  {
    original: propertyImg2,
    thumbnail: propertyImg2,
  },
  {
    original: propertyImg1,
    thumbnail: propertyImg1,
  },
];

export default function PropertyDetails() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Updated handler to receive the current index
  const handleImageClick = (event) => {
    const currentImage = images[currentIndex];
    if (currentImage && currentImage.original) {
      setSelectedImage(currentImage.original);
      setModalVisible(true);
    }
  };

  const handleSlide = (index) => {
    setCurrentIndex(index);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedImage(null);
  };

  return (
    <div className="propertyDetailsPage">
      <Navbar />
      <div className="propertyImagesDisplay">
        <ImageGallery
          items={images}
          thumbnailPosition="right"
          showPlayButton={false}
          autoPlay={false}
          useTranslate3D={true}
          showBullets={true}
          lazyLoad={true}
          showNav={false}
          // showFullscreenButton={false}
          onClick={handleImageClick}
          onSlide={handleSlide}  // Add this to track current slide index
          startIndex={currentIndex}  // Add this to control the starting index
        />
</div>
      {modalVisible && selectedImage && (
        <div
          className="modal fade show"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ display: 'block' }}
        >
          <div className="modal-dialog modal-lg" role="document" style={{backgroundColor:'white'}}>
            <div className="modal-content" style={{ maxWidth: '100%', backgroundColor: 'black' }}>
              <div className="closeModalButtonWrapper" style={{ textAlign: 'right', padding: '10px 20px' }}>
                <button className="btn btn-danger" onClick={handleCloseModal} style={{ width: '80px' }}>
                  &times;
                </button>
              </div>
              <img
                src={selectedImage}
                alt="Selected"
                className="img-fluid"
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '80vh',
                  objectFit: 'contain',
                  margin: '0 auto',
                  display: 'block',
                }}
              />
              <div className="modal-footer" style={{ justifyContent: 'center', color: 'white' }}>
                Image {currentIndex + 1} of {images.length}
              </div>
            </div>
          </div>
        </div>
      )}
<div className="propertyDetails row" style={{marginRight:'0px'}}>
  <div className="PropertyDetailDescription col-lg-9">
        <h2 className='col_black'>The Modern Moreland House</h2>
        <p><img src={locationVector} style={{margin:'0px 4px 4px 0px'}}/>2742 Westemeier Road, Bronx , New Your City</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit animcommodo  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint `occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est ....</p>
        <h4 className='col_black'>Property Details</h4>
        <div className="propertydetailsIcons">
          <p><img src={bedImage}></img>&nbsp; 4 Rooms / Spaces </p>
          <p><img src={parking}></img>&nbsp; 5 Parking </p>
          <p><img src={conditions}></img>&nbsp; Conditions </p>
          <br/>
          <p><img src={conditions}></img>&nbsp; Possession : <span style={{fontWeight:400}}>Ready to move</span> </p>
          <p><img src={legalDocuments}></img>&nbsp; No Encumberence</p>
          <p><img scr={ownerShip}/>&nbsp;<span style={{fontWeight:400}}>Provided</span> </p>
        </div>

       </div>
       <div className="propertyBasicInfo col-lg-3">
          <h4 className='col_black'>Detail</h4>
          <div className="propertyDetailsInner">
          <div className="headtag">
          <p>Property Type</p>
          <p>Offer Type</p>
          <p>Floor Level</p>
          <p>Furnishing</p>
          <p>Surface Area</p>
          <p>Status</p>
          <p>Asking Price:</p>
          </div>
          <div className="answertag">
          <p>Office</p>
          <p>Sale</p>
          <p>4</p>
          <p>Semi Furnished</p>
          <p>1800 m2</p>
          <p>Ready to moveIn</p>
          <p>$ 7,64,345</p>
          </div>
          </div>

        </div>
       </div>
      </div>
  );
}