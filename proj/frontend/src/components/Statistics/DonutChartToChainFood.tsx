import { useEffect, useState } from "react";
import axios from "axios";
import DonutChart from "./DonutChart";
interface DonutData {
    name: string;
    value: number;
  }

interface DonutChartProps{
    foodChainID:number;
}

const DonutChartToChainFood = ({foodChainID}:DonutChartProps) => {
const [donutGraphData, setDonutGraphData] = useState<DonutData[]>([]);
           
    useEffect(() => {
        const fetchStats = async () => {
          try {
            const response = await axios.get(
              `http://localhost:8080/api/v1/foodchains/${foodChainID}/orders/statistics`
            );
            // console.log("Stats Data:", response.data);
    
            const formattedDonutData = Object.keys(response.data).map((menu) => {
              return {
                name: menu,
                value: response.data[menu].values.reduce((acc: number, val: number) => acc + val, 0)
              }
            });
    
            setDonutGraphData(formattedDonutData);
          } catch (err) {
            console.error("Error fetching Stats:", err);
          }
        };
    
        fetchStats();
      })

      const dataNames = [...new Set([...donutGraphData.map(item => item.name), ...donutGraphData.map(item => item.name)])];
      const colorMapping = dataNames.reduce<{ [key: string]: string }>((acc, name, index) => {
        acc[name] = `hsl(${(index * 360) / dataNames.length}, 70%, 50%)`;
        return acc;
      }, {});

    return ( <DonutChart data={donutGraphData} colorMapping={colorMapping} />)
}

export default DonutChartToChainFood;
