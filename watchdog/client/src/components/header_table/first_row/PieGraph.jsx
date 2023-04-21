import React from 'react';
import {
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const PieGraph = ({ pieChart, maxVal, COLORS }) => {
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
  );
};

export default PieGraph;
