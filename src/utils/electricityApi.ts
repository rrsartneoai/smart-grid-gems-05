import { PowerData, PowerForecast, ConsumptionForecast } from '@/types/electricity';

const API_BASE_URL = 'https://api.electricitymap.org/v3';

export const fetchEnergyData = async (apiKey: string) => {
  console.log('Fetching energy data with API key:', apiKey.substring(0, 4) + '...');
  
  const response = await fetch(`${API_BASE_URL}/power-breakdown/PL`, {
    headers: {
      'auth-token': apiKey,
      'Accept': 'application/json'
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('API Error Response:', errorData);
    throw new Error(errorData.error || 'Failed to fetch energy data');
  }

  const data = await response.json();
  return {
    production: data.powerProductionBreakdown || {},
    carbonIntensity: data.carbonIntensity || 0,
    renewablePercentage: data.renewablePercentage || 0
  };
};

export const fetchPowerData = async (lat: number, lon: number): Promise<PowerData> => {
  const apiKey = localStorage.getItem('ELECTRICITY_MAPS_API_KEY');
  if (!apiKey) throw new Error('API key not found');

  const response = await fetch(`${API_BASE_URL}/power-breakdown/PL?lat=${lat}&lon=${lon}`, {
    headers: {
      'auth-token': apiKey,
      'Accept': 'application/json'
    }
  });

  if (!response.ok) throw new Error('Failed to fetch power data');
  return response.json();
};

export const fetchPowerForecast = async (zoneId: string): Promise<PowerForecast> => {
  const apiKey = localStorage.getItem('ELECTRICITY_MAPS_API_KEY');
  if (!apiKey) throw new Error('API key not found');

  const response = await fetch(`${API_BASE_URL}/power-forecast/${zoneId}`, {
    headers: {
      'auth-token': apiKey,
      'Accept': 'application/json'
    }
  });

  if (!response.ok) throw new Error('Failed to fetch power forecast');
  return response.json();
};

export const fetchConsumptionForecast = async (lat: number, lon: number): Promise<ConsumptionForecast> => {
  const apiKey = localStorage.getItem('ELECTRICITY_MAPS_API_KEY');
  if (!apiKey) throw new Error('API key not found');

  const response = await fetch(`${API_BASE_URL}/consumption-forecast?lat=${lat}&lon=${lon}`, {
    headers: {
      'auth-token': apiKey,
      'Accept': 'application/json'
    }
  });

  if (!response.ok) throw new Error('Failed to fetch consumption forecast');
  return response.json();
};