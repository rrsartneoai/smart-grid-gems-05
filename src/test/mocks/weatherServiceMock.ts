
import { vi } from 'vitest';

// Mock weather data
export const mockWeatherData = {
  coord: { lon: 18.6466, lat: 54.352 },
  weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
  base: 'stations',
  main: {
    temp: 22.5,
    feels_like: 21.8,
    temp_min: 20.2,
    temp_max: 23.9,
    pressure: 1015,
    humidity: 55
  },
  visibility: 10000,
  wind: { speed: 4.12, deg: 280 },
  clouds: { all: 0 },
  dt: 1628427600,
  sys: {
    type: 1,
    id: 1696,
    country: 'PL',
    sunrise: 1628396400,
    sunset: 1628450400
  },
  timezone: 7200,
  id: 3099434,
  name: 'Gdańsk',
  cod: 200
};

// Mock forecast data
export const mockForecastData = {
  cod: '200',
  message: 0,
  cnt: 40,
  list: [
    {
      dt: 1628427600,
      main: {
        temp: 22.5,
        feels_like: 21.8,
        temp_min: 20.2,
        temp_max: 23.9,
        pressure: 1015,
        humidity: 55
      },
      weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
      clouds: { all: 0 },
      wind: { speed: 4.12, deg: 280 },
      visibility: 10000,
      pop: 0,
      sys: { pod: 'd' },
      dt_txt: '2021-08-08 12:00:00'
    },
    // Add more forecast items as needed
  ],
  city: {
    id: 3099434,
    name: 'Gdańsk',
    coord: { lat: 54.352, lon: 18.6466 },
    country: 'PL',
    timezone: 7200,
    sunrise: 1628396400,
    sunset: 1628450400
  }
};

// Mock air quality data
export const mockAirQualityData = {
  list: [
    {
      main: { aqi: 2 },
      components: {
        co: 201.94,
        no: 0.89,
        no2: 5.16,
        o3: 73.67,
        so2: 1.74,
        pm2_5: 4.81,
        pm10: 7.25,
        nh3: 0.51
      },
      dt: 1628427600
    }
  ]
};

// Create weather service mock
export const weatherServiceMock = {
  fetchWeather: vi.fn().mockResolvedValue(mockWeatherData),
  fetchForecast: vi.fn().mockResolvedValue(mockForecastData),
  fetchAirQuality: vi.fn().mockResolvedValue(mockAirQualityData)
};

export default weatherServiceMock;
