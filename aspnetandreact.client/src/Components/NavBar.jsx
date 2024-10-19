/* eslint-disable no-inner-declarations */
import { Link, useLocation, useNavigate } from 'react-router-dom' 
import { useEffect, useRef, useState } from 'react';
import { getNavbarData } from '../Services/NavbarServices'
import '../Styles/Navbar.css'

function resetThemeToDefault() {
    document.documentElement.style.setProperty('--mauve-light', '#6A679E');  
    document.documentElement.style.setProperty('--mauve-bright', '#573b8a');  
    document.documentElement.style.setProperty('--button-color', '#573b8a');  
    document.documentElement.style.setProperty('--button-onHover', '#6d44b8');
    document.documentElement.style.setProperty('--table-rows', '#c5c4d9');    
    document.documentElement.style.setProperty('--table-rows-hover', '#9D9BC4'); 
    document.documentElement.style.setProperty('--navbar-hover-active', '#6d68cf'); 
}

function NavBar() {
    const [navbarItems, setNavbarItems] = useState([]);
    const location = useLocation();
    const stopRender = useRef(false);
    const navigate = useNavigate();

    useEffect(() => {
        stopRender.current = true;
        if (stopRender.current === true) {
            async function fetchNavbarData() {
                await getNavbarData(location, setNavbarItems);
            }
            fetchNavbarData();
            stopRender.current = false;
        }
    }, [location]);
    const handleLogout = () => {
        // Clear the theme color from local storage
        localStorage.removeItem('theme_color');
        localStorage.removeItem('user')
        resetThemeToDefault();

        navigate('/');
    };
  return (
      <div className="Navbar-Container">
          <ul>
              {navbarItems.map((item, index) => (
                  <li key={index}>
                      {location.pathname.startsWith("/system-admin") ?
                          item.type === "link" && (
                              item.text === "Logout" ? (
                                  // Add the handleLogout for the Logout link
                                  <Link to={item.url} onClick={handleLogout}
                                      className={location.pathname === item.url ? "active" : ""}
                                         >
                                      <strong>{item.text}</strong>
                                  </Link>
                              ) : (
                              <Link to={item.url}
                                          className={location.pathname === item.url ? "active" : ""}
                              >
                                  <strong>{item.text}</strong>
                              </Link>
                      )): ""
                      }
                      {location.pathname.startsWith("/admin") ?
                          item.type === "link" && (
                              item.text === "Logout" ? (
                                  // Add the handleLogout for the Logout link
                                  <Link to={item.url} onClick={handleLogout}
                                      className={location.pathname === item.url ? "active" : ""}
                                  >
                                      <strong>{item.text}</strong>
                                  </Link>
                              ) : (
                              <Link to={item.url}
                                  className={location.pathname === item.url ? "active" : ""}
                              >
                                  <strong>{item.text}</strong>
                              </Link>
                          )) : ""}
                      {location.pathname.startsWith("/app") ?
                          item.type === "link" && (
                              item.text === "Logout" ? (
                                  // Add the handleLogout for the Logout link
                                  <Link to={item.url} onClick={handleLogout}
                                      className={location.pathname === item.url ? "active" : ""}
                                  >
                                      <strong>{item.text}</strong>
                                  </Link>
                              ) : (
                              <Link to={item.url}
                                  className={location.pathname === item.url ? "active" : ""}
                              >
                                  <strong>{item.text}</strong>
                              </Link>
                          )) : ""}
                  </li>
              )) }
          </ul>
      </div>
  );
}

export default NavBar;