/* eslint-disable no-inner-declarations */
import { Link, useLocation, useNavigate } from 'react-router-dom' 
import { useEffect, useRef, useState } from 'react';
import { getNavbarData } from '../Services/NavbarServices'
import '../Styles/Navbar.css'

function resetThemeToDefault() {
    document.documentElement.style.setProperty('--mauve-light', '#6A679E');  // Default light variant
    document.documentElement.style.setProperty('--mauve-bright', '#5D54A4');  // Default bright variant
    document.documentElement.style.setProperty('--button-color', '#573b8a');  // Default button color
    document.documentElement.style.setProperty('--button-hover', '#6d44b8');  // Default button hover
    document.documentElement.style.setProperty('--table-rows', '#d9d9f0');    // Default table row color
    document.documentElement.style.setProperty('--table-rows-hover', '#e8e8f8'); // Default table hover
    document.documentElement.style.setProperty('--navbar-hover-active', '#54418b'); // Default navbar hover
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