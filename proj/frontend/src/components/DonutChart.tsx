import {Tooltip, Legend, PieChart, Pie, Cell} from 'recharts';

const data = [
    { name: 'Chicken Nuggets', value: 32, color: '#FF0404' }, 
    { name: 'Big Mac', value: 44, color: '#0426FF' }, 
    { name: 'McVeggie', value: 16, color: '#FFAE00' }, 
    { name: 'Others', value: 8, color: '#22C55E' },       
  ];

function DonutChart() {
    return (
        <div className="flex flex-col items-center mt-4 mb-4">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h3 className="text-center mb-4 text-lg font-bold">Order Flow (Last Hour)</h3>
                <PieChart width={300} height={300}>
                    <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    fill="#8884d8"
                    label
                    >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                    </Pie>
                    <Tooltip />
                    <Legend layout="horizontal" align="center" verticalAlign="bottom" />
                </PieChart>
            </div>
        </div>
    );
};

export default DonutChart;