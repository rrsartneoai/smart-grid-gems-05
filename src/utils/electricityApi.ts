import { toast } from "@/components/ui/use-toast";

export const testElectricityMapApi = async (apiKey: string) => {
  console.log('Testing API call with key:', apiKey.substring(0, 4) + '...');
  
  try {
    const response = await fetch('https://api.electricitymap.org/v3/power-breakdown/PL', {
      headers: {
        'auth-token': apiKey,
        'Accept': 'application/json'
      }
    });
    
    console.log('API Response status:', response.status);
    console.log('API Response headers:', Object.fromEntries(response.headers.entries()));
    
    const data = await response.json();
    console.log('API Response data:', data);
    
    return { status: response.status, data };
  } catch (error) {
    console.error('API Test Error:', error);
    return { status: 'error', error };
  }
};

export const fetchEnergyData = async (apiKey: string) => {
  if (!apiKey) {
    console.error('API key is missing');
    throw new Error('API key is not configured');
  }

  // Test API call first
  const testResult = await testElectricityMapApi(apiKey);
  if (testResult.status !== 200) {
    console.error('API test failed:', testResult);
    throw new Error('API test failed');
  }

  const response = await fetch('https://api.electricitymap.org/v3/power-breakdown/PL', {
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

  return response.json();
};