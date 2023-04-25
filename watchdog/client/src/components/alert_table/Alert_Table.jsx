import React from 'react'
import Button from '@mui/material/Button';


const Alert_Table = () => {
  return (
    <div className="pl-3 pr-3 pt-3 pb-3 h-auto w-auto bg-neutral-400">
      <div className="pb-3">CONTROL PANEL</div>
      <div className="flex space-x-2 ">
        <Button variant="outlined" size="large">
          MANUAL
        </Button>
        <Button variant="outlined" size="large">
          PRINT
        </Button>
      </div>
      <div className="pt-2 pb-2">
        ITEM ALERT
      </div>
      <div className="flex flex-col  bg-gray-200 text-black w-[480px] border-none">DATA</div>
    </div>
  );
}

export default Alert_Table;