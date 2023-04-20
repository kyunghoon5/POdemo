import React from 'react'

const MainImg = ({mainImg}) => {
  return (
    <td colSpan="3" rowSpan="10" className="prodImg ">
      <span>
        {
          // eslint-disable-next-line jsx-a11y/alt-text
          <img
            style={{ width: '250px', height: '320px' }}
            src={mainImg}
            className="mainImage  "
          />
        }
      </span>
    </td>
  );
}

export default MainImg