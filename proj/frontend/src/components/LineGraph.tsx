import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer} from 'recharts';

interface LineGraphData {
    name: string;
    BigMac: number;
    McChicken: number;
    CBO: number;
    HappyMeal: number;
}[]

interface LineGraphProps {
    data: LineGraphData[];
}

function LineGraph({data} : LineGraphProps) {
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