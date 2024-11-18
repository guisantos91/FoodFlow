import Layout from "./Layout";
import { useState } from 'react';
import Map from './Map.tsx';

interface FoodChain {
    id: number;
    name: string;
}
interface Restaurante{
    id:number;
    name: string;

}

const foodChain:FoodChain={id:1,name:"Mc Donalds"}
const restaurantes:Restaurante[]=[]
const ChainFoodPage = () => {
    const [zoomLevel, setZoomLevel] = useState(13);
    
    return (
        <Layout>
            <div>
                <h1>Hello MC.</h1>
            </div>
            <div>
        Zoom level: {zoomLevel}x
        <button onClick={() => setZoomLevel((zoomLevel<19?zoomLevel + 1:zoomLevel))}>+</button>
        <button onClick={() => setZoomLevel(zoomLevel - 1)}>-</button>
        <hr />
        <Map zoomLevel={zoomLevel} markers={[
    { lat: 40.7128, lng: -74.0060, label: 'Nova York' },
    { lat: 34.0522, lng: -118.2437, label: 'Los Angeles' },
  ]}/>
            </div>
        </Layout>
    );
};

export default ChainFoodPage;