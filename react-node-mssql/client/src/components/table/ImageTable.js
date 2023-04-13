import React, { useEffect, useState } from "react";

const ImageTable = ({record}) => {

   const [imageClicked, setImageClicked] = useState("");

  

    useEffect(()=>{const onClickImageHandler = () => {setImageClicked(`http://img.vanessahair.com/sales/${record}.jpg`);
  };onClickImageHandler()},[])
    
  return (
   // eslint-disable-next-line jsx-a11y/alt-text
<></>
      
  )
}

export default ImageTable