import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer} from 'recharts';

interface LineGraphData {
    name: string;
    values: number[];
}[]

interface LineGraphProps {
    data: LineGraphData[];
}

const colorMapping: { [key: string]: string } = {
    "Big Mac": '#FFAE00',
    CBO: '#FF0404',
    "Happy Meal": '#22C55E',
};

function LineGraph({ data }: LineGraphProps) {
    const transformedData = data[0]?.values.map((_, index) => {
        const point: { [key: string]: number | string } = { name: `Minute ${index + 1}` };
        data.forEach((item) => {
            point[item.name] = item.values[index];
        });
        return point;
    });

    return (
        <div className="flex flex-col items-center">
            <ResponsiveContainer width="80%" height={400}>
                <LineChart data={transformedData}>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {data.map((item) => (
                        <Line key={item.name} type="monotone" dataKey={item.name} stroke={colorMapping[item.name]}/>
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default LineGraph;