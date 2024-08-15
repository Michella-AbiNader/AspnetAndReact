/* eslint-disable no-inner-declarations */
import { Link, useLocation } from 'react-router-dom' 
import { useEffect, useRef, useState } from 'react';
import { getNavbarData } from '../Services/NavbarServices'
import '../Styles/Navbar.css'

function NavBar() {
    const [navbarItems, setNavbarItems] = useState([]);
    const location = useLocation();
    const stopRender = useRef(false);

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
  return (
      <div className="Navbar-Container">
          <ul>
              {navbarItems.map((item, index) => (
                  <li key={index}>
                      {location.pathname.startsWith("/system-admin") ?
                          item.type === "link" && (
                              <Link to={item.url}
                                  className={location.pathname === item.url ? "active" : ""}
                              >
                                  <strong>{item.text}</strong>
                              </Link>
                      ): ""
                  }</li>
              )) }

          </ul>
      </div>
  );
}

export default NavBar;