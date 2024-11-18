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
import Plusframe from "../../Assets/Admin_Create_Project_inactive.svg";
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineCloseFullscreen } from "react-icons/md";
import MenuItem from '../../Components/MenuItem';

export const AdminDashboardHome = () => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  const [isHamburgHovered, setIsHamburgHovered] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const handleSideNavToggle = () => {
    setIsSideNavOpen(!isSideNavOpen);
    setIsHamburgHovered(false);
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
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

            <div className={`menuItem ${isSideNavOpen ? 'createprojectbtn' : ''}`} style={{ margin: '10px 6px' }}>
              <img src={Plusframe} alt="Create new project" />
              {isSideNavOpen && <span>Create new project</span>}
            </div>
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
              icon={AdminSettings}
              activeIcon={AdminSettingsActive}
              label="Settings"
              onClick={() => handleMenuClick('settings')}
              isActive={activeMenu === 'settings'}
              isSideNavOpen={isSideNavOpen}
            />
         </div>
        </div>

        <div className="col">

        </div>
      </div>
    </div>
  );
};
