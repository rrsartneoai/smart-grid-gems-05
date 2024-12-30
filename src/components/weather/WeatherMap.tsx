import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export const WeatherMap = () => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;

    // Initialize map centered on Poland
    mapRef.current = L.map(mapContainer.current).setView([52.0689, 19.4803], 6);

    // Add OpenStreetMap base layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(mapRef.current);

    // Add OpenWeatherMap precipitation layer
    const precipitationLayer = L.tileLayer(
      'https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=' + import.meta.env.VITE_OPENWEATHER_API_KEY,
      {
        attribution: '© OpenWeatherMap',
        maxZoom: 18,
        opacity: 0.6
      }
    ).addTo(mapRef.current);

    // Add temperature layer
    const temperatureLayer = L.tileLayer(
      'https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=' + import.meta.env.VITE_OPENWEATHER_API_KEY,
      {
        attribution: '© OpenWeatherMap',
        maxZoom: 18,
        opacity: 0.5
      }
    );

    // Add layer control
    const baseMaps = {
      "OpenStreetMap": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'),
    };

    const overlayMaps = {
      "Opady": precipitationLayer,
      "Temperatura": temperatureLayer
    };

    new L.Control.Layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(mapRef.current);

    // Add legend
    const legend = new L.Control({ position: 'bottomright' });
    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'info legend');
      div.innerHTML = `
        <div class="bg-background/95 p-4 rounded-lg shadow-lg space-y-2">
          <h4 class="font-semibold">Legenda</h4>
          <div class="space-y-1">
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 rounded bg-[#FEF9CA]"></div>
              <span>Brak opadów</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 rounded bg-[#B9F7A8]"></div>
              <span>Słabe opady</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 rounded bg-[#204E11]"></div>
              <span>Umiarkowane opady</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="w-4 h-4 rounded bg-[#F2A33A]"></div>
              <span>Silne opady</span>
            </div>
          </div>
        </div>
      `;
      return div;
    };
    legend.addTo(mapRef.current);

    // Add zoom controls
    new L.Control.Zoom({
      position: 'topright'
    }).addTo(mapRef.current);

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden border">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};