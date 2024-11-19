import React, { useState } from 'react';
import "./AdminDashboardHome.css";
import AdminDashboard from "../../Assets/AdminDashboard.svg";
import AdminDashboardActive from "../../Assets/AdminDashboardActive.svg";
import AdminProperties from "../../Assets/AdminProperties-icon.svg";
import AdminPropertiesActive from '../../Assets/AdminProperties-iconActive.svg'
import AdminManageRequests from "../../Assets/AdminManageRequests_icon.svg"
import AdminManageRequestsActive from "../../Assets/AdminManageRequests_iconActive.svg"
import AdminUsers from "../../Assets/AdminUsers-icon.svg";
import AdminSettings from "../../Assets/AdminSettings-icon.svg";
import AdminUsersActive from "../../Assets/AdminUsers-iconActive.svg";
import AdminSettingsActive from "../../Assets/Admin_Settings_Active.svg";
import PlusframeActive from "../../Assets/Admin_Create_Project_inactive.svg";
import Plusframe from "../../Assets/Admin_Create_Project_Active.svg";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineCloseFullscreen } from "react-icons/md";
import MenuItem from '../../Components/MenuItem';
import NameCard from '../NameCard/NameCard';
import Avatar from '../../Assets/agentavtar.jpg'
import totalUsersIcon from '../../Assets/AdminTotalusers-icon.svg';
import totalAgentsIcon from '../../Assets/AdminTotalAgents-icon.svg';
import totalPropertiesForSaleIcon from '../../Assets/AdminTotalsale.svg';
import totalPropertiesForRentIcon from '../../Assets/AdminTotalRent-icon.svg';
import { IoIosArrowRoundDown } from "react-icons/io";
import PropertyCard from '../PropertyCard/PropertyCard';
import AdminPropertyCard from '../PropertyCard/AdminPropertyCard';
import DataTable from 'react-data-table-component';
import moment from 'moment';
import UserInfoEdit from '../Modals/UserInfo/UserInfoEdit';
export const AdminDashboardHome = ({properties}) => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [isHamburgHovered, setIsHamburgHovered] = useState(false);
  const [activeMenu, setActiveMenu] = useState('users');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const columns=[
    {
      name:'Name ',
      selector: row=>  `${row.firstname} ${row.lastname}`,
      sortable: true
    },
    {
      name:'Username',
      selector: row=> row.username
    },
    {
      name:'Email',
      selector: row=> row.email
    },
    {
      name:'Phone',
      selector: row=> row.phone
    },
    {
      name: 'Date Joined',
      selector: row=> moment(row.createdAt).format('MMM D, YYYY'),
      sortable: true
    },
    {
      name:'Properties Listed',
      selector: row=> row.properties_listed,
      sortable: true,
    },
    {
      name: 'Property Listing Limit',
      selector: row=> row.properties_listing_limit,
      sortable: true
    },
    {
      name: 'Roles',
      selector: row=> row.authorities.map(role => role.authority).join(', ')
    },
    {
      name:'Send Alert',
      cell: row => (
        <button
          onClick={() => handleSendAlert(row.id)}
          className="btn alertBtn"
        >
          Send Alert
        </button>
      ),

    },
    {
      name:'Reset Password',
      cell: row => (
        <button
          onClick={() => handleResetPassword(row.id)}
          className="btn passResetBtn"
        >
          Reset Password
        </button>
      ),
    },
    {
      name: 'Block',
      cell: row => (
        <button
          onClick={() => handleBlockUser(row.id)}
          className="btn userBlockBtn"
        >
          Block
        </button>
      ),
    }
  ]
  const userData =[
    {
      id: "087962a8-8b4f-402e-a3f7-80880c4efbdb",
      firstname: "asd",
      lastname: "wert",
      email: "ab49@gmail.com",
      phone: "9376563419",
      username: "s1dda_sai34",
      password: "$2a$10$xZ8cYGHYshNwWpvJ.1FVMOGw7VHNxYtdnGpOods22ANosoB7AhMB.",
      role: "USER",
      properties_listed: 3,
      properties_listing_limit: 0,
      createdAt: "2024-11-15T18:24:09.499133",
      active: true,
      enabled: true,
      authorities: [
          {
              "authority": "USER"
          }
      ],
    }
  ]
  const handleSendAlert = (userId) => {
    console.log("Send Alert clicked for user ID:", userId);

  };

  const handleResetPassword = (userId) => {
    console.log("Reset Password clicked for user ID:", userId);

  };

  const handleBlockUser = (userId) => {
    console.log("Block clicked for user ID:", userId);

  };
  const handleSideNavToggle = () => {

    setIsSideNavOpen(!isSideNavOpen);
    setIsHamburgHovered(false);
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    console.log(menu);
  };
  const handleRowClick=(row)=>{
    setSelectedUser(row);
    setIsModalOpen(true);
    console.log(isModalOpen)
      // console.log(row )
  }
  const [showModal, setShowModal] = useState(false);

  const handlePrimaryClick = () => {
    console.log('Primary button clicked');
    setShowModal(false);  // Hide the modal on primary button click
  };

  const handleSecondaryClick = () => {
    console.log('Secondary button clicked');
    setShowModal(false);  // Hide the modal on secondary button click
  };
  const handleUpdate = (updatedData) => {
    // Handle the updated user data (e.g., send a request to update the backend)
    console.log("Updated user data:", updatedData);
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
              icon={AdminManageRequests}
              activeIcon={AdminManageRequestsActive}
              label="Manage Requests"
              onClick={() => handleMenuClick('manageRequests')}
              isActive={activeMenu === 'manageRequests'}
              isSideNavOpen={isSideNavOpen}
            />
            <MenuItem
              icon={AdminUsers}
              activeIcon={AdminUsersActive}
              label="Users"
              onClick={() => handleMenuClick('users')}
              isActive={activeMenu === 'users'}
              isSideNavOpen={isSideNavOpen}
            />
            <MenuItem
              icon={AdminUsers}
              activeIcon={AdminUsersActive}
              label="Agents"
              onClick={() => handleMenuClick('agents')}
              isActive={activeMenu === 'agents'}
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
         </div>
        </div>

        <div className="col" style={{marginLeft:!isSideNavOpen?'70px':'250px', width: activeMenu =='users'?'90%':'auto'}}>
          <div className="adminDashboardHeader">
            <h4 className='adminHeading'>Admin Dashboard</h4>
            <NameCard name="priyanka Arul Mohan"  designation="Supervisor" avatar={Avatar}   />
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
              <div className="col analyticsCardWrapper">
                <div className="analyticsCard">
              <img src={totalUsersIcon}/>
              <p className='analyticsRegarding'> Total Users</p>
              <p className='analyticsValue'>1234</p>
              <p className='analyticsDiscription'><IoIosArrowRoundDown style={{ transform: 'rotate(220deg)' }}size={'20px'} color='green'/>&nbsp;12% increase from last month</p>
              </div>
              </div>
              <div className="col analyticsCardWrapper">
                <div className="analyticsCard">
              <img src={totalAgentsIcon}/>
              <p className='analyticsRegarding'> Total Agents</p>
              <p className='analyticsValue'>1024</p>
              <p className='analyticsDiscription'><IoIosArrowRoundDown style={{ transform: 'rotate(30deg)' }} size={'20px'} color='red'/>&nbsp;10% decrease from last month</p>
              </div>
              </div>

              <div className="col analyticsCardWrapper propforSaleAnalytics">
                <div className="analyticsCard">
              <img src={totalPropertiesForSaleIcon}/>
              <p className='analyticsRegarding'> Total Properties -Sale</p>
              <p className='analyticsValue'>120</p>
              <p className='analyticsDiscription'><IoIosArrowRoundDown style={{ transform: 'rotate(220deg)' }} size={'20px'} color='green'/>&nbsp;12% increase from last month</p>
              </div>
              </div>

              <div className="col analyticsCardWrapper propforRentAnalytics">
                <div className="analyticsCard">
              <img src={totalPropertiesForRentIcon}/>
              <p className='analyticsRegarding'>Total Properties -Rent</p>
              <p className='analyticsValue'>1350</p>
              <p className='analyticsDiscription'><IoIosArrowRoundDown style={{ transform: 'rotate(30deg)' }} size={'20px'} color='red'/>&nbsp;10% decrease from last month</p>
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
                  {properties.slice(0,10).map((property) => (
          <div className={`cardWrapper${isSideNavOpen?' col-lg-4':' col-lg-3'}`} key={property.id}>
            <PropertyCard
              type={property.type}
              title={property.title}
              location={property.location}
              price={property.price}
              beds={property.beds}
              washrooms={property.washrooms}
              area={property.area}
              height={'350px'}
            />
          </div>
        ))}
                  </div>
                  </div>
            </div>
          )}
          {activeMenu=='manageRequests'&&(
            <div className="adminPropertiesViewWrapper">
                <div className="adminPropertiesView">
                    <input type="search" className='adminPropertySearch' placeholder='Search For Property..'/>
                    <div className="headingAndFilter">
                     <h4>Properties Listing Requests</h4>
                      <select>
                      <option>Last 30 Days</option>
                      <option value="">Last Week</option>
                      <option value="">Last 24h</option>
                        <option>Today</option>
            </select>
            </div>
                  <div className="row AdminPropertyListing">
                  {properties.slice(0,10).map((property) => (
          <div className={`cardWrapper${isSideNavOpen?' col-lg-4':' col-lg-3'}`} key={property.id}>
            <AdminPropertyCard
              type={property.type}
              title={property.title}
              location={property.location}
              price={property.price}
              beds={property.beds}
              washrooms={property.washrooms}
              area={property.area}
              height={'350px'}
            />
          </div>
        ))}
                  </div>
                  </div>
            </div>
          )}
          {(activeMenu=='users'|| activeMenu=='agents')&&(
            <div className="adminPropertiesViewWrapper">
                <div className="adminPropertiesView">
                    <input type="search" className='adminPropertySearch' placeholder='Search For Property..'/>
                    <div className="headingAndFilter">
                     <h4>{activeMenu=='users'?'Users':'Agents'}</h4>
                      <select>
                      <option>Last 30 Days</option>
                      <option value="">Last Week</option>
                      <option value="">Last 24h</option>
                        <option>Today</option>
            </select>
                    </div>
                    <div className="datatableWrapper">
                    <DataTable
                    columns={columns}
                    data={userData}
                    selectableRows
                    fixedHeader
                    onRowClicked={handleRowClick}
                    highlightOnHover/>
                    </div>
          </div>

            </div>
          )}
        </div>
      </div>
      <UserInfoEdit
        showModal={isModalOpen}
        setShowModal={setIsModalOpen}
        userData={selectedUser}
        handleSave={handleUpdate}
      />
    </div>
  );
};
