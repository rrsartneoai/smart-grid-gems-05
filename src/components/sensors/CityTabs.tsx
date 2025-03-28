
import React from 'react';
import { sensorsData } from './SensorsData';

interface CityTabsProps {
  cities: string[];
  selectedCity: string;
  onCitySelect: (cityId: string) => void;
}

export function CityTabs({ cities, selectedCity, onCitySelect }: CityTabsProps) {
  // Map city names to IDs (keys in sensorsData)
  const getCityIdFromName = (cityName: string): string => {
    const entry = Object.entries(sensorsData).find(([_, value]) => value.name === cityName);
    return entry ? entry[0] : '';
  };

  return (
    <div className="flex overflow-auto border-b mb-4">
      <div className="flex-1 grid grid-flow-col auto-cols-fr">
        {cities.map((city, index) => {
          const cityId = getCityIdFromName(city);
          const isActive = cityId === selectedCity;
          
          return (
            <button
              key={cityId || index}
              onClick={() => onCitySelect(cityId)}
              className={`
                relative flex-1 px-3 py-1.5 text-sm whitespace-nowrap
                ${isActive 
                  ? 'text-primary font-medium border-b-2 border-primary' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors'}
              `}
            >
              {city}
            </button>
          );
        })}
      </div>
    </div>
  );
}
