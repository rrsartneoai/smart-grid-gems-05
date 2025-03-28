
import React from 'react';
import { SensorData } from './types';
import { formatDistanceToNow } from 'date-fns';
import { pl } from 'date-fns/locale';

interface SensorCardsProps {
  sensorData: SensorData[];
}

export const SensorCards: React.FC<SensorCardsProps> = ({ sensorData }) => {
  // Helper function to get the latest reading for a sensor type
  const getLatestReading = (sensor: SensorData, type: string) => {
    const readings = sensor.readings[type as keyof typeof sensor.readings] || [];
    if (readings.length === 0) return null;
    
    // Sort by timestamp descending and get the first one (most recent)
    return [...readings].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())[0];
  };

  return (
    <div className="w-full space-y-2 p-4">
      {sensorData.map((sensor) => (
        <div 
          key={sensor.id}
          className="w-full bg-background/50 rounded-lg p-4 border border-border/50"
        >
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
              </div>
              <span className="font-medium">{sensor.name}</span>
              {sensor.lastSynced && (
                <span className="text-xs text-muted-foreground">
                  Ostatnia synchronizacja: {formatDistanceToNow(sensor.lastSynced, { addSuffix: true, locale: pl })}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className={`h-2 ${sensor.signalStrength > -70 ? 'w-5' : 'w-3'} bg-primary rounded-sm`}></div>
                <div className={`h-2 ${sensor.signalStrength > -60 ? 'w-5' : 'w-3'} bg-primary rounded-sm`}></div>
                <div className={`h-2 ${sensor.signalStrength > -50 ? 'w-5' : 'w-3'} bg-primary rounded-sm`}></div>
              </div>
              <span className="text-xs text-muted-foreground">{sensor.signalStrength} dBm</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mt-4">
            {['Temp', 'CO2', 'VOC', 'PM2.5', 'PM10', 'Humidity'].map((sensorType) => {
              const reading = getLatestReading(sensor, sensorType);
              if (!reading) return null;
              
              let unit = '';
              switch(sensorType) {
                case 'Temp': unit = '°C'; break;
                case 'CO2': unit = 'ppm'; break;
                case 'VOC': unit = 'ppb'; break;
                case 'PM2.5': unit = 'µg/m³'; break;
                case 'PM10': unit = 'µg/m³'; break;
                case 'Humidity': unit = '%'; break;
              }
              
              return (
                <div 
                  key={sensorType}
                  className="flex items-center p-2 rounded-lg border border-border/50"
                >
                  <div className="mr-2">
                    {getSensorIcon(sensorType)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">{reading.value.toFixed(1)}</span>
                      <span className="text-xs">{unit}</span>
                      <span className={`ml-1 text-xs px-1.5 py-0.5 rounded ${getStatusBadgeColor(reading.status)}`}>
                        {reading.status}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">{sensorType}</div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-3 flex justify-end">
            <button className="text-xs text-primary hover:underline">
              View more
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const getSensorIcon = (sensorType: string) => {
  switch(sensorType) {
    case 'Temp':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 14.76V3.5C14 2.12 12.88 1 11.5 1S9 2.12 9 3.5v11.26C7.19 15.47 6 17.12 6 19c0 3.31 2.69 6 6 6s6-2.69 6-6c0-1.88-1.19-3.53-3-4.24z" />
          <circle cx="12" cy="19" r="2" />
        </svg>
      );
    case 'CO2':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 22h20M12 2v7M12 13v4" />
          <path d="M5 8c0-3.31 3.13-6 7-6s7 2.69 7 6c0 3.31-3.13 6-7 6s-7-2.69-7-6z" />
          <path d="M9 17c-4.42 0-8 1.79-8 4h18c0-2.21-3.58-4-8-4h-2z" />
        </svg>
      );
    case 'VOC':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14.5 4C16.5 4 18 5.5 18 8c0 2-1 3.5-2 5l-6 7H7l5.5-7c-1-1-2.5-2.5-2.5-5C10 5.5 11.5 4 13.5 4z" />
          <path d="M13.5 8c0 .5-.5 1-1 1s-1-.5-1-1 .5-1 1-1 1 .5 1 1z" />
        </svg>
      );
    case 'PM2.5':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      );
    case 'PM10':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M7 10.3C7 9.91 7.34 9 8.4 9c.8 0 1.6.4 1.6 1.6 0 .53-.27 1.07-.8 1.4" />
          <path d="M10 14v-4" />
          <path d="M12 10h1.5c.83 0 1.5.67 1.5 1.5 0 .33 0 .5-.5.5" />
          <path d="M14 12h1c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5H14" />
        </svg>
      );
    case 'Humidity':
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0L12 2.69z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      );
  }
};

const getStatusBadgeColor = (status: string) => {
  switch(status) {
    case 'Good':
      return 'bg-green-500/10 text-green-500';
    case 'Fair':
      return 'bg-yellow-500/10 text-yellow-500';
    case 'Poor':
      return 'bg-red-500/10 text-red-500';
    default:
      return 'bg-gray-500/10 text-gray-500';
  }
};
