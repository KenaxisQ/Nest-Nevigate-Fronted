import React, { useState } from 'react';
import { Phone, User,UserRound } from 'lucide-react';
import { Link, useNavigate, useLocation} from 'react-router-dom';
import './CustomNavbar.css';
import { CiViewList } from "react-icons/ci";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { useAuth } from '../SignIn/AuthContext';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const[userNavigation,setUserNavigation]=useState(false);
  const { setIsAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const logoutUser = () =>{
    setIsAuthenticated(false); // Set authentication to false when logout
    localStorage.clear();
    sessionStorage.clear();
    logout();
    navigate('/')
  }
  return (

    <nav className="navbar navbar-expand-lg fixed-top" style={{borderBottom: '1px solid #97AABE'}}>
      <div className="container-fluid  d-flex">
        <div className='nav_wrapper'>
        <div className="d-none d-lg-flex nav_left">
          <ul className="navbar-nav me-auto">
          <li className="nav-item">
              <Link className={`nav-link ${location.pathname=='/home'||location.pathname=='/'?'active':''}`} as={Link} to="/home" >Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname=='/listings'?'active':''}`} as={Link} to="/listings">Listing</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname=='/userdashboard'?'active':''}`} as={Link} to="/userdashboard">Dashboard</Link>
            </li>
            {/* <li className="nav-item">
            <a className='nav-link' href='#footer'>Contact</a>
            </li> */}
          </ul>
        </div>

        <Link className="navbar-brand mx-auto" as={Link} to="/home">
          <div className="align-items-center">
            {/* <img
              src="/api/placeholder/40/40"
              alt="Next Navigate Logo"
              className="me-2"
              style={{ width: '40px', height: '40px' }}
            /> */}
            <span>Nest Navigate</span>
          </div>
        </Link>

        <div className="d-none d-lg-flex align-items-center nav_right_section">
          <a href="tel:+1234567890" className="text-decoration-none me-4">
            <div className="d-flex align-items-center text-dark">
              <Phone size={20} className="me-2" />
              <span>+68 685 88666</span>
            </div>
          </a>
          <button className="btn text-dark me-3 user_icon dropdown-toggle-split"
          data-bs-toggle="dropdown" aria-expanded="false"
          style={{position:'relative'}}
          onClick={()=>{setUserNavigation(!userNavigation)}}>
            <UserRound size={20} />
          </button>
    <ul class="dropdown-menu userNavigation">
    <li className='userEditWrap'>
      <div className="userIconWrapper"> <CiUser size={'30px'} style={{position:'relative'}}/></div>
     </li>
    <div className="userEditBtn">
    <MdOutlineModeEditOutline style={{ margin: "0px 0px 13px 2px"}} />
    </div>
    <span className='user-name'>Priyanka Arul Mohan</span>
    <p className='redirect-to-listed' onClick={()=>navigate('/userdashboard')}>View Listed Properties</p>
    <li> <button className='btn btn-danger m-2' style={{borderRadius:'30px'}} onClick={logoutUser}>Logout</button></li>
    </ul>
          <button className="btn rounded-pill px-4 add_property_btn" onClick={() => {navigate('/add-property', {state: { customData: 'additional data' },search : '?name=JohnDoe&age=30'});}}>
            Add Property<span></span>
          </button>
        </div>
        </div>

        <button
          className={`hamburger-button d-lg-none ${isOpen ? 'active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
          <ul className="navbar-nav d-lg-none mt-3">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname=='/home'?'active':''}`} as={Link} to="/home" >Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname=='/listings'?'active':''}`} as={Link} to="/listings">Listing</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname=='/userdashboard'?'active':''}`} as={Link} to="/userdashboard">Dashboard</Link>
            </li>
            {/* <li className="nav-item">
              <a className="nav-link" href="tel:+1234567890">
                <Phone size={20} className="me-2" />
                +123 456 7890
              </a>
            </li> */}
            {/* <li className="nav-item">
              <a className="nav-link" href="#">
                <UserRound size={20} className="me-2" />
                Account
              </a>
            </li> */}
            <li className="nav-item mt-2">
              <button className="btn rounded-pill px-4 w-100 add_property_btn">
                Add Property
              </button>
            </li>
            <li className="nav-item mt-2">
              <button className="btn  rounded-pill px-4 w-100 add_property_btn btn-danger" >
                Logout
              </button>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
