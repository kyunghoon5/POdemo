import { useEffect } from 'react';
import axios from 'axios';
import '../tableAll.css';

import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  ComposedChart,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
const BASE_URL = import.meta.env.VITE_DB_URL;
const Row1 = ({
  record,
  setRecord,
  suggest,
  setSuggest,
  filteredData,
  handleKeyPress,
  setfilteredDate,
  handleButton,
  mainImg,
  graphDropdownSelectedYear,
  graphLoading,
  graphAllYearData,
  monthLine,
  monthLinePrv,
  pieChart,
  COLORS,
  maxVal,
}) => {
  const itemDataAPI = async () => {
    return await axios
      .get(`${BASE_URL}searchAuto`)
      .then((response) => setSuggest(response.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    itemDataAPI();
  }, []);

  const onSearch = (record1) => {
    setRecord(record1); // set the input value to the clicked suggestion
    setfilteredDate([]);
  };

  const handleitemDataFilter = (e) => {
    const searchWord = e.target.value;
    setRecord(searchWord);
    const newFilter = suggest.filter((value) => {
      return value.descrip.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === '') {
      setfilteredDate([]);
    } else {
      setfilteredDate(newFilter);
    }
  };
  return (
    <tr className="row1">
      <td className="infoCol1" style={{ textAlign: 'left' }}>
        ITEM:
      </td>
      <td className="nameSection" colSpan="2">
        <input
          className=" border border-zinc-500 "
          id="search"
          placeholder="Search item name here"
          type="text"
          value={record}
          onChange={handleitemDataFilter}
          autoComplete="off"
          onKeyPress={handleKeyPress}
        />
        <>
          {filteredData.length !== 0 && (
            <span className="dataResult absolute">
              {filteredData.slice(0, 15).map((item, idx) => (
                <span
                  key={idx}
                  className="dropdown-row"
                  onClick={() => {
                    onSearch(item.descrip);
                  }}
                >
                  {item.descrip}
                </span>
              ))}
            </span>
          )}
        </>
      </td>
      <td className="btn1">
        <button
          onClick={() => {
            handleButton();
          }}
          className="btn1name"
        >
          SUBMIT
        </button>
      </td>
      <td colSpan="3" rowSpan="10" className="prodImg ">
        <span>
          {
            // eslint-disable-next-line jsx-a11y/alt-text
            <img
              style={{ width: '250px', height: '320px' }}
              src={mainImg}
              className="mainImage  "
            />
          }
        </span>
      </td>

      <td
        colSpan="9"
        rowSpan="6"
        style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '200px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '70%',
            height: '100%',
          }}
        >
          {graphDropdownSelectedYear.length ? (
            graphLoading === false ? (
              graphDropdownSelectedYear.length ? (
                graphDropdownSelectedYear === 'YEAR' ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      width={500}
                      height={300}
                      data={graphAllYearData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        name="PO rec"
                        data={graphAllYearData}
                        barSize={4}
                        fill="#ffb366"
                        dataKey="qtyrec"
                      />

                      <Line
                        type="monotone"
                        dataKey="qtyshp"
                        strokeWidth={3}
                        stroke="#82ca9d"
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart
                      data={monthLine}
                      width={500}
                      height={300}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" allowDuplicatedCategory={false} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        name="PO rec"
                        data={monthLine}
                        barSize={4}
                        fill="#ffb366"
                        dataKey="qtyrec"
                      />
                      <Line
                        name={Number(graphDropdownSelectedYear)}
                        data={monthLine}
                        type="monotone"
                        dataKey="qtyshp"
                        strokeWidth={3}
                        stroke="#82ca9d"
                      />
                      {monthLinePrv.some((entry) => entry.qtyshp) ? (
                        <Line
                          name={Number(graphDropdownSelectedYear) - 1}
                          data={monthLinePrv}
                          type="monotone"
                          dataKey="qtyshp"
                          strokeWidth={3}
                          stroke="#8884d8"
                        />
                      ) : null}
                    </ComposedChart>
                  </ResponsiveContainer>
                )
              ) : (
                <td></td>
              )
            ) : (
              <td>Loading...</td>
            )
          ) : graphLoading === false ? (
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                width={500}
                height={300}
                data={graphAllYearData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  name="PO rec"
                  data={graphAllYearData}
                  barSize={4}
                  fill="#ffb366"
                  dataKey="qtyrec"
                />
                <Line
                  type="monotone"
                  dataKey="qtyshp"
                  strokeWidth={3}
                  stroke="#82ca9d"
                />
              </ComposedChart>
            </ResponsiveContainer>
          ) : (
            <>Loading...</>
          )}
        </div>
        <div
          style={{
            position: 'absolute',

            width: '30%',
            height: '100%',

            right: '1px',
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Pie
                data={pieChart}
                dataKey="qtyshp"
                nameKey="quarter"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                labelLine={false}
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  value,
                  index,
                  payload,
                }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = 25 + innerRadius + (outerRadius - innerRadius);
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);
                  const percent = `${(
                    (value / pieChart.reduce((a, b) => a + b.qtyshp, 0)) *
                    100
                  ).toFixed(0)}%`;
                  const quarter = payload.quarter;
                  return (
                    <text
                      x={x}
                      y={y}
                      fill={COLORS[index % COLORS.length]}
                      textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central"
                    >
                      <tspan dx={x > cx ? -31 : 30} dy={3}>
                        {quarter}Q({percent})
                      </tspan>
                    </text>
                  );
                }}
              >
                {pieChart.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.qtyshp === maxVal
                        ? '#FF0000'
                        : COLORS[index % COLORS.length]
                    }
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [value, 'qtyshp']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </td>
    </tr>
  );
};

export default Row1;
