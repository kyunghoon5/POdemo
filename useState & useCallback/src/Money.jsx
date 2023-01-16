import { FaDollarSign } from 'react-icons/fa';
import React, { memo } from 'react';

const Money = ({ name, payment }) => {
  return (
    <div style={{ border: '2px solid powderblue', padding: '10px' }}>
      <div className="flex font-bold py-2">
        <FaDollarSign size={30} />
        <h3 className="flex m-2">Check</h3>
      </div>
      <p>name: {name}</p>
      <p>payment: {payment}</p>
    </div>
  );
};

export default memo(Money);
