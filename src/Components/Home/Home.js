import React from 'react';
import './Home.css'
import CustomNavbar from '../CustomNavbar/CustomNavbar';
import HomeContent from '../HomeContent/HomeContent';
const HomePage = () => {
 
  return (
    <div className="home">
      <div className='navbar' ><CustomNavbar/></div>
      <div className='gap_from_nav' style={{marginTop:'120px'}}></div>
       <div className='Home_content'>
       <HomeContent/>
       </div>
       
    </div>
  );
};

export default HomePage;