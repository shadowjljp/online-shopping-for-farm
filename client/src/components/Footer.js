import React from 'react';
import { Link } from 'react-router-dom';

const Footer = (props) => {
  return (
    <div className="footer">
        <p><Link to="/" className="link">VegeFruit Farms</Link></p>
        <p><Link to="/products" className="link">Our Products</Link></p> 
        <p>Thanks for visiting our website!</p>
        <p>&copy; 2020</p>
      
    </div>
  );
}
export default Footer;