import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export const Hello = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    itemData();
  }, []);

  const itemData = async () => {
    return await axios
      .get('http://localhost:8080/api/events')
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  };

  return <div>
    {data
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
        </div>;
};
