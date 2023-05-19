import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from '@mui/x-data-grid';
import { DiAptana } from 'react-icons/di';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
    </GridToolbarContainer>
  );
}

const Alert_Table = ({
  itemAlertOld,
  loadingAlert,
  itemFirstOrder,
  itemNewOrder,
  itemoldOrder,
  loadingOldOrder,
  loadingNewOrder,
  loadingFirstOrder,
  itemFirstOrderAPI,
  loadedFirstOrder,
  itemNewOrderAPI,
  loadedNewOrder,
  itemoldOrderAPI,
  loadedOldOrder,
  setSelectedSold,
  setWatchDoginfo,
  setitemRank,
  setnewitemRank,
  setIsOpenM,
  setInputValue,
  imageAPI,
  setRecord,
  setfilteredData,
  searchMainData,
  newitemkey2ForecastAPI,
  itemRecords,
  soldPercentageAPI,
  graphAllYearDataAPI,
  chartEachYearDataAPI,
  graphByItemF,
  graphByItemMonthF,
  watchDogAPI,
  newitemRecords,
  pieChartF,
  setGraphDropdownSelectedYear,
}) => {
  function printSection() {
    // 프린트 스타일 추가
    var style = document.createElement('style');
    style.innerHTML =
      '@media print {\
      body {\
        visibility: hidden;\
        -webkit-print-color-adjust: exact;\
        zoom: 75%;\
      }\
      #section-to-print {\
        visibility: visible;\
        position: absolute;\
        left: 0;\
        top: 0;\
      }\
      @page {\
        size: A4;          }\
    }';
    document.head.appendChild(style);

    // 프린트 대상 선택
    var section = document.getElementById('section-to-print');

    // 프린트 창 열기
    window.print();

    // 스타일 복원
    document.head.removeChild(style);
  }
  const [showData, setShowData] = useState(false);
  const [showOldItem, setOldItem] = useState(false);
  const [showNewItem, setNewItem] = useState(false);
  const [showFirstItem, setFirstItem] = useState(false);

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
    if (!loadedOldOrder) {
      itemoldOrderAPI();
    }
  };
  const handleNewItemButtonClick = () => {
    setNewItem(true);
    setOldItem(false);
    setShowData(false);
    setFirstItem(false);
    if (!loadedNewOrder) {
      itemNewOrderAPI();
    }
  };
  const handleFirstItemButtonClick = () => {
    setFirstItem(true);
    setNewItem(false);
    setOldItem(false);
    setShowData(false);

    if (!loadedFirstOrder) {
      itemFirstOrderAPI();
    }
  };
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 25,
    page: 0,
  });

  const columns = [
    {
      field: 'vendno',
      headerName: 'Vendno',
      width: 80,
      cellClassName: 'custom-cell',
    },
    {
      field: 'descrip',
      headerName: 'Descrip',
      width: 120,
      cellClassName: 'custom-cell',
    },
    {
      field: 'needed',
      headerName: 'Needed',
      type: 'number',
      width: 120,
      cellClassName: 'custom-cell',
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
    { field: 'vendno', headerName: 'Vendno', width: 70 },
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
    { field: 'vendno', headerName: 'Vendno', width: 70 },
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
    { field: 'vendno', headerName: 'Vendno', width: 70 },
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

  const reset = () => {
    setSelectedSold([]);
    setGraphDropdownSelectedYear([]);
    setWatchDoginfo([]);
    setitemRank([]);
    setnewitemRank([]);
    setIsOpenM(false);
    setInputValue('');
  };
  switch (true) {
    case showData:
      content = (
        <>
          <div className="pt-4 pb-2 text-center font-semibold">ITEM ALERT</div>
          <div
            className="flex-col flex  text-black
            h-[790px] w-[495px] border-none "
          >
            <div>
              {loadingAlert ? (
                <p>Loading...</p>
              ) : (
                <>
                  <DataGrid
                    rows={data}
                    rowHeight={25}
                    columns={columns}
                    paginationModel={paginationModel}
                    disableRowSelectionOnClick
                    onPaginationModelChange={setPaginationModel}
                    slots={{
                      toolbar: CustomToolbar,
                    }}
                    onCellClick={(params, event) => {
                      imageAPI(params.row.descrip);
                      setRecord(params.row.descrip);

                      searchMainData(params.row.descrip);
                      newitemkey2ForecastAPI(params.row.descrip);
                      itemRecords(params.row.descrip);
                      soldPercentageAPI(params.row.descrip);
                      graphAllYearDataAPI(params.row.descrip);
                      chartEachYearDataAPI(params.row.descrip);
                      graphByItemF(params.row.descrip);
                      graphByItemMonthF(params.row.descrip);
                      watchDogAPI(params.row.descrip);
                      newitemRecords(params.row.descrip);
                      pieChartF(params.row.descrip);
                      reset();
                      setGraphDropdownSelectedYear('YEAR');
                    }}
                    sx={{
                      // disable cell selection style
                      '.MuiDataGrid-cell:focus': {
                        outline: 'none',
                      },
                      // pointer cursor on ALL rows
                      '& .MuiDataGrid-row:hover': {
                        cursor: 'pointer',
                      },
                    }}
                  />
                </>
              )}
            </div>
          </div>
        </>
      );
      break;
    case showOldItem:
      content = (
        <>
          <div className="pt-4 pb-2 text-center font-semibold">
            EXISTING ITEM
          </div>
          <div
            className="flex-col flex  text-black
            h-[790px] w-[495px] border-none "
          >
            <div>
              {loadingOldOrder ? (
                <p>Loading...</p>
              ) : (
                <DataGrid
                  rows={OldItemData}
                  columns={OldItemColumns}
                  rowHeight={25}
                  paginationModel={paginationModel}
                  onPaginationModelChange={setPaginationModel}
                  disableRowSelectionOnClick
                  slots={{
                    toolbar: CustomToolbar,
                  }}
                  onCellClick={(params, event) => {
                    imageAPI(params.row.descrip);
                    setRecord(params.row.descrip);

                    searchMainData(params.row.descrip);
                    newitemkey2ForecastAPI(params.row.descrip);
                    itemRecords(params.row.descrip);
                    soldPercentageAPI(params.row.descrip);
                    graphAllYearDataAPI(params.row.descrip);
                    chartEachYearDataAPI(params.row.descrip);
                    graphByItemF(params.row.descrip);
                    graphByItemMonthF(params.row.descrip);
                    watchDogAPI(params.row.descrip);
                    newitemRecords(params.row.descrip);
                    pieChartF(params.row.descrip);
                    reset();
                    setGraphDropdownSelectedYear('YEAR');
                  }}
                  sx={{
                    // disable cell selection style
                    '.MuiDataGrid-cell:focus': {
                      outline: 'none',
                    },
                    // pointer cursor on ALL rows
                    '& .MuiDataGrid-row:hover': {
                      cursor: 'pointer',
                    },
                  }}
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
          <div className="pt-4 pb-2 text-center font-semibold">NEW ITEM</div>
          <div
            className="flex-col flex  text-black
            h-[790px] w-[495px] border-none "
          >
            <div>
              {loadingNewOrder ? (
                <p>Loading...</p>
              ) : (
                <DataGrid
                  rows={NewItemData}
                  columns={NewItemColumns}
                  rowHeight={25}
                  paginationModel={paginationModel}
                  onPaginationModelChange={setPaginationModel}
                  disableRowSelectionOnClick
                  slots={{
                    toolbar: CustomToolbar,
                  }}
                  onCellClick={(params, event) => {
                    imageAPI(params.row.descrip);
                    setRecord(params.row.descrip);

                    searchMainData(params.row.descrip);
                    newitemkey2ForecastAPI(params.row.descrip);
                    itemRecords(params.row.descrip);
                    soldPercentageAPI(params.row.descrip);
                    graphAllYearDataAPI(params.row.descrip);
                    chartEachYearDataAPI(params.row.descrip);
                    graphByItemF(params.row.descrip);
                    graphByItemMonthF(params.row.descrip);
                    watchDogAPI(params.row.descrip);
                    newitemRecords(params.row.descrip);
                    pieChartF(params.row.descrip);
                    reset();
                    setGraphDropdownSelectedYear('YEAR');
                  }}
                  sx={{
                    // disable cell selection style
                    '.MuiDataGrid-cell:focus': {
                      outline: 'none',
                    },
                    // pointer cursor on ALL rows
                    '& .MuiDataGrid-row:hover': {
                      cursor: 'pointer',
                    },
                  }}
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
          <div className="pt-4 pb-2 text-center font-semibold">
            FIRST ORDER ITEM
          </div>
          <div
            className="flex-col flex  text-black
            h-[790px] w-[495px] border-none "
          >
            <div>
              {loadingFirstOrder ? (
                <p>Loading...</p>
              ) : (
                <DataGrid
                  rows={FirstItemData}
                  columns={FirstItemColumns}
                  rowHeight={25}
                  paginationModel={paginationModel}
                  onPaginationModelChange={setPaginationModel}
                  disableRowSelectionOnClick
                  slots={{
                    toolbar: CustomToolbar,
                  }}
                  onCellClick={(params, event) => {
                    imageAPI(params.row.descrip);
                    setRecord(params.row.descrip);

                    searchMainData(params.row.descrip);
                    newitemkey2ForecastAPI(params.row.descrip);
                    itemRecords(params.row.descrip);
                    soldPercentageAPI(params.row.descrip);
                    graphAllYearDataAPI(params.row.descrip);
                    chartEachYearDataAPI(params.row.descrip);
                    graphByItemF(params.row.descrip);
                    graphByItemMonthF(params.row.descrip);
                    watchDogAPI(params.row.descrip);
                    newitemRecords(params.row.descrip);
                    pieChartF(params.row.descrip);
                    reset();
                    setGraphDropdownSelectedYear('YEAR');
                  }}
                  sx={{
                    // disable cell selection style
                    '.MuiDataGrid-cell:focus': {
                      outline: 'none',
                    },
                    // pointer cursor on ALL rows
                    '& .MuiDataGrid-row:hover': {
                      cursor: 'pointer',
                    },
                  }}
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
          <div className="pt-4 pb-2 text-center font-semibold">ITEM ALERT</div>
          <div
            className="flex-col flex  text-black
            h-[790px] w-[495px] border-none "
          >
            <div>
              {loadingAlert ? (
                <p>Loading...</p>
              ) : (
                <DataGrid
                  rows={data}
                  columns={columns}
                  rowHeight={25}
                  paginationModel={paginationModel}
                  disableRowSelectionOnClick
                  onPaginationModelChange={setPaginationModel}
                  slots={{
                    toolbar: CustomToolbar,
                  }}
                  onCellClick={(params, event) => {
                    imageAPI(params.row.descrip);
                    setRecord(params.row.descrip);

                    searchMainData(params.row.descrip);
                    newitemkey2ForecastAPI(params.row.descrip);
                    itemRecords(params.row.descrip);
                    soldPercentageAPI(params.row.descrip);
                    graphAllYearDataAPI(params.row.descrip);
                    chartEachYearDataAPI(params.row.descrip);
                    graphByItemF(params.row.descrip);
                    graphByItemMonthF(params.row.descrip);
                    watchDogAPI(params.row.descrip);
                    newitemRecords(params.row.descrip);
                    pieChartF(params.row.descrip);
                    reset();
                    setGraphDropdownSelectedYear('YEAR');
                  }}
                  sx={{
                    // disable cell selection style
                    '.MuiDataGrid-cell:focus': {
                      outline: 'none',
                    },
                    // pointer cursor on ALL rows
                    '& .MuiDataGrid-row:hover': {
                      cursor: 'pointer',
                    },
                  }}
                />
              )}
            </div>
          </div>
        </>
      );
      break;
  }

  return (
    <div className="pl-3 pr-3 pt-3 pb-3 h-auto w-[520px] bg-emerald-50">
      <div className="flex justify-end pb-3 text-2xl font-semibold text-black  ">
        CONTROL PANEL
        <DiAptana />
      </div>

      <div className="flex space-x-2 ">
        {/* <Button variant="outlined" size="large">
            PRINT
          </Button> */}
      </div>
      <div className="flex space-x-2 pt-3">
        <Button variant="outlined" size="small" onClick={handleDataButtonClick}>
          ITEM ALERT
        </Button>
        <Button
          variant="outlined"
          size="small"
          onClick={handleOldItemButtonClick}
        >
          <div className="text-xs">EXISTING ITEM</div>
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
        <Button variant="outlined" size="small" onClick={printSection}>
          Print
        </Button>
      </div>

      {content}
    </div>
  );
};

export default Alert_Table;
