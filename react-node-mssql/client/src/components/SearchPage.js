import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './tableAll.css';
import BlankPage from './BlankPage';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'semantic-ui-css/semantic.min.css';
import { values } from 'lodash';

var _ = require('lodash');
// or less ideally

export const SearchPage = () => {
  const [search, setSearch] = useState([]);
  const [record, setRecord] = useState([]);
  const [imageClicked, setImageClicked] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  //POS select Strinf to Array
  const [selectedItem, setSelectedItem] = useState([]);

  const handleChange = (e) => {
    let value = e.target.value;
    setSelectedItem(value.split(','));
  };

  useEffect(() => {
    console.log(selectedItem);
  }, [selectedItem]);

  const reset = () => {
    setSelectedItem([]);
  };

  console.log(search);

  //image handler
  const onClickImageHandler = () => {
    setImageClicked(`http://img.vanessahair.com/sales/${record}.jpg`);
  };

  // const [productData, setProductData] = useState([]);
  //   const itemData = async () => {
  //     return await axios
  //       .get('http://localhost:8082/mergeData')
  //       .then((response) => setProductData(response.data))
  //       .catch((err) => console.log(err));
  //   };

  //    useEffect(() => {
  //      itemData();
  //    }, [productData]);

  const [loading, setLoading] = useState(false);
  const searchRecords = (e) => {
    const searchedRecord = record.toLowerCase();
    setLoading(true);
    axios
      .get(`http://localhost:8082/mergeData?descrip=${searchedRecord}`)

      .then((response) => {
        setSearch(response.data);
         setLoading(false);
      });
  };

  useEffect(() => {}, [search]);

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

  //console.log(search);

  //DATE buttonSearch console
  const date = new Date();
  const curDate = [date.toISOString().split('T')[0]];
  const past30 = new Date();
  past30.setDate(past30.getDate() - 30);
  const past30c = past30.toISOString().split('T')[0];

  //Calculating the numbers of days between two dates
  const date1 = new Date(selectedItem.map((item) => item).slice(1, 2));
  const date2 = new Date();
  const Difference_In_Time = date2.getTime() - date1.getTime();
  const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

//total clr  
const filteredItems = search.filter((item) => item.itemkey2);
const totalItems = filteredItems.length;

//PRL
const filteredItemsP = search.map((item) => item.cost);
const PRLmin = Math.min(...filteredItemsP)
const PRLmax = Math.max(...filteredItemsP);

console.log(PRLmin, PRLmax)





  return (
    <div
      className="search"
      style={{
        width: '1800px',
        marginLeft: '-15',
        marginRight: '15',
        height: '1651px',
      }}
    >
      <div
        style={{
          width: '1400px',
          paddingLeft: '15px',
          paddingRight: '15px',
          height: '1651px',
        }}
      >
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
                    onClickImageHandler();
                    reset();
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
                  {
                    <img
                      src={imageClicked}
                      className="mainImage"
                      style={{ height: '320px', widows: '240px' }}
                    />
                  }
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
              {selectedItem.length > 0 ? (
                selectedItem
                  .map((item, idx) => <td key={idx}>{item}</td>)
                  .slice(0, 1)
              ) : (
                <td></td>
              )}
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
              {selectedItem.length > 0 ? (
                selectedItem
                  .map((item, idx) => <td key={idx}>{item}</td>)
                  .slice(1, 2)
              ) : (
                <td></td>
              )}
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
              {search.length > 0 ? (
                <td className="PRL">
                  {PRLmin} - {PRLmax}
                </td>
              ) : (
                <td></td>
              )}

              <td colSpan="2" className="price">
                {
                  search
                    .filter((item) => typeof item.price === 'number')
                    .map((item, idx) => (
                      <div key={idx}>PRICE: ${item.price}</div>
                    ))[0]
                }
              </td>

              <td>
                {selectedItem.map((item) => item).slice(1, 2) == ''
                  ? null
                  : selectedItem
                      .map((item, idx) => (
                        <div key={idx}>
                          {Math.floor(Difference_In_Days)} days
                        </div>
                      ))
                      .slice(1, 2)}
              </td>

              <td>{selectedItem.map((item) => item).slice(1, 2)}</td>

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
              <td className="cost"></td>
              {/* grading https://www.wane.com/news/sacs-approves-new-grading-scale/*/}
              <td>GRADE</td>
              {search
                .flatMap((item) => [item].concat(item.ranknonRB ?? []))
                .filter((item) => item.percentile)
                .map((item) => item.percentile * 100)[0] > 98 ||
              search
                .flatMap((item) => [item].concat(item.rankRB ?? []))
                .filter((item) => item.percentile)
                .map((item) => item.percentile * 100)[0] > 98 ? (
                <td style={{ background: '#90ee90', fontWeight: 'bold' }}>
                  A+
                </td>
              ) : search
                  .flatMap((item) => [item].concat(item.ranknonRB ?? []))
                  .filter((item) => item.percentile)
                  .map((item) => item.percentile * 100)[0] > 93 ||
                search
                  .flatMap((item) => [item].concat(item.rankRB ?? []))
                  .filter((item) => item.percentile)
                  .map((item) => item.percentile * 100)[0] > 93 ? (
                <td style={{ background: '#90ee90', fontWeight: 'bold' }}>A</td>
              ) : search
                  .flatMap((item) => [item].concat(item.ranknonRB ?? []))
                  .filter((item) => item.percentile)
                  .map((item) => item.percentile * 100)[0] > 90 ||
                search
                  .flatMap((item) => [item].concat(item.rankRB ?? []))
                  .filter((item) => item.percentile)
                  .map((item) => item.percentile * 100)[0] > 90 ? (
                <td style={{ background: '#90ee90', fontWeight: 'bold' }}>
                  A-
                </td>
              ) : search
                  .flatMap((item) => [item].concat(item.ranknonRB ?? []))
                  .filter((item) => item.percentile)
                  .map((item) => item.percentile * 100)[0] > 87 ||
                search
                  .flatMap((item) => [item].concat(item.rankRB ?? []))
                  .filter((item) => item.percentile)
                  .map((item) => item.percentile * 100)[0] > 87 ? (
                <td style={{ background: '#87cefa', fontWeight: 'bold' }}>
                  B+
                </td>
              ) : search
                  .flatMap((item) => [item].concat(item.ranknonRB ?? []))
                  .filter((item) => item.percentile)
                  .map((item) => item.percentile * 100)[0] > 83 ||
                search
                  .flatMap((item) => [item].concat(item.rankRB ?? []))
                  .filter((item) => item.percentile)
                  .map((item) => item.percentile * 100)[0] > 83 ? (
                <td style={{ background: '#87cefa', fontWeight: 'bold' }}>B</td>
              ) : search
                  .flatMap((item) => [item].concat(item.ranknonRB ?? []))
                  .filter((item) => item.percentile)
                  .map((item) => item.percentile * 100)[0] > 80 ||
                search
                  .flatMap((item) => [item].concat(item.rankRB ?? []))
                  .filter((item) => item.percentile)
                  .map((item) => item.percentile * 100)[0] > 80 ? (
                <td style={{ background: '#87cefa', fontWeight: 'bold' }}>
                  B-
                </td>
              ) : search
                  .flatMap((item) => [item].concat(item.ranknonRB ?? []))
                  .filter((item) => item.percentile)
                  .map((item) => item.percentile * 100)[0] > 77 ||
                search
                  .flatMap((item) => [item].concat(item.rankRB ?? []))
                  .filter((item) => item.percentile)
                  .map((item) => item.percentile * 100)[0] > 77 ? (
                <td style={{ background: '#ffa500', fontWeight: 'bold' }}>
                  C+
                </td>
              ) : search
                  .flatMap((item) => [item].concat(item.ranknonRB ?? []))
                  .filter((item) => item.percentile)
                  .map((item) => item.percentile * 100)[0] > 73 ||
                search
                  .flatMap((item) => [item].concat(item.rankRB ?? []))
                  .filter((item) => item.percentile)
                  .map((item) => item.percentile * 100)[0] > 73 ? (
                <td style={{ background: '#ffa500', fontWeight: 'bold' }}>C</td>
              ) : search
                  .flatMap((item) => [item].concat(item.ranknonRB ?? []))
                  .filter((item) => item.percentile)
                  .map((item) => item.percentile * 100)[0] > 70 ||
                search
                  .flatMap((item) => [item].concat(item.rankRB ?? []))
                  .filter((item) => item.percentile)
                  .map((item) => item.percentile * 100)[0] > 70 ? (
                <td style={{ background: '#ffa500', fontWeight: 'bold' }}>
                  C-
                </td>
              ) : search
                  .flatMap((item) => [item].concat(item.ranknonRB ?? []))
                  .filter((item) => item.percentile)
                  .map((item) => item.percentile * 100)[0] > 67 ||
                search
                  .flatMap((item) => [item].concat(item.rankRB ?? []))
                  .filter((item) => item.percentile)
                  .map((item) => item.percentile * 100)[0] > 67 ? (
                <td style={{ background: '#ff4500', fontWeight: 'bold' }}>
                  D+
                </td>
              ) : search
                  .flatMap((item) => [item].concat(item.ranknonRB ?? []))
                  .filter((item) => item.percentile)
                  .map((item) => item.percentile * 100)[0] > 63 ||
                search
                  .flatMap((item) => [item].concat(item.rankRB ?? []))
                  .filter((item) => item.percentile)
                  .map((item) => item.percentile * 100)[0] > 63 ? (
                <td style={{ background: '#ff4500', fontWeight: 'bold' }}>D</td>
              ) : search
                  .flatMap((item) => [item].concat(item.ranknonRB ?? []))
                  .filter((item) => item.percentile)
                  .map((item) => item.percentile * 100)[0] > 60 ||
                search
                  .flatMap((item) => [item].concat(item.rankRB ?? []))
                  .filter((item) => item.percentile)
                  .map((item) => item.percentile * 100)[0] > 60 ? (
                <td style={{ background: '#ff4500', fontWeight: 'bold' }}>
                  D-
                </td>
              ) : search.length > 0 ? (
                <td style={{ background: '#c0c0c0', fontWeight: 'bold' }}>F</td>
              ) : (
                <td></td>
              )}

              {/* waiting & rcvd table  */}
              {selectedItem.length > 0 ? (
                selectedItem.map((item) => item).slice(1, 2) == '' ? (
                  <td style={{ color: 'red' }}>WAITING</td>
                ) : (
                  <td style={{ color: 'green' }}>RCVD</td>
                )
              ) : (
                <td></td>
              )}

              <td id="recDte" className="recDateSel_cal">
                {new Date().toISOString().split('T')[0]}
              </td>
              <td colSpan="2">
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                />
              </td>
              <td className="prv30">
                {new Date().toISOString().split('T')[0]}
              </td>
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
              <td>CLRS:{totalItems}</td>
              <td>OH</td>
              {/*PO reorder */}
              <td style={{ background: '#f4a460' }}>REORDER(1yr)</td>
              <td>
                <div className="App">
                  <select name="item-selected" onChange={handleChange}>
                    {/*POS initial */}

                    <option
                      value={[
                        '',

                        '',

                        search.map((item) =>
                          item.first.length
                            ? item.first.map((item2) => item2.qtyord)
                            : null
                        ),
                      ]}
                    >
                      POS_
                    </option>

                    <option
                      value={[
                        search
                          .flatMap((item) => [item].concat(item.first ?? []))
                          .filter((item) => item.reqdate)
                          .map(
                            (item) =>
                              new Date(item.reqdate).toISOString().split('T')[0]
                          )[0],

                        search
                          .flatMap((item) => [item].concat(item.first ?? []))
                          .filter((item) => item.recdate)
                          .map(
                            (item) =>
                              new Date(item.recdate).toISOString().split('T')[0]
                          )[0],

                        search.map((item) =>
                          item.first.length
                            ? item.first.map((item2) => item2.qtyord)
                            : null
                        ),
                      ]}
                    >
                      {
                        search
                          .flatMap((item) => [item].concat(item.first ?? []))
                          .filter((item) => item.purno)
                          .map((item) => item.purno)[0]
                      }
                    </option>

                    <option
                      value={[
                        search
                          .flatMap((item) => [item].concat(item.second ?? []))
                          .filter((item) => item.reqdate)
                          .map(
                            (item) =>
                              new Date(item.reqdate).toISOString().split('T')[0]
                          )[0],

                        search
                          .flatMap((item) => [item].concat(item.second ?? []))
                          .filter((item) => item.recdate)
                          .map(
                            (item) =>
                              new Date(item.recdate).toISOString().split('T')[0]
                          )[0],

                        search.map((item) =>
                          item.second.length
                            ? item.second.map((item2) => item2.qtyord)
                            : null
                        ),
                      ]}
                    >
                      {
                        search
                          .flatMap((item) => [item].concat(item.second ?? []))
                          .filter((item) => item.purno)
                          .map((item) => item.purno)[0]
                      }
                    </option>

                    <option
                      value={[
                        search
                          .flatMap((item) => [item].concat(item.third ?? []))
                          .filter((item) => item.reqdate)
                          .map(
                            (item) =>
                              new Date(item.reqdate).toISOString().split('T')[0]
                          )[0],

                        search
                          .flatMap((item) => [item].concat(item.third ?? []))
                          .filter((item) => item.recdate)
                          .map(
                            (item) =>
                              new Date(item.recdate).toISOString().split('T')[0]
                          )[0],

                        search.map((item) =>
                          item.third.length
                            ? item.third.map((item2) => item2.qtyord)
                            : null
                        ),
                      ]}
                    >
                      {
                        search
                          .flatMap((item) => [item].concat(item.third ?? []))
                          .filter((item) => item.purno)
                          .map((item) => item.purno)[0]
                      }
                    </option>

                    <option
                      value={[
                        search
                          .flatMap((item) => [item].concat(item.fourth ?? []))
                          .filter((item) => item.reqdate)
                          .map(
                            (item) =>
                              new Date(item.reqdate).toISOString().split('T')[0]
                          )[0],

                        search
                          .flatMap((item) => [item].concat(item.fourth ?? []))
                          .filter((item) => item.recdate)
                          .map(
                            (item) =>
                              new Date(item.recdate).toISOString().split('T')[0]
                          )[0],

                        search.map((item) =>
                          item.fourth.length
                            ? item.fourth.map((item2) => item2.qtyord)
                            : null
                        ),
                      ]}
                    >
                      {
                        search
                          .flatMap((item) => [item].concat(item.fourth ?? []))
                          .filter((item) => item.purno)
                          .map((item) => item.purno)[0]
                      }
                    </option>

                    <option
                      value={[
                        search
                          .flatMap((item) => [item].concat(item.fifth ?? []))
                          .filter((item) => item.reqdate)
                          .map(
                            (item) =>
                              new Date(item.reqdate).toISOString().split('T')[0]
                          )[0],

                        search
                          .flatMap((item) => [item].concat(item.fifth ?? []))
                          .filter((item) => item.recdate)
                          .map(
                            (item) =>
                              new Date(item.recdate).toISOString().split('T')[0]
                          )[0],

                        search.map((item) =>
                          item.fifth.length
                            ? item.fifth.map((item2) => item2.qtyord)
                            : null
                        ),
                      ]}
                    >
                      {
                        search
                          .flatMap((item) => [item].concat(item.fifth ?? []))
                          .filter((item) => item.purno)
                          .map((item) => item.purno)[0]
                      }
                    </option>

                    <option
                      value={[
                        search
                          .flatMap((item) => [item].concat(item.sixth ?? []))
                          .filter((item) => item.reqdate)
                          .map(
                            (item) =>
                              new Date(item.reqdate).toISOString().split('T')[0]
                          )[0],

                        search
                          .flatMap((item) => [item].concat(item.sixth ?? []))
                          .filter((item) => item.recdate)
                          .map(
                            (item) =>
                              new Date(item.recdate).toISOString().split('T')[0]
                          )[0],

                        search.map((item) =>
                          item.sixth.length
                            ? item.sixth.map((item2) => item2.qtyord)
                            : null
                        ),
                      ]}
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

          {/* body table3 */}
          {search.length > 0 ? (
            loading === false ? (
              <tbody id="tt" className="buttomSearch">
                <td style={{ padding: '0' }}>
                  {search
                    .filter((item) => item.itemkey2)
                    .map((item, idx) => (
                      <div key={idx} style={{textAlign: 'left', color:'blue'}}>{item.itemkey2}</div>
                      
                    ))}                   
                </td>

                <td style={{ padding: '0' }}>
                  {search
                    .filter((item) => typeof item.onhand === 'number')
                    .map((item, idx) => (
                      <div key={idx}>{item.onhand}</div>
                    ))}
                </td>
                <td style={{ padding: '0' }}>
                  {search.map((item, idx) =>
                    item.poreorder.length ? (
                      item.poreorder.map((item2, idx2) => (
                        <div key={idx2}>{item2.total}</div>
                      ))
                    ) : (
                      <div key={idx}></div>
                    )
                  )}
                </td>

                {selectedItem.length > 0 ? (
                  <td style={{ padding: '0' }}>
                    {selectedItem
                      .map((item, idx) => <div key={idx}>{item}</div>)
                      .slice(2)}
                  </td>
                ) : (
                  <td style={{ padding: '0' }}>
                    {search.map((item, idx) =>
                      item.first.length ? (
                        item.first.map((item2, idx2) => (
                          <div key={idx2}>{item2.qtyord}</div>
                        ))
                      ) : (
                        <div key={idx}></div>
                      )
                    )}
                  </td>
                )}

                <td style={{ padding: '0' }}>
                  {search.map((item, idx) => (
                    <div key={idx}>{item.purno}</div>
                  ))}
                </td>
                <td style={{ padding: '0' }}>
                  {search
                    .filter((item) => typeof item.qtyshp === 'number')
                    .map((item, idx) => (
                      <div key={idx}>{item.qtyshp}</div>
                    ))}
                </td>
                <td style={{ padding: '0' }}>
                  <div></div>
                </td>

                {/*column table with nested array */}
                <td style={{ padding: '0' }}>
                  {search.map((item, idx) =>
                    item.sold30.length ? (
                      item.sold30.map((item2, idx2) => (
                        <div key={idx2}>{item2.qtyshp}</div>
                      ))
                    ) : (
                      <div key={idx}></div>
                    )
                  )}
                </td>

                <td style={{ padding: '0' }}>
                  {search
                    .filter((item) => typeof item.qtyshp === 'number')
                    .map((item, idx) => (
                      <div key={idx}>{item.qtyshp}</div>
                    ))}
                </td>

                <td style={{ padding: '0' }}>
                  {search
                    .filter((item) => typeof item.qtyshp === 'number')
                    .map((item, idx) => (
                      <div key={idx}>{item.qtyshp}</div>
                    ))}
                </td>
                {/*column table with nested array */}
                <td style={{ padding: '0' }}>
                  {search.map((item, idx) =>
                    item.sixth.length ? (
                      item.sixth.map((item2, idx2) => (
                        <div key={idx2}>{item2.qtyord}</div>
                      ))
                    ) : (
                      <div key={idx}></div>
                    )
                  )}
                </td>
                {/*column table with nested array */}
                <td style={{ padding: '0' }}>
                  {search.map((item, idx) =>
                    item.fifth.length ? (
                      item.fifth.map((item2, idx2) => (
                        <div key={idx2}>{item2.qtyord}</div>
                      ))
                    ) : (
                      <div key={idx}></div>
                    )
                  )}
                </td>
                {/*column table with nested array */}
                <td style={{ padding: '0' }}>
                  {search.map((item, idx) =>
                    item.fourth.length ? (
                      item.fourth.map((item2, idx2) => (
                        <div key={idx2}>{item2.qtyord}</div>
                      ))
                    ) : (
                      <div key={idx}></div>
                    )
                  )}
                </td>
                {/*column table with nested array */}
                <td style={{ padding: '0' }}>
                  {search.map((item, idx) =>
                    item.third.length ? (
                      item.third.map((item2, idx2) => (
                        <div key={idx2}>{item2.qtyord}</div>
                      ))
                    ) : (
                      <div key={idx}></div>
                    )
                  )}
                </td>
                {/*column table with nested array */}
                <td style={{ padding: '0' }}>
                  {search.map((item, idx) =>
                    item.second.length ? (
                      item.second.map((item2, idx2) => (
                        <div key={idx2}>{item2.qtyord}</div>
                      ))
                    ) : (
                      <div key={idx}></div>
                    )
                  )}
                </td>
                {/*column table with nested array */}
                <td style={{ padding: '0' }}>
                  {search.map((item, idx) =>
                    item.first.length ? (
                      item.first.map((item2, idx2) => (
                        <div key={idx2}>{item2.qtyord}</div>
                      ))
                    ) : (
                      <div key={idx}></div>
                    )
                  )}
                </td>
              </tbody>
            ) : (
              <>Loading...</>
            )
          ) : (
            <>
              <BlankPage />
            </>
          )}
        </table>
      </div>
    </div>
  );
};
