const API_BASE_URL = 'https://api.electricitymap.org/v3';

const getApiKey = () => {
  const apiKey = import.meta.env.VITE_ELECTRICITY_MAP_API_KEY;
  if (!apiKey) {
    throw new Error('API key not found in environment variables');
  }
  // Remove any whitespace and quotes that might have been accidentally included
  return apiKey.trim().replace(/['"]/g, '');
};

const createHeaders = (apiKey: string) => {
  return {
    'auth-token': apiKey,
    'Accept': 'application/json'
  };
};

export const fetchEnergyData = async (apiKey: string) => {
  const cleanApiKey = apiKey.trim().replace(/['"]/g, '');
  console.log('Starting API call with key:', cleanApiKey.substring(0, 4) + '...');
  
  const headers = createHeaders(cleanApiKey);
  console.log('Request headers:', headers);
  
  try {
    const response = await fetch(`${API_BASE_URL}/power-breakdown/PL`, {
      headers
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        error: errorData
      });
      throw new Error(errorData.error || 'Failed to fetch energy data');
    }

    const data = await response.json();
    console.log('API Response:', data);
    
    return {
      production: data.powerProductionBreakdown || {},
      carbonIntensity: data.carbonIntensity || 0,
      renewablePercentage: data.renewablePercentage || 0
    };
  } catch (error) {
    console.error('API Call Error:', error);
    throw error;
  }
};

export const fetchPowerData = async (lat: number, lon: number) => {
  const apiKey = getApiKey();
  const headers = createHeaders(apiKey);

  try {
    const response = await fetch(`${API_BASE_URL}/power-breakdown/PL?lat=${lat}&lon=${lon}`, {
      headers
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Power Data Error:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        error: errorData
      });
      throw new Error('Failed to fetch power data');
    }
    return response.json();
  } catch (error) {
    console.error('Power Data Fetch Error:', error);
    throw error;
  }
};

export const fetchPowerForecast = async (zoneId: string) => {
  const apiKey = getApiKey();
  const headers = createHeaders(apiKey);

  try {
    const response = await fetch(`${API_BASE_URL}/power-forecast/${zoneId}`, {
      headers
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Power Forecast Error:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        error: errorData
      });
      throw new Error('Failed to fetch power forecast');
    }
    return response.json();
  } catch (error) {
    console.error('Power Forecast Fetch Error:', error);
    throw error;
  }
};

export const fetchConsumptionForecast = async (lat: number, lon: number) => {
  const apiKey = getApiKey();
  const headers = createHeaders(apiKey);

  try {
    const response = await fetch(`${API_BASE_URL}/consumption-forecast?lat=${lat}&lon=${lon}`, {
      headers
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Consumption Forecast Error:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        error: errorData
      });
      throw new Error('Failed to fetch consumption forecast');
    }
    return response.json();
  } catch (error) {
    console.error('Consumption Forecast Fetch Error:', error);
    throw error;
  }
};