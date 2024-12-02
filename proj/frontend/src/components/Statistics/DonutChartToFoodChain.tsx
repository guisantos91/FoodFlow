import { useEffect, useState } from "react";
import DonutChart from "./DonutChart";
import { getOrdersStatisticsById } from "../../api/apiFoodChain";
interface DonutData {
    name: string;
    value: number;
  }

interface DonutChartProps{
    foodChainID:number;
}

const DonutChartToFoodChain = ({foodChainID}:DonutChartProps) => {
const [donutGraphData, setDonutGraphData] = useState<DonutData[]>([]);
           
    useEffect(() => {
        const fetchStats = async () => {
          try {
            const response = getOrdersStatisticsById(foodChainID);
            // console.log("Stats Data:", response.data);
    
            const formattedDonutData = Object.keys(response).map((menu) => {
              return {
                name: menu,
                value: (response as any)[menu].values.reduce((acc: number, val: number) => acc + val, 0)
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

export default DonutChartToFoodChain;
