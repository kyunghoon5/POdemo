import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './tableAll.css';
import BlankPage from './BlankPage';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'semantic-ui-css/semantic.min.css';

var _ = require('lodash');
// or less ideally

export const SearchPage = () => {
  const [productData, setProductData] = useState([]);
  console.log(productData);
  const [search, setSearch] = useState([]);
  const [record, setRecord] = useState([]);
  const [imageClicked, setImageClicked] = useState({ first: false });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  
var obj = JSON.parse(JSON.stringify(search.map((item) => (
                  
                    item.first[3]
                  ))));
console.log(obj.purno)

  //POS select Strinf to Array
  const [selectedItem, setSelectedItem] = useState([]);

  const handleChange = (e) => {
    let value = e.target.value;
    setSelectedItem(value.split(','));
  };

  useEffect(() => {
    console.log(selectedItem);
  }, [selectedItem]);

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
  const date = new Date();
  const curDate = date.toLocaleDateString();
  const past30 = new Date();
  past30.setDate(past30.getDate() - 30);
  const past30c = past30.toLocaleDateString();

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
                    />
                  )}
                </div>
              </td>
              <td className="convST1">MONTH</td>
              <td className="convST2">FORECAST</td>
              <td className="convST2">FORECAST</td>
              <td className="convST2">FORECAST</td>
              <td className="convST2">FORECAST</td>
              <td className="convST2">FORECAST</td>
              <td className="convST2">FORECAST</td>
              <td className="convST2">FORECAST</td>
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
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
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
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr className="row4">
              <InfoItemOb className="infoCol1" name="SMP DTE:" />
              <td colSpan="3" className="smpDte"></td>

              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
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
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
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

              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
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

              <td></td>
              <td></td>
              <td style={{ background: '#f0e68c' }}>PUR_date</td>

              {/*purchased date*/}
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.sixth ?? []))
                    .filter((item) => item.purdate)
                    .map(
                      (item) =>
                        new Date(item.purdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.fifth ?? []))
                    .filter((item) => item.purdate)
                    .map(
                      (item) =>
                        new Date(item.purdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.fourth ?? []))
                    .filter((item) => item.purdate)
                    .map(
                      (item) =>
                        new Date(item.purdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.third ?? []))
                    .filter((item) => item.purdate)
                    .map(
                      (item) =>
                        new Date(item.purdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.second ?? []))
                    .filter((item) => item.purdate)
                    .map(
                      (item) =>
                        new Date(item.purdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.first ?? []))
                    .filter((item) => item.purdate)
                    .map(
                      (item) =>
                        new Date(item.purdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
            </tr>

            <tr className="row8">
              <InfoItemOb className="infoCol1" name="DGN DTE:" />
              <td colSpan="3" className="dgnDte"></td>

              <td></td>
              <td></td>
              <td style={{ background: '#f0e68c' }}>SHP_date</td>
              {/*shipping date*/}
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.sixth ?? []))
                    .filter((item) => item.shpdate)
                    .map(
                      (item) =>
                        new Date(item.shpdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.fifth ?? []))
                    .filter((item) => item.shpdate)
                    .map(
                      (item) =>
                        new Date(item.shpdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.fourth ?? []))
                    .filter((item) => item.shpdate)
                    .map(
                      (item) =>
                        new Date(item.shpdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.third ?? []))
                    .filter((item) => item.shpdate)
                    .map(
                      (item) =>
                        new Date(item.shpdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.second ?? []))
                    .filter((item) => item.shpdate)
                    .map(
                      (item) =>
                        new Date(item.shpdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.first ?? []))
                    .filter((item) => item.shpdate)
                    .map(
                      (item) =>
                        new Date(item.shpdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
            </tr>

            <tr className="row9">
              <InfoItemOb className="infoCol1" name="PO's 2" />
              <td colSpan="2">
                <span className="pctn" style={{ float: 'left' }}></span>
                <span className="dimension" style={{ float: 'right' }}></span>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td style={{ background: '#f0e68c' }}>EXP_date</td>
              {/*expected rec date*/}
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.sixth ?? []))
                    .filter((item) => item.reqdate)
                    .map((item, idx) => (
                      <button key={idx}>
                        {new Date(item.reqdate).toISOString().split('T')[0]}
                      </button>
                    ))[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.fifth ?? []))
                    .filter((item) => item.reqdate)
                    .map((item, idx) => (
                      <button key={idx}>
                        {new Date(item.reqdate).toISOString().split('T')[0]}
                      </button>
                    ))[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.fourth ?? []))
                    .filter((item) => item.reqdate)
                    .map((item, idx) => (
                      <button key={idx}>
                        {new Date(item.reqdate).toISOString().split('T')[0]}
                      </button>
                    ))[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.third ?? []))
                    .filter((item) => item.reqdate)
                    .map((item, idx) => (
                      <button key={idx}>
                        {new Date(item.reqdate).toISOString().split('T')[0]}
                      </button>
                    ))[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.second ?? []))
                    .filter((item) => item.reqdate)
                    .map((item, idx) => (
                      <button key={idx}>
                        {new Date(item.reqdate).toISOString().split('T')[0]}
                      </button>
                    ))[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.first ?? []))
                    .filter((item) => item.reqdate)
                    .map((item, idx) => (
                      <button key={idx}>
                        {new Date(item.reqdate).toISOString().split('T')[0]}
                      </button>
                    ))[0]
                }
              </td>
            </tr>
            <tr className="row10">
              <InfoItemOb className="infoCol1" name="ST_DATE" />
              <td className="stDate" colSpan="2">
                {
                  search
                    .filter((item) => item.start_dte)

                    .map(
                      (item) =>
                        new Date(item.start_dte).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td style={{ background: '#f0e68c' }}>RCV_date</td>

              {/*Actual rec date*/}
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.sixth ?? []))
                    .filter((item) => item.recdate)
                    .map(
                      (item) =>
                        new Date(item.recdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.fifth ?? []))
                    .filter((item) => item.recdate)
                    .map(
                      (item) =>
                        new Date(item.recdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.fourth ?? []))
                    .filter((item) => item.recdate)
                    .map(
                      (item) =>
                        new Date(item.recdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.third ?? []))
                    .filter((item) => item.recdate)
                    .map(
                      (item) =>
                        new Date(item.recdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.second ?? []))
                    .filter((item) => item.recdate)
                    .map(
                      (item) =>
                        new Date(item.recdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.first ?? []))
                    .filter((item) => item.recdate)
                    .map(
                      (item) =>
                        new Date(item.recdate).toISOString().split('T')[0]
                    )[0]
                }
              </td>
            </tr>

            <tr className="row11">
              <td className="cost">RPL: </td>
              <td colSpan="2" className="price">
                {
                  search
                    .filter((item) => typeof item.price === 'number')
                    .map((item, idx) => (
                      <div key={idx}>PRICE: ${item.price}</div>
                    ))[0]
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
              <td className="prv30">{past30c}</td>
              <td className="prv30">01/16/2023</td>
              <td className="prv30">01/16/2023</td>
              {/*purno No*/}
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.sixth ?? []))
                    .filter((item) => item.portn)
                    .map((item) => item.portn)[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.fifth ?? []))
                    .filter((item) => item.portn)
                    .map((item) => item.portn)[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.fourth ?? []))
                    .filter((item) => item.portn)
                    .map((item) => item.portn)[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.third ?? []))
                    .filter((item) => item.portn)
                    .map((item) => item.portn)[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.second ?? []))
                    .filter((item) => item.portn)
                    .map((item) => item.portn)[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.first ?? []))
                    .filter((item) => item.portn)
                    .map((item) => item.portn)[0]
                }
              </td>
            </tr>

            <tr className="row12">
              <td className="cost"> </td>
              <td colSpan="2" className="price"></td>
              <td id="diffDays"></td>
              <td id="recDte" className="recDateSel_cal">
                {curDate}
              </td>
              <td colSpan="2">
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                />
              </td>
              <td className="prv30">{curDate}</td>
              <td className="prv30">01/16/2023</td>
              <td className="prv30">01/16/2023</td>
              {/*invoice No */}
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.sixth ?? []))
                    .filter((item) => item.invno)
                    .map((item) => item.invno)[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.fifth ?? []))
                    .filter((item) => item.invno)
                    .map((item) => item.invno)[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.fourth ?? []))
                    .filter((item) => item.invno)
                    .map((item) => item.invno)[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.third ?? []))
                    .filter((item) => item.invno)
                    .map((item) => item.invno)[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.second ?? []))
                    .filter((item) => item.invno)
                    .map((item) => item.invno)[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.first ?? []))
                    .filter((item) => item.invno)
                    .map((item) => item.invno)[0]
                }
              </td>
            </tr>
          </tbody>

          <tbody id="tb2" className="table2">
            <tr>
              <td></td>
              <td>OH</td>
              <td>REORDER</td>
              <td>
                <div className="App">
                  <select name="item-selected" onChange={handleChange}>
                    {/*POS initial */}
                    <option
                      value={search.map((item) =>
                        item.first.length
                          ? item.first.map((item2) => item2.qtyord)
                          : null
                      )}
                    >
                      POS_
                    </option>

                    <option
                      value={search.map((item) =>
                        item.first.length
                          ? item.first.map((item2) => item2.qtyord)
                          : null
                      )}
                    >
                      {
                        search
                          .flatMap((item) => [item].concat(item.first ?? []))
                          .filter((item) => item.purno)
                          .map((item) => item.purno)[0]
                      }
                    </option>

                    <option
                      value={search.map((item) =>
                        item.second.length
                          ? item.second.map((item2) => item2.qtyord)
                          : null
                      )}
                    >
                      {
                        search
                          .flatMap((item) => [item].concat(item.second ?? []))
                          .filter((item) => item.purno)
                          .map((item) => item.purno)[0]
                      }
                    </option>

                    <option
                      value={search.map((item) =>
                        item.third.length
                          ? item.third.map((item2) => item2.qtyord)
                          : null
                      )}
                    >
                      {
                        search
                          .flatMap((item) => [item].concat(item.third ?? []))
                          .filter((item) => item.purno)
                          .map((item) => item.purno)[0]
                      }
                    </option>

                    <option
                      value={search.map((item) =>
                        item.fourth.length
                          ? item.fourth.map((item2) => item2.qtyord)
                          : null
                      )}
                    >
                      {
                        search
                          .flatMap((item) => [item].concat(item.fourth ?? []))
                          .filter((item) => item.purno)
                          .map((item) => item.purno)[0]
                      }
                    </option>

                    <option
                      value={search.map((item) =>
                        item.fifth.length
                          ? item.fifth.map((item2) => item2.qtyord)
                          : null
                      )}
                    >
                      {
                        search
                          .flatMap((item) => [item].concat(item.fifth ?? []))
                          .filter((item) => item.purno)
                          .map((item) => item.purno)[0]
                      }
                    </option>

                    <option
                      value={search.map((item) =>
                        item.sixth.length
                          ? item.sixth.map((item2) => item2.qtyord)
                          : null
                      )}
                    >
                      {
                        search
                          .flatMap((item) => [item].concat(item.sixth ?? []))
                          .filter((item) => item.purno)
                          .map((item) => item.purno)[0]
                      }
                    </option>
                  </select>
                </div>
              </td>
              <td>SOLD</td>
              <td colSpan={2}>N days</td>
              <td>SOLD30</td>
              <td>SOLD90</td>
              <td>SOLD365</td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.sixth ?? []))
                    .filter((item) => item.purno)
                    .map((item) => item.purno)[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.fifth ?? []))
                    .filter((item) => item.purno)
                    .map((item) => item.purno)[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.fourth ?? []))
                    .filter((item) => item.purno)
                    .map((item) => item.purno)[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.third ?? []))
                    .filter((item) => item.purno)
                    .map((item) => item.purno)[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.second ?? []))
                    .filter((item) => item.purno)
                    .map((item) => item.purno)[0]
                }
              </td>
              <td>
                {
                  search
                    .flatMap((item) => [item].concat(item.first ?? []))
                    .filter((item) => item.purno)
                    .map((item) => item.purno)[0]
                }
              </td>
            </tr>
          </tbody>

          {}

          {/* body table3 */}

          {search.length > 0 ? (
            <tbody id="tt" className="buttomSearch">
              <td>
                {search
                  .filter((item) => item.itemkey2)
                  .map((item, idx) => (
                    <tr key={idx}>{item.itemkey2}</tr>
                  ))}
              </td>

              <td>
                {search
                  .filter((item) => typeof item.onhand === 'number')
                  .map((item, idx) => (
                    <tr key={idx}>{item.onhand}</tr>
                  ))}
              </td>
              <td>
                <tr></tr>
              </td>
              {selectedItem.length > 0 ? (
                <td>
                  {selectedItem.map((item, idx) => (
                    <tr key={idx}>{item}</tr>
                  ))}
                </td>
              ) : (
                <td>
                  {search.map((item, idx) =>
                    item.first.length ? (
                      item.first.map((item2, idx2) => (
                        <tr key={idx2}>{item2.qtyord}</tr>
                      ))
                    ) : (
                      <tr key={idx}></tr>
                    )
                  )}
                </td>
              )}
              <td>
                <tr></tr>
              </td>
              <td>
                {search
                  .filter((item) => typeof item.qtyshp === 'number')
                  .map((item, idx) => (
                    <tr key={idx}>{item.qtyshp}</tr>
                  ))}
              </td>
              <td>
                <tr></tr>
              </td>
              {/*column table with nested array */}
              <td>
                {search.map((item, idx) =>
                  item.sold30.length ? (
                    item.sold30.map((item2, idx2) => (
                      <tr key={idx2}>{item2.qtyshp}</tr>
                    ))
                  ) : (
                    <tr key={idx}></tr>
                  )
                )}
              </td>

              <td>
                {search
                  .filter((item) => typeof item.qtyshp === 'number')
                  .map((item, idx) => (
                    <tr key={idx}>{item.qtyshp}</tr>
                  ))}
              </td>

              <td>
                {search
                  .filter((item) => typeof item.qtyshp === 'number')
                  .map((item, idx) => (
                    <tr key={idx}>{item.qtyshp}</tr>
                  ))}
              </td>
              {/*column table with nested array */}
              <td>
                {search.map((item, idx) =>
                  item.sixth.length ? (
                    item.sixth.map((item2, idx2) => (
                      <tr key={idx2}>{item2.qtyord}</tr>
                    ))
                  ) : (
                    <tr key={idx}></tr>
                  )
                )}
              </td>
              {/*column table with nested array */}
              <td>
                {search.map((item, idx) =>
                  item.fifth.length ? (
                    item.fifth.map((item2, idx2) => (
                      <tr key={idx2}>{item2.qtyord}</tr>
                    ))
                  ) : (
                    <tr key={idx}></tr>
                  )
                )}
              </td>
              {/*column table with nested array */}
              <td>
                {search.map((item, idx) =>
                  item.fourth.length ? (
                    item.fourth.map((item2, idx2) => (
                      <tr key={idx2}>{item2.qtyord}</tr>
                    ))
                  ) : (
                    <tr key={idx}></tr>
                  )
                )}
              </td>
              {/*column table with nested array */}
              <td>
                {search.map((item, idx) =>
                  item.third.length ? (
                    item.third.map((item2, idx2) => (
                      <tr key={idx2}>{item2.qtyord}</tr>
                    ))
                  ) : (
                    <tr key={idx}></tr>
                  )
                )}
              </td>
              {/*column table with nested array */}
              <td>
                {search.map((item, idx) =>
                  item.second.length ? (
                    item.second.map((item2, idx2) => (
                      <tr key={idx2}>{item2.qtyord}</tr>
                    ))
                  ) : (
                    <tr key={idx}></tr>
                  )
                )}
              </td>
              {/*column table with nested array */}
              <td>
                {search.map((item, idx) =>
                  item.first.length ? (
                    item.first.map((item2, idx2) => (
                      <tr key={idx2}>{item2.qtyord}</tr>
                    ))
                  ) : (
                    <tr key={idx}></tr>
                  )
                )}
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
