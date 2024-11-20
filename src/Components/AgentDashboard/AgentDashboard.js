import {React,useState} from 'react'
import './AgentDashboard.css'
import MenuItem from '../MenuItem'
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
import NameCard from '../NameCard/NameCard';
import Avatar from '../../Assets/agentavtar.jpg'
import totalUsersIcon from '../../Assets/AdminTotalusers-icon.svg';
import totalAgentsIcon from '../../Assets/AdminTotalAgents-icon.svg';
import totalPropertiesForSaleIcon from '../../Assets/AdminTotalsale.svg';
import totalPropertiesForRentIcon from '../../Assets/AdminTotalRent-icon.svg';
import { IoIosArrowRoundDown } from "react-icons/io";
import PropertyCard from '../PropertyCard/PropertyCard';
import AdminPropertyCard from '../PropertyCard/AdminPropertyCard';
export default function AgentDashboard({properties}) {
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);
    const [isHamburgHovered, setIsHamburgHovered] = useState(false);
    const [activeMenu, setActiveMenu] = useState('users');
    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
        console.log(menu);
  };
   const handleSideNavToggle = () => {
        setIsSideNavOpen(!isSideNavOpen);
         setIsHamburgHovered(false);
  };

  return (
    <div className="agentDashboardWrapper">
            <div className="agentDashboard">
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
              label="Leads"
              onClick={() => handleMenuClick('leads')}
              isActive={activeMenu === 'leads'}
              isSideNavOpen={isSideNavOpen}
            />
            <MenuItem
              icon={AdminUsers}
              activeIcon={AdminUsersActive}
              label="Tickets"
              onClick={() => handleMenuClick('tickets')}
              isActive={activeMenu === 'tickets'}
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
            <div className="agent-content"  style={{marginLeft:!isSideNavOpen?'70px':'250px', width: activeMenu =='users'?'auto':'auto'}}>
            <div className="adminDashboardHeader">
            <h4 className='adminHeading'>Agent Dashboard</h4>
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
              <div className="col-lg-3 analyticsCardWrapper">
                <div className="analyticsCard">
              <img src={totalUsersIcon}/>
              <p className='analyticsRegarding'> Total Leads</p>
              <p className='analyticsValue'>1234</p>
              <p className='analyticsDiscription'><IoIosArrowRoundDown style={{ transform: 'rotate(220deg)' }}size={'20px'} color='green'/>&nbsp;12% increase from last month</p>
              </div>
              </div>
              <div className="col-lg-3 analyticsCardWrapper propforSaleAnalytics">
                <div className="analyticsCard">
              <img src={totalPropertiesForSaleIcon}/>
              <p className='analyticsRegarding'> Total Properties -Sale</p>
              <p className='analyticsValue'>120</p>
              <p className='analyticsDiscription'><IoIosArrowRoundDown style={{ transform: 'rotate(220deg)' }} size={'20px'} color='green'/>&nbsp;12% increase from last month</p>
              </div>
              </div>

              <div className="col-lg-3 analyticsCardWrapper propforRentAnalytics">
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
          
            </div>
            </div>
    </div>
  )
}
