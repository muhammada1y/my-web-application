import React, { useEffect, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import logo from '../imag/klogo.png';
const Nav = () => {
  
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
  function logout(){
    localStorage.clear();
  }
  useEffect(() => {
 
    // Check your authentication status, e.g., by accessing localStorage
    const isAuthenticated = localStorage.getItem("user") !== null;
    setAuth(isAuthenticated);
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <div className="Nav">
      <div className="Nav nav-right">
    <img
  className="nav-logo" 
  src={logo} alt="logo" 
/>
</div>
<div className="Nav nav-left">
      { auth ?<ul className="Nav">
    
        <li>
          <Link to="/">HOME</Link>
        </li>
        <li>
          <Link to="/video">video</Link>
        </li>
        <li>
          <Link to="/audio">audio</Link>
        </li>
        <li>
          <Link to="/image">Image</Link>
        </li>
        <li>
          <Link to="/note">note</Link>
        </li>
        <li><Link onClick={logout} to="/signup">logout</Link></li>
   
      </ul>
      :
      <ul className="Nav nav-right">
         <li><Link to="/about">About</Link></li>
         <li> <Link  to="/login">Login</Link></li>
         <li><Link  to="/signup">Signup</Link></li> 
      </ul>
}
</div>
    </div>
  );
};

export default Nav;
