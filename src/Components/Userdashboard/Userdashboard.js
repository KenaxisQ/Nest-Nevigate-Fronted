import React, { useState, useEffect,useRef } from 'react';
import './Userdashboard.css';
import AdminDashboard from "../../Assets/AdminDashboard.svg";
import AdminDashboardActive from "../../Assets/AdminDashboardActive.svg";
import AdminProperties from "../../Assets/AdminProperties-icon.svg";
import AdminPropertiesActive from '../../Assets/AdminProperties-iconActive.svg'
import AdminSettings from "../../Assets/AdminSettings-icon.svg";
import AdminSettingsActive from "../../Assets/Admin_Settings_Active.svg";
import PlusframeActive from "../../Assets/Admin_Create_Project_inactive.svg";
import Plusframe from "../../Assets/Admin_Create_Project_Active.svg";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineCloseFullscreen } from "react-icons/md";
import MenuItem from '../../Components/MenuItem';
import NameCard from '../NameCard/NameCard';
import Avatar from '../../Assets/agentavtar.jpg'
import totalPropertiesForSaleIcon from '../../Assets/AdminTotalsale.svg';
import totalPropertiesForRentIcon from '../../Assets/AdminTotalRent-icon.svg';
import PropertyCard from '../PropertyCard/PropertyCard';
import { useAuth } from '../SignIn/AuthContext';
import { UserSettings } from '../UserSettings/UserSettings';
import { userjson } from './userjson';
import { DisplayChangePasswordFields } from '../AddPropertyForm/UserInfo/Changepassword/DisplayChangePasswordFields';
import { ChangePassword } from '../AddPropertyForm/UserInfo/Changepassword/ChangePassword';
import HttpService from '../../Services/http';
export default function Userdashboard({properties}) {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [isHamburgHovered, setIsHamburgHovered] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [listedProperties, setListedPropertied] = useState(properties);
  const [imageURL, setImageURL] = useState('');
  const {userData} = useAuth();
  console.log('userData', userData);
  useEffect(() => {
    if (userjson) {
      const blob = new Blob([userjson?.data], { type: 'image/jpg' }); // Change 'image/jpeg' based on your image type
      const url = `data:image/jpeg;base64,${userjson.data}`;
      setImageURL(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [userjson]);
  useEffect(() => {
    const fetchProperties = async () => {
      const https = new HttpService();
      try {
        const allProperties = await https.get('property');
        setListedPropertied(allProperties?.data); //set Listed properties here
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
  
    fetchProperties();
  
    // Cleanup function (if needed)
    return () => {
    };
  }, []);
  
  const handleSideNavToggle = () => {

    setIsSideNavOpen(!isSideNavOpen);
    setIsHamburgHovered(false);
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    console.log(menu);
  };

  return (
    <div className="AdminDashboardWrapper">
      <div className="AdminDashboard">
        <div className={`adminSidebar ${isSideNavOpen ? 'open' : ''}`}>
          <div className="adminmenuSidebar">
            <div
              className="menuItem minMaxBtn"
              onClick={handleSideNavToggle}
              onMouseEnter={() => setIsHamburgHovered(true)}
              onMouseLeave={() => setIsHamburgHovered(false)}
              style={{ border: '1px solid white', display: 'flex', justifyContent: 'space-evenly' }}
            >
              {isSideNavOpen ? (
                <MdOutlineCloseFullscreen color='white' size="25px" />
              ) : (
                <RxHamburgerMenu color={isHamburgHovered ? '#1F4B43' : 'white'} size="25px" />
              )}
            </div>

            <MenuItem
              icon={Plusframe}
              activeIcon={PlusframeActive}
              label="Create new project"
              onClick={() => handleMenuClick('create_project')}
              isActive={activeMenu === 'create_project'}
              isSideNavOpen={isSideNavOpen}
            />
            <MenuItem
              icon={AdminDashboard}
              activeIcon={AdminDashboardActive}
              label="Dashboard"
              onClick={() => handleMenuClick('dashboard')}
              isActive={activeMenu === 'dashboard'}
              isSideNavOpen={isSideNavOpen}
            />
            <MenuItem
              icon={AdminProperties}
              activeIcon={AdminPropertiesActive}
              label="Properties"
              onClick={() => handleMenuClick('properties')}
              isActive={activeMenu === 'properties'}
              isSideNavOpen={isSideNavOpen}
            />
            <MenuItem
              icon={AdminSettings}
              activeIcon={AdminSettingsActive}
              label="Settings"
              onClick={() => handleMenuClick('settings')}
              isActive={activeMenu === 'settings'}
              isSideNavOpen={isSideNavOpen}
            />
            <MenuItem
              icon={AdminSettings}
              activeIcon={AdminSettingsActive}
              label="Change Password"
              onClick={() => handleMenuClick('Change Password')}
              isActive={activeMenu === 'Change Password'}
              isSideNavOpen={isSideNavOpen}
            />
         </div>
        </div>

        <div className="col" style={{marginLeft:!isSideNavOpen?'70px':'250px', width: activeMenu =='users'?'90%':'auto'}}>
          <div className="adminDashboardHeader">
            <h4 className='adminHeading'>User Dashboard</h4>
            <NameCard name={userData?.name}  designation="Supervisor" avatar={Avatar} userOptions={true}  />

          </div>

         {activeMenu=='dashboard'&&( <div className="adminDashboardContent">
          <div className="headingAndFilter" style={{margin:'20px 10px'}}>
            <h4>Overview</h4>
            <select>
              <option>Last 30 Days</option>
              <option value="">Last Week</option>
              <option value="">Last 24h</option>
              <option>Today</option>
            </select>
            </div>
            <div className="row">
              <div className="col analyticsCardWrapper propforSaleAnalytics">
                <div className="analyticsCard">
              <img src={totalPropertiesForSaleIcon}/>
              <p className='analyticsRegarding'>Properties Listed <span className='sale'>Sale</span></p>
              <p className='analyticsValue'>2</p>
              </div>
              </div>

              <div className="col analyticsCardWrapper propforRentAnalytics">
                <div className="analyticsCard">
              <img src={totalPropertiesForRentIcon}/>
              <p className='analyticsRegarding'>Properties Listed <span className='sale'>Rent</span></p>
              <p className='analyticsValue'>3</p>
              </div>
              </div>
            </div>

            <div className="recentListingSection">
            <div className="headingAndFilter">
            <h4>Recent Listing</h4>
            <select>
              <option>Last 30 Days</option>
              <option value="">Last Week</option>
              <option value="">Last 24h</option>
              <option>Today</option>
            </select>
            </div>
          <div className="row recentPropertiesAdminView" style={{textAlign:'center'}}>
          {properties.slice(0, 3).map((property) => (
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
            </div>
          </div>)}
          {/* {imageURL ? <img src={imageURL} alt="Converted" /> : <p>Loading image...</p>} */}

          {activeMenu=='properties'&&(
            <div className="adminPropertiesViewWrapper">
                <div className="adminPropertiesView">
                    <input type="search" className='adminPropertySearch' placeholder='Search For Property..'/>
                    <div className="headingAndFilter">
                     <h4>Properties Listing</h4>
                      <select>
                      <option>Last 30 Days</option>
                      <option value="">Last Week</option>
                      <option value="">Last 24h</option>
                        <option>Today</option>
            </select>
            </div>
                  <div className="row AdminPropertyListing">
                  {listedProperties?.slice(0,1).map((property) => (
          <div className={`cardWrapper${isSideNavOpen?' col-lg-4':' col-lg-3'}`} key={property.id}>
            <PropertyCard
              type={property.propertyListingFor}
              title={property.title}
              location={property.location}
              price={property.price}
              beds={property.beds}
              washrooms={property.washrooms}
              area={property.area}
              height={'350px'}
              isEdit={true}
              props={property}
            />
          </div>
        ))}
                  </div>
                  </div>
            </div>
          )}
          {activeMenu=='settings'&&(
            <div className='userProfileSettingsWrapper'>
              <UserSettings />
            </div>
          )}
          {activeMenu=='Change Password'&&(
            <div className='userProfileSettingsWrapper'>
             <DisplayChangePasswordFields />
            </div>
          )}
        </div>
      </div>

    </div>
  );
};
