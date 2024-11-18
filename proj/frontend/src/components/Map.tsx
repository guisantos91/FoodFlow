import { useRef, useEffect } from "react";
import { MapWidget } from "./map-widget";

interface Marker {
  lat: number;
  lon: number;
  label?: string;
}

interface MapProps {
  zoomLevel: number;
  markers: Marker[];
}

export default function Map({ zoomLevel, markers }: MapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MapWidget | null>(null);

  useEffect(() => {
    if (containerRef.current && mapRef.current === null) {
      mapRef.current = new MapWidget(containerRef.current);
      mapRef.current.locateUser();
    }

    if (mapRef.current) {
      mapRef.current.setZoom(zoomLevel);

      if (markers) {
        markers.forEach((marker) => {
          mapRef.current?.addMarker(marker.lat, marker.lon, marker.label);
        });
      }
    }
  }, [zoomLevel, markers]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "120vh",
          height: "100%",
        }}
        ref={containerRef}
      />
    </div>
  );
}
