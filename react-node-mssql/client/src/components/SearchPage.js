import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import './tableAll.css';
import BlankPage from './BlankPage';

export const SearchPage = () => {
  const [productData, setProductData] = useState([]);
  console.log(productData);
  const [search, setSearch] = useState([]);
  const [record, setRecord] = useState([]);

  useEffect(() => {
    itemData();
  }, []);

  const itemData = async () => {
    return await axios
      .get('http://localhost:8082/mergeData')
      .then((response) => setProductData(response.data))
      .catch((err) => console.log(err));
  };

  const searchRecords = (e) => {
    const searchedRecord = record.toLowerCase();

    axios
      .get(`http://localhost:8082/mergeData?descrip=${searchedRecord}`)
      .then((response) => {
        setSearch(response.data);
      });
  };

  //className & table-text
  const InfoItemOb = (props) => {
    return (
      <td className={props.className} style={{ textAlign: 'left' }}>
        {props.name}
      </td>
    );
  };

  // const imgSrc = `http://localhost:8080/api/img/${name}.jpg`;

  console.log(search);

  //total

  const sum2 = async () => {
    return await search.map((item) => item.sold30).reduce((a, b) => a + b);
  };

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
                  onChange={(e) => setRecord(e.target.value)}
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
                <button
                  onClick={searchRecords}
                  className="btn1name"
                  id="submitBtn"
                  type="submit"
                >
                  SUBMIT
                </button>
              </td>
              <td colSpan="3" rowSpan="10" className="prodImg">
                {/* <img src={imgSrc} className="max-w-[500px]" /> */}
              </td>
              <td className="convST1">MONTH</td>
              <td className="convST2">FORECAST</td>
            </tr>

            <tr className="row2">
              <InfoItemOb className="infoCol1" name="ITEM NO:" />
              <td colSpan="3" className="smpNo">
                {search.map((item, idx) => (
                  <div className="test2" key={idx}>
                    {item.original}
                  </div>
                ))}
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
                  search.map((item, idx) => (
                    <tr className="test2" key={idx}>
                      {item.start_dte}
                    </tr>
                  ))[0]
                }
              </td>
            </tr>
            <tr className="row11">
              <td className="cost">RPL: </td>
              <td colSpan="2" className="price"></td>
              <td id="diffDays"></td>
              <td id="recDte" className="recDateSel_cal"></td>
              <td colSpan="2">
                <input
                  type="text"
                  id="boStdate"
                  style={{ textAlign: 'center' }}
                  placeholder="BO StDate"
                  //value="11-11-2022"
                  className="hasDatepicker"
                />
              </td>
              <td className="prv30">01/16/2023</td>
              <td className="prv30">01/16/2023</td>
              <td className="prv30">01/16/2023</td>
              <td className="poctn">6</td>
              <td className="poctn">6</td>
              <td className="poctn">6</td>
              <td className="poctn">6</td>
              <td className="poctn">6</td>
              <td className="poctn">6</td>
            </tr>

            <tr className="row12">
              <td className="cost"> </td>
              <td colSpan="2" className="price">
                
              </td>
              <td id="diffDays"></td>
              <td id="recDte" className="recDateSel_cal"></td>
              <td colSpan="2">
                <input
                  type="text"
                  id="boStdate"
                  style={{ textAlign: 'center' }}
                  placeholder="BO StDate"
                  //value="11-11-2022"
                  className="hasDatepicker"
                />
              </td>
              <td className="prv30">01/16/2023</td>
              <td className="prv30">01/16/2023</td>
              <td className="prv30">01/16/2023</td>
              <td className="poctn">6</td>
              <td className="poctn">6</td>
              <td className="poctn">6</td>
              <td className="poctn">6</td>
              <td className="poctn">6</td>
              <td className="poctn">6</td>
            </tr>
          </tbody>
          <tbody id="tb2" className="table2">
            <tr>
              <td></td>
              <td>OH</td>
              <td>REORDER</td>
              <td>POS</td>
              <td>SOLD</td>
              <td colSpan={2}>N days</td>
              <td>SOLD30</td>
              <td>SOLD90</td>
              <td>SOLD365</td>
              <td>C</td>
              <td>C</td>
              <td>C</td>
              <td>C</td>
              <td>C</td>
              <td>C</td>
            </tr>
          </tbody>
          {/* body table */}

          {search.length > 40 ? (
            <tbody id="tt" className="buttomSearch">
              <td>
                {search.map((item, idx) => (
                  <tr
                    className="row1"
                    style={{ textAlign: 'left', color: 'blue' }}
                    key={idx}
                  >
                    {item.itemkey2}
                  </tr>
                ))}
              </td>

              <td>
                {search.map((item, idx) => (
                  <tr className="test2" key={idx}>
                    {item.onhand}
                  </tr>
                ))}
              </td>

              <td>
                <tr>d</tr>
              </td>

              <td>
                <tr>d</tr>
              </td>

              <td>
                <tr>d</tr>
              </td>
              <td>
                <tr>d</tr>
              </td>

              <td>
                <tr>d</tr>
              </td>

              <td>
                {search.map((item, idx) => (
                  <tr className="test2" key={idx}>
                    {item.sold30}
                  </tr>
                ))}
              </td>

              <td>
                {search.map((item, idx) => (
                  <tr className="test2" key={idx}>
                    {item.sold90}
                  </tr>
                ))}
              </td>

              <td>
                {search.map((item, idx) => (
                  <tr className="test2" key={idx}>
                    {item.sold365}
                  </tr>
                ))}
              </td>

              <td>
                <tr>d</tr>
              </td>
              <td>
                <tr>d</tr>
              </td>
              <td>
                <tr>d</tr>
              </td>
              <td>
                <tr>d</tr>
              </td>
              <td>
                <tr>d</tr>
              </td>
              <td>
                <tr>d</tr>
              </td>
            </tbody>
          ) : (
            <>
              <BlankPage />
            </>
          )}
        </table>
      </div>
      <h1>Non-New item</h1>
      <div className="bottomSearchResults"></div>
    </div>
  );
};
