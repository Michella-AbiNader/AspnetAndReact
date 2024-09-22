import UserContext from "../Components/UserContext";
import { useContext } from 'react';
import NavBar from "../Components/NavBar";
function UserApp() {
    const { user } = useContext(UserContext)
    console.log(user);
    return (
    <NavBar/>
  );
}

export default UserApp;