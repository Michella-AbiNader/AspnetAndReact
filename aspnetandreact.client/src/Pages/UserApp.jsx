import UserContext from "../Components/UserContext";
import { useContext } from 'react';

function UserApp() {
    const { user } = useContext(UserContext)
    console.log(user);
    return (
      <div>
      <p>{user.id}</p>
      <p>{user.token}</p>
      <p>{user.type}</p>
      <p>{user.username}</p>
        </div>

  );
}

export default UserApp;