import { useRef, useEffect } from 'react';
import { MapWidget } from './map-widget';

interface MapProps {
  zoomLevel: number; 
}

export default function Map({ zoomLevel }: MapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapWidget | null>(null);

  useEffect(() => {
    if (containerRef.current && mapRef.current === null) {
      mapRef.current = new MapWidget(containerRef.current);
    }

    if (mapRef.current) {
      mapRef.current.setZoom(zoomLevel);
    }
  }, [zoomLevel]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60vh',
        width: '100%',
      }}
    >
      <div
        style={{
          width: '120vh',
          height: '100%',
        }}
        ref={containerRef}
      />
    </div>
  );
}
