import { useState, useEffect } from 'react';
//import axios from "axios";

const RankItems = () => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch(`/User`)
            .then((result) => {
                if (result.ok) {
                    return result.json();
            }
        })
        .then(data => {
            setItems(data);
        })
}, [items])


    return (
        <div>Loading...
            {
                (items.length > 0) ? items.map((item) => <li key={item.Id}>{item.username}, {item.first_name}, {item.password}</li>) : <div>Loading...</div>
            }
        </div>
    )
}

export default RankItems;


//axios.get(`Item/${dataType}`)
  //  .then(function (response) {
        //setItems(response.data)
      //  console.log(response.data)
    //})
// }, [])

//fetch('api/endpoint', {
    //method: 'POST',
    //headers: {
      //  'Content-Type': 'application/json'
    //},
  //  body: JSON.stringify({ key: 'value' })
//});
