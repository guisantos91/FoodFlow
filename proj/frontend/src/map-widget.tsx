import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';

export class MapWidget {
  private map: L.Map;

  constructor(domNode: HTMLElement) {
    this.map = L.map(domNode, {
      zoomControl: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      scrollWheelZoom: false,
      zoomAnimation: false,
      touchZoom: false,
      zoomSnap: 0.1
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    L.marker([40.63666, -8.65285]).addTo(this.map)
    .bindPopup('A pretty CSS popup.<br> Easily customizable.');

    this.map.setView([40.63666, -8.65285], 0);
  }

  setZoom(level: number): void {
    this.map.setZoom(level);
  }
}

