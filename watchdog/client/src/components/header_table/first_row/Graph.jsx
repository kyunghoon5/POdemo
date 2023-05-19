import React, { useState, useEffect } from 'react';
//hard coding
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
  BarChart,
  Cell,
} from 'recharts';

const Graph = ({
  graphDropdownSelectedYear,
  graphLoading,
  graphAllYearData,
  monthLine,
  monthLinePrv,
  mainData,
}) => {
 

  return (
    <div
      className="pt-3"
      style={{
        position: 'absolute',
        width: '70%',
        height: '100%',
      }}
    >
      {mainData.length ? (
        graphDropdownSelectedYear.length ? (
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
                    >
                      {graphAllYearData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            entry.qtyrec > entry.qtyshp ? '#ff0000' : '#ffb366'
                          }
                        />
                      ))}
                    </Bar>
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
                    >
                      {monthLine.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            entry.qtyrec > entry.qtyshp ? '#ff0000' : '#ffb366'
                          }
                        />
                      ))}
                    </Bar>
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
              <></>
            )
          ) : (
            <>Loading...</>
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
              >
                {graphAllYearData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.qtyrec > entry.qtyshp ? '#ff0000' : '#ffb366'}
                  />
                ))}
              </Bar>
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
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default Graph;
