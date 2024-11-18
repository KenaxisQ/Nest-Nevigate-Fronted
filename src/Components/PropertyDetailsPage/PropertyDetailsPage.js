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
import ownershipImg from '../../Assets/ownership.svg';
import washroomImg from '../../Assets/washroom.png';
import areaImg from '../../Assets/area.png';
import balconyImg from '../../Assets/balcony.svg';
import smokingImg from '../../Assets/smoking.svg';
import agentAvatar from '../../Assets/agentavtar.jpg';
import { FaPhoneAlt } from "react-icons/fa";
import gymIcon from '../../Assets/Gym.svg';
import elevatorImg from '../../Assets/elevator.svg';
import powerBackUpImg from '../../Assets/powerbackup.svg';
import beachAreaImg from '../../Assets/Beach_area.svg';
import hospitalImg from '../../Assets/First aid kit.svg';
import carParkingIcon from '../../Assets/carparking.svg';
import swimmingPoolIcon from '../../Assets/Pool.svg';
import securityIcon from '../../Assets/security.svg';
import wifiIcon from '../../Assets/Wifi.svg';
import coolingIcon from '../../Assets/cooling.svg';
import balconyIcon from '../../Assets/Balcony1.svg';
import gardenIcon from '../../Assets/Outdoor dining.svg';
import shoppingIcon from '../../Assets/Outdoor dining.svg';
import playGroundIcon from '../../Assets/playground1.svg';
import taxiStandIcon from '../../Assets/taxistand.svg';
import PropertyCarousel from '../PropertyCarousel/PropertyCarousel';
import Footer from '../Footer/Footer';
import NameCard from '../NameCard/NameCard';

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

export default function PropertyDetails({properties}) {
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
        <div className="propertydetailsIcons row">
          <div className="propertydetailsIconscol col-lg-3">
          <p><img src={bedImage}></img>&nbsp; 4 Rooms / Spaces </p>
          <p><img src={parking}></img>&nbsp; 5 Parking </p>
          <p><img src={washroomImg}></img>&nbsp; 2 Bathroom</p>
          <p><img src={legalDocuments}></img>&nbsp; Subletting Permission</p>
          </div>
          <div className="propertydetailsIconscol col-lg-3">
          <p><img src={conditions}></img>&nbsp; Conditions </p>
          <p><img src={conditions}></img>&nbsp; Possession : <span style={{fontWeight:400}}>Ready to move</span> </p>
          <p><img src={areaImg}></img>&nbsp; 1200m<sup>2</sup> Carpet Area </p>
          <p><img src={smokingImg}></img>&nbsp; Smoking Area</p>
          </div>
          <div className="propertydetailsIconscol col-lg-3">
          <p><img src={legalDocuments}></img>&nbsp; No Encumberence</p>
          <p><img src={ownershipImg}/>&nbsp; Ownership : <span style={{fontWeight:400}}>Ready to move</span></p>
          <p><img src={balconyImg}></img>&nbsp; 2 Balcony</p>
          <p><img src={ownershipImg}></img>&nbsp; Maintainance Responsibility : <span style={{fontWeight:400}}>Tenant</span> </p>
          </div>
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
          <p>1800 m<sup>2</sup></p>
          <p>Ready to moveIn</p>
          <p>$ 7,64,345</p>
          </div>
          </div>
          <div className="agentDetails">
          <h4 className='agentDetails col_black'>Agent Detail</h4>
          {/* <div className="namecard">
            <img src={agentAvatar} alt="" />
            <div className="agentspecs">
            <p className='col_black'>priyanka Arul Mohan</p>
            <p style={{marginTop: '0px'}}>Supervisor</p>
            </div>
          </div> */}
           <NameCard name="priyanka Arul Mohan"  designation="Supervisor" avatar={agentAvatar}   />
          <button className='btn contactAgentBtn bg_0B132A color_white' style={{margin:'20px 0px'}}>
            <FaPhoneAlt />&nbsp;&nbsp;&nbsp;Contact Agent & View Property Listings</button>
          </div>
        </div>
       </div>
       <div className="amenitiesWrapper">
        <h4 className='col_black' style={{marginBottom:'20px'}}>Amenities</h4>
        <div className="amenities row">
          <div className="col-lg-3">
           <p><img src={gymIcon} alt="gym" className='amenityIcons bg_0B132A'/>&nbsp;&nbsp;<span className='col_black'>Gym Facility</span></p>
           <p><img src={swimmingPoolIcon} alt="Swimming Pool" className='amenityIcons bg_0B132A'/>&nbsp;&nbsp;<span className='col_black'>Swimming Pool</span></p>
           <p><img src={wifiIcon} alt="Wifi Facility" className='amenityIcons bg_0B132A'/>&nbsp;&nbsp;<span className='col_black'>Wifi Facility</span></p>
           <p><img src={balconyIcon} alt="Balcony" className='amenityIcons bg_0B132A'/>&nbsp;&nbsp;<span className='col_black'>Balcony</span></p>
          </div>
          <div className="col-lg-3">
           <p><img src={elevatorImg} alt="Elevator" className='amenityIcons bg_0B132A'/>&nbsp;&nbsp;<span className='col_black'>Elevator</span></p>
           <p><img src={securityIcon} alt="Security" className='amenityIcons bg_0B132A'/>&nbsp;&nbsp;<span className='col_black'>Security</span></p>
           <p><img src={coolingIcon} alt="Heating" className='amenityIcons bg_0B132A'/>&nbsp;&nbsp;<span className='col_black'>Heating</span></p>
           <p><img src={gardenIcon} alt="Garden" className='amenityIcons bg_0B132A'/>&nbsp;&nbsp;<span className='col_black'>Garden</span></p>
          </div>
          <div className="col-lg-3">
           <p><img src={powerBackUpImg} alt="Power Backup" className='amenityIcons bg_0B132A'/>&nbsp;&nbsp;<span className='col_black'>Power Backup</span></p>
           <p><img src={carParkingIcon} alt="Parking" className='amenityIcons bg_0B132A'/>&nbsp;&nbsp;<span className='col_black'>Parking</span></p>
           <p><img src={coolingIcon} alt="Air Conditioning" className='amenityIcons bg_0B132A'/>&nbsp;&nbsp;<span className='col_black'>Air Conditioning</span></p>
           <p><img src={playGroundIcon} alt="Play Ground" className='amenityIcons bg_0B132A'/>&nbsp;&nbsp;<span className='col_black'>Play Ground</span></p>
          </div>
          <div className="col-lg-3">
           <p><img src={beachAreaImg} alt="Nature Park With Fountain" className='amenityIcons bg_0B132A'/>&nbsp;&nbsp;<span className='col_black'>Nature Park</span></p>
           <p><img src={taxiStandIcon} alt="TaxiStand" className='amenityIcons bg_0B132A'/>&nbsp;&nbsp;<span className='col_black'>Taxi Stand</span></p>
           <p><img src={hospitalImg} alt="Hospital" className='amenityIcons bg_0B132A'/>&nbsp;&nbsp;<span className='col_black'>Hospital</span></p>
           <p><img src={carParkingIcon} alt="Bus Stand" className='amenityIcons bg_0B132A'/>&nbsp;&nbsp;<span className='col_black'>Bus Stand</span></p>
          </div>

        </div>
       </div>
        <h4 className='col_black' style={{marginTop:'20px'}}><button className='featuredPropertiesHeading'>Featured Properties</button></h4>

        <PropertyCarousel properties={properties} isFindPropertyByCityRequired ={false}/>
        <Footer/>
      </div>
  );
}