import { MdOutlineClose } from 'react-icons/md';

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



const ColorTab = ({ setIsOpen, isOpen,graphLine }) => {
  return (
    <div className="flex justify-start items-center bg-gray-200 text-black w-[500px] border-none">
      <div className="" onClick={() => setIsOpen(!isOpen)}>
        <MdOutlineClose className="absolute top-0 right-0 h-8 w-8 ..." />
      </div>
      <div className="flex justify-start items-center bg-gray-200 text-black h-[600px] border-none"></div>
      <div className="flex justify-start items-center bg-gray-200 text-black w-[500px] border-none">
        {
          <ResponsiveContainer width="99%" aspect={3}>
            <ComposedChart
              data={graphLine}
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
                data={graphLine}
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
        }
      </div>
    </div>
  );
};

export default ColorTab;
