import { useContext } from 'react';
import NavBar from '../Components/NavBar'
import ViewEditDetails from '../Components/ViewEditDetails';
import UserContext from '../Components/UserContext'
function AdminShopDeatils() {
    const {user } = useContext(UserContext)
    return (
      <>
            <NavBar />
            <ViewEditDetails item={[user]} type="Shop" />
        </>
  );
}

export default AdminShopDeatils;