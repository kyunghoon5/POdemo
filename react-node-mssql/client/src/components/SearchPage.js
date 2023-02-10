import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import './infoItem.css';

export const SearchPage = () => {
  const [data, setData] = useState([]);
  console.log('🚀 ~ file: search.js:7 ~ Search ~ data', data);
  const [search, setSearch] = useState('');

  const itemData = async () => {
    return await axios
      .get('http://localhost:8080/api/events')
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  };

  //console.log('data',data) data 확인

  function InfoItemOb(props) {
    return (
      <td className={props.className} style={{ textAlign: 'left' }}>
        {props.name}
      </td>
    );
  }

  const productData = useMemo(() => {
    return data.filter((item) => {
      return item.descrip.toLowerCase().includes(search.toLowerCase());
    });
  }, [data, search]);

  useEffect(() => {
    itemData();
  }, []);

  return (
    <div className="search">
      <div>
        <table className="table1">
          <tbody>
            <tr className="row1">
              <InfoItemOb className="infoCol1" name="ITEM:" />
              <td className="nameSection" colSpan={2}>
                <input
                  id="search"
                  placeholder="Search item name here"
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                  //value={search}
                  style={{
                    with: '150px',
                    marginLeft: '3px',
                    paddingLeft: '3px',
                    display: 'block',
                  }}
                />
              </td>
              <td className="btn1">
                <button id="submitBtn" type="sumbit">
                  SUBMIT
                </button>
              </td>
            </tr>

            <tr className="row2">
              <InfoItemOb className="infoCol1" name="ITEM NO:" />
              <td colSpan={3} className="smpNO">
                {productData.map((item) => {
                  return <>{item.class}</>;
                })}
              </td>
            </tr>
            <tr className="row3">
              <InfoItemOb className="infoCol1" name="ORIGINAL:" />
            </tr>
            <tr className="row4">
              <InfoItemOb className="infoCol1" name="SMP DTE:" />
            </tr>
            <tr className="row5">
              <InfoItemOb className="infoCol1" name="WEIGHT:" />
            </tr>
            <tr className="row6">
              <InfoItemOb className="infoCol1" name="LENGTH:" />
            </tr>
            <tr className="row7">
              <InfoItemOb className="infoCol1" name="FIBER:" />
            </tr>
            <tr className="row8">
              <InfoItemOb className="infoCol1" name="DGN DTE:" />
            </tr>
            <tr className="row9">
              <InfoItemOb className="infoCol1" name="PO's 2" />
            </tr>
            <tr className="row10">
              <InfoItemOb className="infoCol1" name="ST_DATE" />
            </tr>
          </tbody>
        </table>
      </div>

      <h1>Non-New item</h1>

      {productData.map((item) => {
        //const arr = data.reduce((a, v) => (a = a + v.totalprice), 0); totalprice 총합
        //const arr = data.reduce((a, v) => (a = a + v.netprice), 0);
        //const fruits = data.rank
        //const lastElement = fruits.slice(-1)
        //console.log(lastElement)

        const a = item.Percentile * 100;
        //console.log(arr)
        if (a > 95) {
          return (
            <h4>
              {item.descrip}, <div style={{ color: 'green' }}>'A' Class</div>,
              {item.totalprice}, {item.netprice}
            </h4>
          );
        } else if (a > 70) {
          return (
            <h4>
              {item.descrip}, <div style={{ color: 'orange' }}>'B' Class</div>,
              {item.totalprice}, {item.netprice}
            </h4>
          );
        } else if (a > 50) {
          return (
            <h4>
              {item.descrip}, <div style={{ color: 'brown' }}>'C' Class</div>,
              {item.totalprice}, {item.netprice}
            </h4>
          );
        } else {
          return (
            <h4>
              {item.descrip}, <div style={{ color: 'red' }}>'D' Class</div>,
              {item.totalprice}, {item.netprice}
            </h4>
          );
        }
      })}
    </div>
  );
};
