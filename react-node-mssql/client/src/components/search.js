import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Hello } from './hello';

export const Search = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    itemData();
  }, []);

  const itemData = async () => {
    return await axios
      .get('http://localhost:8080/api/events')
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  };

  console.log('data', data);

  return (
    <div className="search">
      <h1>Non-New item</h1>
      <input
        type="text"
        placeholder="Search item name here"
        onChange={(e) => setSearch(e.target.value)}
      />

      {data
        .filter((item) => {
          if (search === '') {
            return item;
          } else if (
            item.descrip.toLowerCase().includes(search.toLowerCase())
          ) {
            return item;
          }
        })
        .map((item) => {
          //const arr = data.reduce((a, v) => (a = a + v.totalprice), 0); totalprice 총합

          const a = item.percentile.toFixed(3) * 100;
          const b = 'A';
          if (a > 95) {
            return (
              <h4>
                {item.descrip}, 'A' Class, {item.totalprice}
              </h4>
            );
          } else if (a > 80) {
            return (
              <h4>
                {item.descrip}, 'B' Class, {item.totalprice}{' '}
              </h4>
            );
          } else if (a > 60) {
            return (
              <h4>
                {item.descrip}, 'C' Class, {item.totalprice}
              </h4>
            );
          } else
            return (
              <h4>
                {item.descrip}, 'D' Class, {item.totalprice}
              </h4>
            );
        })}
    </div>
  );
};
