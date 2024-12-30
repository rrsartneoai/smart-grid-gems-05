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
    L.tileLayer(
      'https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=' + import.meta.env.VITE_OPENWEATHER_API_KEY,
      {
        attribution: '© OpenWeatherMap',
        maxZoom: 18,
        opacity: 0.6
      }
    ).addTo(mapRef.current);

    // Add zoom and move event listeners for debugging
    mapRef.current.on('zoomend', () => {
      console.log('Current zoom level:', mapRef.current?.getZoom());
    });

    mapRef.current.on('moveend', () => {
      const center = mapRef.current?.getCenter();
      console.log('Current center coordinates:', center?.lat, center?.lng);
    });

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