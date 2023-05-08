import React from 'react'

const MainImg = ({mainImg}) => {
  return (
    <td colSpan="3" rowSpan="10" className="prodImg ">
      <span className="">
        <img src={mainImg} className="object-contain  h-[338px] w-[243px]" />
      </span>
    </td>
  );
}

export default MainImg