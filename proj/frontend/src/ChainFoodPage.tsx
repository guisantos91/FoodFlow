import Layout from "./Layout";
import { useState } from 'react';
import Map from './Map.tsx';

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
        <Map zoomLevel={zoomLevel} />
            </div>
        </Layout>
    );
};

export default ChainFoodPage;