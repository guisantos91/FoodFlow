import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
import userIcon from './assets/images/icons/marker-icon.png';
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

for (let index = 0; index < 3; index++) {
      const customIcon = L.icon({
      iconUrl: userIcon,
      iconSize: [32, 52], // Adjust size [width, height]
      iconAnchor: [16, 32], // Anchor point [x, y]
      popupAnchor: [0, -32], // Popup position relative to icon
    });

    L.marker([40.63666+Math.random()*0.01, -8.65285+Math.random()*0.01],{icon: customIcon}).addTo(this.map)
    .bindPopup('A pretty CSS popup.<br> Easily customizable.');
}



    this.map.setView([40.63666, -8.65285], 0);
  }

  setZoom(level: number): void {
    this.map.setZoom(level);
  }
}

