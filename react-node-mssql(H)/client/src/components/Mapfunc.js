import axios from 'axios';
import React, { useState, useEffect, useMemo } from 'react';


  export const Mapfunc = () => {
    
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');


    const itemData = async () => {
    return await axios
      .get('http://localhost:8080/api/events')
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  };  


 const productData = useMemo(() => {
   return data.filter((item) => {
     return item.descrip.toLowerCase().includes(search.toLowerCase());
   });
 }, [data, search]);
 
  useEffect(() => {
    itemData();
  }, []);

    return (
      <>
        {
          productData.map((item, i) => {
            return <div>{item.cost}</div>;
          })[0]
        }
      </>
    );
  }

