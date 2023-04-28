import React, { useState, useEffect } from 'react';

const Tttest = (mainData) => {
  const [colorTotal22, setColorTotal2] = useState([]);

  useEffect(() => {
    const a = mainData;
    setColorTotal2(a);
  }, [mainData]);

  return { colorTotal22 };
};

export default Tttest;
