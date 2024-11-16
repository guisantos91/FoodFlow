import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer} from 'recharts';

const data = [
    { name: 'Sep 25', BigMac: 413, McChicken: 221, CBO: 279, HappyMeal: 125 },
    { name: 'Sep 30', BigMac: 344, McChicken: 209, CBO: 137, HappyMeal: 289 },
    { name: 'Oct 5', BigMac: 487, McChicken: 327, CBO: 182, HappyMeal: 256 },
    { name: 'Oct 10', BigMac: 563, McChicken: 447, CBO: 334, HappyMeal: 223 },
  ];

function LineGraph() {
    return (
        <div className="flex flex-col items-center">
            <ResponsiveContainer width="80%" height={400}>
                <LineChart data={data}>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="BigMac" stroke="#FFAE00" />
                    <Line type="monotone" dataKey="McChicken" stroke="#0426FF" />
                    <Line type="monotone" dataKey="CBO" stroke="#FF0404" />
                    <Line type="monotone" dataKey="HappyMeal" stroke="#22C55E" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}; 

export default LineGraph;