import React, { useCallback, useState, useEffect } from 'react';
import {

  ResponsiveContainer,
  PieChart,
  Pie,
 
  Sector,
} from 'recharts';

const renderActiveShape = (props, pieChart, COLORS) => {

  const {
    cx,
    cy,
 
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sortedPieChart = pieChart.sort((a, b) => b.qtyshp - a.qtyshp);
  const maxQtyshpData = sortedPieChart[0];
  const isMaxQtyshp = maxQtyshpData.quarter === payload.quarter;
  const activeFill = isMaxQtyshp ? COLORS[0] : fill;

  return (
    <g>
      <text x={cx} y={cy} dy={-1} textAnchor="middle" fill={fill}>
        {`${payload.quarter}Q`}
        <tspan x={cx} y={cy + 20} fill="#333">{`qtyshp: ${value}`}</tspan>
        <tspan x={cx} y={cy + 40} fill="#999">{`(Rate ${(percent * 100).toFixed(
          2
        )}%)`}</tspan>
      </text>

      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={activeFill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={activeFill}
      />
    </g>
  );
};

const PieGraph = ({ pieChart,  COLORS, mainData }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const onPieEnter = useCallback(
    (_, index) => {
      setActiveIndex(index);
    },
    [setActiveIndex]
  );

  useEffect(() => {
    setActiveIndex(0);
  }, [mainData]);

  return (
    <div
      style={{
        position: 'absolute',
        width: '30%',
        height: '100%',
        right: '1px',
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={200}>
          <Pie
            activeShape={(props) => renderActiveShape(props, pieChart, COLORS)}
            data={pieChart}
            cx={100}
            cy={100}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            dataKey="qtyshp"
            onMouseEnter={onPieEnter}
            activeIndex={activeIndex}
          />
          {/* <Legend /> */}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieGraph;
