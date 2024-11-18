import {Tooltip, Legend, PieChart, Pie, Cell} from 'recharts';

interface DonutChartData {
    name: string;
    value: number;
}[]

interface DonutChartProps {
    data: DonutChartData[];
}

const colorMapping: { [key: string]: string } = {
    "Big Mac": '#FFAE00',
    CBO: '#FF0404',
    "Happy Meal": '#22C55E',
};

function DonutChart({ data }: DonutChartProps) {
    const totalValue = data.reduce((acc, item) => acc + item.value, 0);
    console.log("Total Value:", totalValue);

    const dataWithPercentage = data.map((item) => ({
        ...item,
        percentage: ((item.value / totalValue) * 100).toFixed(2),
    }));

    console.log("Donut Chart Data:", data);
    console.log("Donut Chart Data with Percentage:", dataWithPercentage);

    return (
        <div className="flex flex-col items-center mt-4 mb-4">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                <h3 className="text-center text-lg font-bold">Order Flow (Last Hour)</h3>
                <PieChart width={300} height={300}>
                    <Pie
                        data={dataWithPercentage}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={100}
                        fill="#8884d8"
                        label
                    >
                        {dataWithPercentage.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colorMapping[entry.name] || '#8884d8'} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend layout="horizontal" align="center" verticalAlign="bottom" />
                </PieChart>
            </div>
        </div>
    );
}

export default DonutChart;