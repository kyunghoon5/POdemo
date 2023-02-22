import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './tableAll.css';
import BlankPage from './BlankPage';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const SearchPage = () => {
  const [productData, setProductData] = useState([]);
  console.log(productData);
  const [search, setSearch] = useState([]);
  const [record, setRecord] = useState([]);
  const [imageClicked, setImageClicked] = useState({ first: false });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  //image handler
  const onClickImageHandler = (item) => {
    setImageClicked((prevState) => ({
      ...prevState,
      [item]: !prevState[item],
    }));
  };

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
  //img.vanessahair.com/sales/MIST%20AILYN.jpg
  // const imgSrc = `http://localhost:8080/api/img/${name}.jpg`;

  console.log(search);

  //buttonSearch console
  const bc = search
    .filter((item) => typeof item.onhand === 'number')

    .map((item) => item.onhand);
  console.log(bc);

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
                  onClick={() => {
                    searchRecords();
                    onClickImageHandler('first');
                  }}
                  className="btn1name"
                  id="submitBtn"
                  type="submit"
                >
                  SUBMIT
                </button>
              </td>
              <td
                colSpan="3"
                rowSpan="10"
                className="prodImg"
                style={{ height: '320px', widows: '240px' }}
              >
                <div>
                  {imageClicked.first && (
                    <img
                      src={`http://img.vanessahair.com/sales/${record}.jpg`}
                      className="mainImage"
                      style={{ height: '320px', widows: '240px' }}
                      onerror="prodImgError(this)"
                    />
                  )}
                </div>
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
                  search
                    .filter((item) => item.start_dte)
                    .map((item) => <div>{item.start_dte}</div>)[0]
                }
              </td>
            </tr>
            <tr className="row11">
              <td className="cost">RPL: </td>
              <td colSpan="2" className="price">
                {
                  search
                    .filter((item) => typeof item.price === 'number')
                    .map((item) => <div>PRICE: ${item.price}</div>)[0]
                }
              </td>
              <td id="diffDays"></td>
              <td id="recDte" className="recDateSel_cal"></td>
              <td colSpan="2">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
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
              <td colSpan="2" className="price"></td>
              <td id="diffDays"></td>
              <td id="recDte" className="recDateSel_cal"></td>
              <td colSpan="2">
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
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

          {search.length > 0 ? (
            <tbody id="tt" className="buttomSearch">
              <td>
                {search
                  .filter((item) => item.itemkey2)
                  .map((item) => (
                    <tr>{item.itemkey2}</tr>
                  ))}
              </td>

              <td>
                {search
                  .filter((item) => typeof item.onhand === 'number')
                  .map((item) => (
                    <tr>{item.onhand}</tr>
                  ))}
              </td>
              <td>
                <tr></tr>
              </td>
              <td>
                <tr></tr>
              </td>
              <td>
                <tr></tr>
              </td>
              <td>
                {search
                  .filter((item) => typeof item.soldTotal === 'number')
                  .map((item) => (
                    <tr>{item.soldTotal}</tr>
                  ))}
              </td>
              <td>
                <tr></tr>
              </td>

              <td>
                {search
                  .filter((item) => typeof item.sold30 === 'number')
                  .map((item) => (
                    <tr>{item.sold30}</tr>
                  ))}
              </td>

              <td>
                {search
                  .filter((item) => typeof item.sold90 === 'number')
                  .map((item) => (
                    <tr>{item.sold90}</tr>
                  ))}
              </td>

              <td>
                {search
                  .filter((item) => typeof item.sold365 === 'number')
                  .map((item) => (
                    <tr>{item.sold365}</tr>
                  ))}
              </td>

              <td>
                {search
                  .filter((item) => typeof item.qtyord === 'number')
                  .map((item) => (
                    <tr>{item.qtyord}</tr>
                  ))}
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
