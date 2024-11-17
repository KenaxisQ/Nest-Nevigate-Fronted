import React from 'react'
import logo from '../../Assets/logo-whitepng.png'
import './Footer.css'
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
import { IoIosArrowRoundForward } from "react-icons/io";
export default function Footer() {
  return (
    <div className='container-fluid' id ="footer" style={{padding:'0px',color:'white'}}>
      <div className='footerWrapper'>
        <div className='logoSection'>
            <img src={logo} alt='Nest Navigate'/>
            <div className='followus'>
                <div className='followUSText'><p>Follow Us</p></div>
                <div className='followUsIcons'>
                <div className='socialMediaIcon'>
                <FaFacebookF size={'25px'}/>
                </div>
                <div className='socialMediaIcon'>
                <FaTwitter size={'25px'}/>
                </div>
                <div className='socialMediaIcon'>
                <FaInstagram size={'25px'}/>
                </div>
                <div className='socialMediaIcon'>
                <FaLinkedinIn size={'25px'}/>
                </div>
                </div>
            </div>
        </div>
       <div className='footerElements'>
       <div className='footerEmailAndSubscribeWrapper'>
            <p>Subscribe</p>
            <div className='footerEmailWrapper'>
            <input type='email' placeholder='Your e-mail'/>
            <button className='btn sendBtn'>Send <IoIosArrowRoundForward/></button>
            </div>
            </div>
        <div className='discover'>
        <p class='footerSubHeading'>Discover</p>
        <p>Location 1</p>
        <p>Location 2</p>
        <p>Location 3</p>
        <p>Location 4</p>
        <p>Location 5</p>
        <p>Location 6</p>
        </div>

        <div className='quicklinks'>
        <p class='footerSubHeading'>Quick Links</p>
        <p>About</p>
        <p>Contact</p>
        <p>FAQ's</p>
        <p>Blog</p>
        <p>Pricing Plans</p>
        <p>Privacy Policy</p>
        <p>Terms & Conditions</p>
        </div>
        <div className='ContactUs'>
        <p class='footerSubHeading'>Contact Us</p>
        <p>abc@gmail.com</p>
        <p>983211297</p>
        </div>
        <div className='ourAddress'>
        <p class='footerSubHeading'>Our Address</p>
        <p>Srikakulam <br/>Andhrapradesh, India</p>
        </div>
        </div>
        <div className='copyRight'>
            <p>Copyright &copy; 2028. KenaxisQ</p>
        </div>
      </div>
      <div className='footerWrapperForMobile'>
        <div className='logoSection'>
           <div className ='footerLogo'> <img src={logo} alt='Nest Navigate'/></div>
            <div className='footerEmailAndSubscribeWrapper'>
            <p>Subscribe</p>
            <div className='footerEmailWrapper'>
            <input type='email' placeholder='Your e-mail'/>
            <button className='btn sendBtn'>Send <IoIosArrowRoundForward/></button>
            </div>
            </div>
        </div>
       <div className='footerElements'>

        <div className='discover'>
        <p class='footerSubHeading'>Discover</p>
        <p>Location 1</p>
        <p>Location 2</p>
        <p>Location 3</p>
        <p>Location 4</p>
        <p>Location 5</p>
        <p>Location 6</p>
        </div>

        <div className='quicklinks'>
        <p class='footerSubHeading'>Quick Links</p>
        <p>About</p>
        <p>Contact</p>
        <p>FAQ's</p>
        <p>Blog</p>
        <p>Pricing Plans</p>
        <p>Privacy Policy</p>
        <p>Terms &<br/> Conditions</p>
        </div>
       <div>
       <div className='ContactUs'>
        <p class='footerSubHeading'>Contact Us</p>
        <p>abc@gmail.com</p>
        <p>983211297</p>
        </div>
        <div className='ourAddress'>
        <p class='footerSubHeading'>Our Address</p>
        <p>Srikakulam <br/>Andhrapradesh,<br/> India</p>
        </div>
       </div>
        <div className='followus'>
                {/* <div className='followUSText'><p>Follow Us</p></div> */}
                <div className='followUsIcons'>
                <div className='socialMediaIcon'>
                <FaFacebookF size={'25px'}/>
                </div>
                <div className='socialMediaIcon'>
                <FaTwitter size={'25px'}/>
                </div>
                <div className='socialMediaIcon'>
                <FaInstagram size={'25px'}/>
                </div>
                <div className='socialMediaIcon'>
                <FaLinkedinIn size={'25px'}/>
                </div>
                </div>
            </div>
        </div>
        <div className='copyRight'>
            <p style={{marginBottom:'0rem'}}>Copyright &copy; 2028. KenaxisQ</p>
        </div>
      </div>
    </div>
  )
}
