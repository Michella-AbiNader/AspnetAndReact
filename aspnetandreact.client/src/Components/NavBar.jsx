import { Link } from 'react-router-dom' 

function NavBar() {
  return (
      <div>
          <ul>
              <li>
                  <Link to="/">rankItems</Link>
              </li>
              <li>
              <Link to="/login">Login Page</Link>
              </li>
          </ul>
      </div>
  );
}

export default NavBar;