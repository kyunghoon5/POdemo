import { MdOutlineClose } from 'react-icons/md';
import React, { useState } from 'react';
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
} from 'recharts';

import { sum } from 'lodash';

const ColorTab = ({
  setIsOpen,
  isOpen,
  eachItemGraph,
  eachItemGraphMonth,
  graphLoading2,
  mainData,
}) => {
  const [value3, setValue3] = useState('');
  const handleChangeitemByMonth = (e) => {
    const selectedMonth = e.target.value;
    setValue3(selectedMonth); // update the value of value2
  };

  const monthItemLine = eachItemGraphMonth.filter(
    (item) => item.year === Number(value3)
  );

  const eachgraphYearlyTotal = sum(eachItemGraph.map((item) => item.qtyshp));

  const eachgraphMonthlyTotal = sum(monthItemLine.map((item) => item.qtyshp));

  return (
    <div className="flex flex-col  bg-gray-200 text-black w-[600px] border-none ">
      <div className="flex flex-col  items-end">
        <MdOutlineClose
          onClick={() => setIsOpen(!isOpen)}
          className=" top-0 right-0 h-8 w-8 ..."
        />
      </div>
      <div>{eachItemGraph.map((item) => <div>{item.descrip}</div>)[0]}</div>
      <div>{eachItemGraph.map((item) => <div>{item.itemkey2}</div>)[0]}</div>

      <div className=" items-center ">
        {value3.length ? (
          graphLoading2 === false ? (
            value3.length ? (
              value3 === 'YEAR' ? (
                <ResponsiveContainer width="99%" aspect={3}>
                  <ComposedChart
                    data={eachItemGraph}
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
                      data={eachItemGraph}
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
                <ResponsiveContainer width="99%" aspect={3}>
                  <ComposedChart
                    data={monthItemLine}
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
                      data={monthItemLine}
                      barSize={4}
                      fill="#ffb366"
                      dataKey="qtyrec"
                    />

                    <Line
                      name={Number(value3)}
                      data={monthItemLine}
                      type="monotone"
                      dataKey="qtyshp"
                      strokeWidth={3}
                      stroke="#82ca9d"
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              )
            ) : (
              <td></td>
            )
          ) : (
            <td>Loading...</td>
          )
        ) : graphLoading2 === false ? (
          <ResponsiveContainer width="99%" aspect={3}>
            <ComposedChart
              data={eachItemGraph}
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
                data={eachItemGraph}
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
      <div>
        <select
          onChange={(e) => {
            handleChangeitemByMonth(e);
          }}
          className=" border border-zinc-500 "
        >
          <option>YEAR</option>
          {eachItemGraph.map((item2, idx) => (
            <option key={idx}>{item2.year} </option>
          ))}
        </select>
        TOTAL:{' '}
        {mainData.length ? (
          value3.length ? (
            graphLoading2 === false ? (
              value3.length ? (
                value3 === 'YEAR' ? (
                  eachgraphYearlyTotal
                ) : (
                  eachgraphMonthlyTotal
                )
              ) : (
                <></>
              )
            ) : (
              <>Loading...</>
            )
          ) : graphLoading2 === false ? (
            <>{eachgraphYearlyTotal}</>
          ) : (
            <>Loading...</>
          )
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default ColorTab;
