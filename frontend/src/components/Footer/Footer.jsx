import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className="footer" id='footer'>
    <div className='footer-content' id='footer-content'>
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab laudantium dicta nesciunt vel, porro esse, aliquid assumenda doloribus ea reiciendis sunt explicabo, suscipit consectetur pariatur.</p>
            <div className="social-media">
            <img src={assets.facebook_icon} alt="" /><img src={assets.twitter_icon} alt="" /><img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
                
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>Get in touch</h2>
            <ul>
            <li>+1-212-321-4321</li>
            <li>contact@tomato.com</li>
            </ul>
        </div>
    </div>
     <hr />
        <p className="footer-copyright"> Copyright 2024  Tomato.com - All right reserved.</p>
    </div>
  )
}

export default Footer