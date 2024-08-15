import '../Styles/SystemAdminDashboard.css'
import NavBar from '../Components/NavBar';
import ListTable from '../Components/ListTable';
import { useEffect, useState } from 'react';
import { getShops } from '../Services/ShopServices';
function SystemAdminDashboard() {
    const [shops, setShops] = useState();
    useEffect(() => {
        const fetchShops = async() => {
            try {
               const res = await(getShops())
                setShops(res)

            } catch(error) {
                console.log(error)
            }
        }
        fetchShops();
        
    })
  return (
      <div className="SAcontainer">
          <NavBar></NavBar>
        <ListTable list={shops} type="Shops"/>
      </div>
  );
}

export default SystemAdminDashboard;