import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';


const Alert_Table = ({ itemAlertOld }) => {
  const [showData, setShowData] = useState(false);
   const [showOldItem, setOldItem] = useState(false);
   const [showNewItem, setNewItem] = useState(false)

    // useEffect(() => {
    //   const data = itemAlertOld.map((item, index) => ({
    //     id: index,
    //     vendno: item.vendno,
    //     descrip: item.descrip,
    //     itemkey2: item.itemkey2,
    //     needed: item.needed,
    //   }));
    //   setData(data);
    // }, [itemAlertOld]);

  const handleDataButtonClick = () => {
    setShowData(true);
    setOldItem(false);
    setNewItem(false)
  };
  const handleOldItemButtonClick = () => {
    setOldItem(true);
    setShowData(false);
    setNewItem(false);
  };
  const handleNewItemButtonClick = () => {
    setNewItem(true);
    setOldItem(false);
    setShowData(false);
  };

  const columns = [
    { field: 'vendno', headerName: 'Vendno', width: 100 },
    { field: 'descrip', headerName: 'Descrip', width: 130 }, 
    {
      field: 'needed',
      headerName: 'Needed',
      type: 'number',
      width: 90,
    },
   
  ];


    const data = itemAlertOld.map(
      (item,index) => (
        {
          id: index,
          vendno: item.vendno,
          descrip: item.descrip,
          itemkey2: item.itemkey2,
          needed:item.needed  
         
        }
        
      )
    );

      let content;
      switch (true) {
        case showOldItem:
          content = (
            <>
              <div className="pt-2 pb-2">OLD ITEM</div>
              <div
                className="flex-col flex bg-gray-200 text-black
            h-[700px] w-[480px] border-none overflow-y-scroll"
              >
                4123
              </div>
            </>
          );
          break;
        case showData:
          content = (
            <>
              <div className="pt-2 pb-2">ITEM ALERT</div>
              <div
                className="flex-col flex bg-gray-200 text-black
            h-[670px] w-[480px] border-none overflow-y-scroll"
              >
                <DataGrid
                  rows={data}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 10 },
                    },
                  }}
                  pageSizeOptions={[5, 10]}
                />
              </div>
            </>
          );
          break;
          case showNewItem :
            content = (
            <>
              <div className="pt-2 pb-2">New ITEM</div>
              <div
                className="flex-col flex bg-gray-200 text-black
            h-[700px] w-[480px] border-none overflow-y-scroll"
              >
                123
              </div>
            </>
          );
          break;

        default:
           content = (
      <>
        <div className="pt-2 pb-2">ITEM ALERT</div>
        <div
          className="flex-col flex bg-gray-200 text-black
          h-[670px] w-[480px] border-none overflow-y-scroll"
        >
          <DataGrid
            rows={data}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10]}
          />
        </div>
      </>
    );
    break;


      }

    
       
    


  return (
    <div className="pl-3 pr-3 pt-3 pb-3 h-auto w-[520px] bg-neutral-400">
      <div className="pb-3">CONTROL PANEL</div>
      <div className="flex space-x-2 ">
        <Button variant="outlined" size="large">
          PRINT
        </Button>
      </div>
      <div className="flex space-x-2 pt-3">
        <Button
          variant="outlined"
          size="medium"
          onClick={handleDataButtonClick}
        >
          ITEM ALERT
        </Button>
        <Button
          variant="outlined"
          size="medium"
          onClick={handleOldItemButtonClick}
        >
          OLD ITEM
        </Button>
        <Button
          variant="outlined"
          size="medium"
          onClick={handleNewItemButtonClick}
        >
          NEW ITEM
        </Button>
        <Button variant="outlined" size="medium">
          First Order
        </Button>
      </div>

      {content}
    </div>
  );
};

export default Alert_Table;
