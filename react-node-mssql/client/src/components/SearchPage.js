import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import './tableAll.css';

export const SearchPage = () => {
  const [data, setData] = useState([]);
  console.log('🚀 ~ file: search.js:7 ~ Search ~ data', data);
  const [search, setSearch] = useState('');

  useEffect(() => {
    itemData();
  }, []);

  const itemData = async () => {
    return await axios
      .get('http://localhost:8080/api/events')
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  };

  //console.log('data',data) data 확인

  //className & table-text
  const InfoItemOb = (props) => {
    return (
      <td className={props.className} style={{ textAlign: 'left' }}>
        {props.name}
      </td>
    );
  };

  const productData = useMemo(() => {
    return data.filter((item) => {
      return item.descrip.toLowerCase().includes(search.toLowerCase());
    });
  }, [data, search]);
  return (
    <div className="search">
      <div>
        <table id="tb1" className="table1">
          <tbody>
            <tr className="row1">
              <InfoItemOb className="infoCol1" name="ITEM:" />
              <td className="nameSection" colSpan="2">
                <input
                  id="search"
                  placeholder="Search item name here"
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                  //value={search}
                  style={{
                    width: '150px',
                    marginLeft: '3px',
                    paddingLeft: '3px',
                    display: 'block',
                  }}
                />
              </td>

              <td className="btn1">
                <button className="btn1name" id="submitBtn" type="sumbit">
                  SUBMIT
                </button>
              </td>
              <td className="convST1">MONTH</td>
              <td className="convST2">FORECAST</td>
            </tr>

            <tr className="row2">
              <InfoItemOb className="infoCol1" name="ITEM NO:" />
              <td colSpan="3" className="smpNo">
                {
                  productData.map((item, i) => {
                    return <div>{item.price}</div>;
                  })[0]
                }
              </td>
            </tr>
            <tr className="row3">
              <InfoItemOb className="infoCol1" name="ORIGINAL:" />
              <td colSpan="3">
                <span
                  className="original"
                  style={{ float: 'left', paddingLeft: '3px' }}
                ></span>
                <span
                  className="originalPo"
                  style={{ float: 'right', paddingRight: '3px' }}
                ></span>
              </td>
            </tr>
            <tr className="row4">
              <InfoItemOb className="infoCol1" name="SMP DTE:" />
              <td colSpan="3" className="smpDte"></td>
            </tr>
            <tr className="row5">
              <InfoItemOb className="infoCol1" name="WEIGHT:" />
              <td colSpan="3">
                <span
                  className="weight"
                  style={{
                    float: 'left',
                    textAlign: 'center',
                    paddingLeft: '3px',
                  }}
                ></span>
                <span
                  className="weight_po"
                  style={{
                    float: 'right',
                    textAlign: 'center',
                    paddingRight: '3px',
                  }}
                ></span>
              </td>
            </tr>
            <tr className="row6">
              <InfoItemOb className="infoCol1" name="LENGTH:" />
              <td colSpan="3">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span className="length"></span>
                  <span>
                    <span style={{ marginBottom: '0px' }}></span>
                    <span className="fl"> </span>
                  </span>
                  <span style={{ paddingRight: '3px' }}>
                    <span style={{ marginBottom: '0px' }}></span>
                    <span className="pl"> </span>
                  </span>
                </div>
              </td>
            </tr>
            <tr className="row7">
              <InfoItemOb className="infoCol1" name="FIBER:" />
              <td colSpan="3">
                <span
                  className="fiber"
                  style={{
                    float: 'left',
                    verticalAlign: 'middle',
                    paddingLeft: '3px',
                  }}
                ></span>
                <span
                  className="fiberPo"
                  style={{
                    float: 'right',
                    verticalAlign: 'middle',
                    paddingRight: '3px',
                  }}
                ></span>
              </td>
            </tr>
            <tr className="row8">
              <InfoItemOb className="infoCol1" name="DGN DTE:" />
              <td colSpan="3" className="dgnDte"></td>
            </tr>
            <tr className="row9">
              <InfoItemOb className="infoCol1" name="PO's 2" />
              <td colSpan="2">
                <span className="pctn" style={{ float: 'left' }}></span>
                <span className="dimension" style={{ float: 'right' }}></span>
              </td>
            </tr>
            <tr className="row10">
              <InfoItemOb className="infoCol1" name="ST_DATE" />
              <td className="stDate" colSpan="2">
                {
                  productData.map((item, i) => {
                    return <h4>{item.netprice}</h4>;
                  })[0]
                }
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h1>Non-New item</h1>

      {productData.map((item, i) => {
        return <h4>{item.descrip}</h4>;
      })}
    </div>
  );
};
