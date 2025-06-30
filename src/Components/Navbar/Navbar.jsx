import React, { useState,useContext } from 'react';
import "./Navbar.css";
import logo from '../Assets/logo.png';
import cart from '../Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import { FiAlignLeft } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";

export default function Navbar() {
    
    const [menu,setMenu] = useState("shop");
    const {getTotalCartItems} = useContext(ShopContext)

    const [mobileMenu,setMobileMenu] = useState(false) 
    const toggleMenu=()=>{
      setMobileMenu(!mobileMenu)
    }


  return (
    <div className='navbar'>
        <div className='nav-logo'>
            <img src={logo} alt="Error" />
            <p>SHOPPER</p>
        </div>

        <div className={mobileMenu ? 'nav-menubar' : 'nav-menubar hide'}>

            <ul className = 'nav-menu'>
                <li onClick={()=>{setMenu("shop")}}> <Link to='/' style={{textDecoration:'none',color:'#626262'}}>Shop</Link> {menu ==="shop" ? <hr/> :<></>}</li>
                <li onClick={()=>{setMenu("mens")}}> <Link to="/mens" style={{textDecoration:'none',color:'#626262'}}>Men </Link>    {menu ==="mens" ? <hr/> :<></>}</li>
                <li onClick={()=>{setMenu("womens")}}> <Link to="/womens" style={{textDecoration:'none',color:'#626262'}}>Women</Link>    {menu ==="womens" ? <hr/> :<></>}</li>
                <li onClick={()=>{setMenu("kids")}}> <Link to="/kids" style={{textDecoration:'none',color:'#626262'}}>Kids</Link>   {menu ==="kids" ? <hr/> :<></>}</li>
            </ul>
            <div className='nav-login-cart'>
                <Link to="/login"><button>Login</button></Link>
                <Link to="/cart"><img src={cart} alt="Error" /></Link>
                <div className='nav-cart-count'>{getTotalCartItems()}</div>
            </div>

        </div>
        {mobileMenu ? <IoMdClose className="nav-icon" size="30px" onClick={toggleMenu} />  :  <FiAlignLeft className="nav-icon" size="30px" onClick={toggleMenu} />}
        


    </div>
  )
}
