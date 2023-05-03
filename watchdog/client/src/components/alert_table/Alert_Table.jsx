import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';

const Alert_Table = ({
  itemAlertOld,
  loadingAlert,
  itemFirstOrder,
  itemNewOrder,
  itemoldOrder,
  loadingOldOrder,
  loadingNewOrder,
  loadingFirstOrder,
}) => {
  const [showData, setShowData] = useState(false);
  const [showOldItem, setOldItem] = useState(false);
  const [showNewItem, setNewItem] = useState(false);
  const [showFirstItem, setFirstItem] = useState(false);

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
    setNewItem(false);
    setFirstItem(false);
  };
  const handleOldItemButtonClick = () => {
    setOldItem(true);
    setShowData(false);
    setNewItem(false);
    setFirstItem(false);
  };
  const handleNewItemButtonClick = () => {
    setNewItem(true);
    setOldItem(false);
    setShowData(false);
    setFirstItem(false);
  };
  const handleFirstItemButtonClick = () => {
    setFirstItem(true);
    setNewItem(false);
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
      width: 120,
    },
  ];

  const data = itemAlertOld.map((item, index) => ({
    id: index,
    vendno: item.vendno,
    descrip: item.descrip,
    itemkey2: item.itemkey2,
    needed: item.needed,
  }));

  const OldItemColumns = [
    { field: 'vendno', headerName: 'Vendno', width: 80 },
    { field: 'class', headerName: 'Class', width: 80 },
    { field: 'descrip', headerName: 'Descrip', width: 120 },
    { field: 'qtyshp', headerName: 'Qtyshp', type: 'number', width: 100 },
    {
      field: 'start_dte',
      headerName: 'Start_dte',
      type: 'date',
      width: 90,
      valueGetter: (params) => {
        return new Date(params.value);
      },
    },
  ];

  const OldItemData = itemoldOrder.map((item, index) => ({
    id: index,
    vendno: item.vendno,
    class: item.class,
    descrip: item.descrip,
    qtyshp: item.qtyshp,
    start_dte: item.start_dte,
  }));

  const NewItemColumns = [
    { field: 'vendno', headerName: 'Vendno', width: 80 },
    { field: 'class', headerName: 'Class', width: 80 },
    { field: 'descrip', headerName: 'Descrip', width: 120 },
    { field: 'qtyshp', headerName: 'Qtyshp', type: 'number', width: 100 },
    {
      field: 'start_dte',
      headerName: 'Start_dte',
      type: 'date',
      width: 90,
      valueGetter: (params) => {
        return new Date(params.value);
      },
    },
  ];

  const NewItemData = itemNewOrder.map((item, index) => ({
    id: index,
    vendno: item.vendno,
    class: item.class,
    descrip: item.descrip,
    qtyshp: item.qtyshp,
    start_dte: item.start_dte,
  }));

  const FirstItemColumns = [
    { field: 'vendno', headerName: 'Vendno', width: 80 },
    { field: 'class', headerName: 'Class', width: 80 },
    { field: 'descrip', headerName: 'Descrip', width: 120 },
    { field: 'qtyshp', headerName: 'Qtyshp', type: 'number', width: 100 },
    {
      field: 'start_dte',
      headerName: 'Start_dte',
      type: 'date',
      width: 90,
      valueGetter: (params) => {
        return new Date(params.value);
      },
    },
  ];

  const FirstItemData = itemFirstOrder.map((item, index) => ({
    id: index,
    vendno: item.vendno,
    class: item.class,
    descrip: item.descrip,
    qtyshp: item.qtyshp,
    start_dte: item.start_dte,
  }));

  let content;
  switch (true) {
    case showData:
      content = (
        <>
          <div className="pt-4 pb-2 font-semibold">ITEM ALERT</div>
          <div
            className="flex-col flex bg-gray-200 text-black
            h-[670px] w-[480px] border-none overflow-y-scroll"
          >
            <div>
              {loadingAlert ? (
                <p>Loading...</p>
              ) : (
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
              )}
            </div>
          </div>
        </>
      );
      break;
    case showOldItem:
      content = (
        <>
          <div className="pt-4 pb-2 font-semibold">OLD ITEM</div>
          <div
            className="flex-col flex bg-gray-200 text-black
            h-[670px] w-[480px] border-none overflow-y-scroll"
          >
            <div>
              {loadingOldOrder ? (
                <p>Loading...</p>
              ) : (
                <DataGrid
                  rows={OldItemData}
                  columns={OldItemColumns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 10 },
                    },
                  }}
                  pageSizeOptions={[5, 10]}
                />
              )}
            </div>
          </div>
        </>
      );
      break;
    case showNewItem:
      content = (
        <>
          <div className="pt-4 pb-2 font-semibold">NEW ITEM</div>
          <div
            className="flex-col flex bg-gray-200 text-black
            h-[670px] w-[480px] border-none overflow-y-scroll"
          >
            <div>
              {loadingNewOrder ? (
                <p>Loading...</p>
              ) : (
                <DataGrid
                  rows={NewItemData}
                  columns={NewItemColumns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 10 },
                    },
                  }}
                  pageSizeOptions={[5, 10]}
                />
              )}
            </div>
          </div>
        </>
      );
      break;
    case showFirstItem:
      content = (
        <>
          <div className="pt-4 pb-2 font-semibold">FIRST ORDER ITEM</div>
          <div
            className="flex-col flex bg-gray-200 text-black
            h-[670px] w-[480px] border-none overflow-y-scroll"
          >
            <div>
              {loadingFirstOrder ? (
                <p>Loading...</p>
              ) : (
                <DataGrid
                  rows={FirstItemData}
                  columns={FirstItemColumns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 10 },
                    },
                  }}
                  pageSizeOptions={[5, 10]}
                />
              )}
            </div>
          </div>
        </>
      );
      break;

    default:
      content = (
        <>
          <div className="pt-4 pb-2 font-semibold">ITEM ALERT</div>
          <div
            className="flex-col flex bg-gray-200 text-black
          h-[670px] w-[480px] border-none overflow-y-scroll"
          >
            <div>
              {loadingAlert ? (
                <p>Loading...</p>
              ) : (
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
              )}
            </div>
          </div>
        </>
      );
      break;
  }

  return (
    <div className="pl-3 pr-3 pt-3 pb-3 h-auto w-[520px] bg-neutral-400">
      <div className="pb-3 text-2xl font-semibold text-zinc-50 text-right">
        CONTROL PANEL
      </div>
      <div className="flex space-x-2 ">
        {/* <Button variant="outlined" size="large">
            PRINT
          </Button> */}
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
        <Button
          variant="outlined"
          size="medium"
          onClick={handleFirstItemButtonClick}
        >
          First Order
        </Button>
      </div>

      {content}
    </div>
  );
};

export default Alert_Table;
