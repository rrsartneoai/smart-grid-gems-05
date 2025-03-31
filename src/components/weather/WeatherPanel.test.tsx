
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { WeatherPanel } from './WeatherPanel';
import { render } from '../../test/test-utils';
import { mockWeatherData, mockForecastData, mockAirQualityData } from '../../test/mocks/weatherServiceMock';

// Mock the React Query hooks
vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query');
  return {
    ...actual,
    useQuery: ({ queryKey }) => {
      if (queryKey[0] === 'weather') {
        return { 
          data: mockWeatherData, 
          isLoading: false, 
          error: null,
          refetch: vi.fn()
        };
      }
      if (queryKey[0] === 'forecast') {
        return { data: mockForecastData, isLoading: false, error: null };
      }
      if (queryKey[0] === 'airQuality') {
        return { data: mockAirQualityData, isLoading: false, error: null };
      }
      return { data: null, isLoading: false, error: null };
    }
  };
});

// Mock the toast
vi.mock('@/components/ui/use-toast', () => ({
  useToast: () => ({
    toast: vi.fn()
  })
}));

describe('WeatherPanel', () => {
  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();
    
    // Mock environment variables
    vi.stubEnv('VITE_OPENWEATHER_API_KEY', 'mock-api-key');
  });

  it('renders the weather panel with city selector', async () => {
    render(<WeatherPanel />);
    
    // Check if the title is rendered
    expect(screen.getByText(/weatherInPomerania/i)).toBeInTheDocument();
    
    // Check if the city selector is rendered
    const citySelector = screen.getByRole('combobox');
    expect(citySelector).toBeInTheDocument();
  });

  it('displays weather information when data is loaded', async () => {
    render(<WeatherPanel />);
    
    // Wait for the data to be displayed
    await waitFor(() => {
      // Temperature should be displayed
      expect(screen.getByText(/22°C/i)).toBeInTheDocument();
      
      // Weather description should be displayed
      expect(screen.getByText(/clear sky/i)).toBeInTheDocument();
    });
  });

  it('allows changing the city', async () => {
    const user = userEvent.setup();
    render(<WeatherPanel />);
    
    // Open city selector dropdown
    const citySelector = screen.getByRole('combobox');
    await user.click(citySelector);
    
    // Select Gdynia
    const gdyniaOption = screen.getByRole('option', { name: /Gdynia/i });
    await user.click(gdyniaOption);
    
    // Check if the city has changed (the city name isn't directly displayed in the UI,
    // but we can check if the component didn't crash)
    expect(screen.getByText(/weatherInPomerania/i)).toBeInTheDocument();
  });

  it('displays the forecast when data is loaded', async () => {
    render(<WeatherPanel />);
    
    // Wait for the forecast to be displayed
    await waitFor(() => {
      // Forecast title should be displayed
      expect(screen.getByText(/forecast/i)).toBeInTheDocument();
      
      // Tabs should be displayed
      expect(screen.getByRole('tab', { name: /hourlyForecast/i })).toBeInTheDocument();
      expect(screen.getByRole('tab', { name: /dailyForecast/i })).toBeInTheDocument();
    });
  });

  it('displays air quality information when data is loaded', async () => {
    render(<WeatherPanel />);
    
    // Wait for the air quality to be displayed
    await waitFor(() => {
      // Air quality title should be displayed
      expect(screen.getByText(/airQuality/i)).toBeInTheDocument();
      
      // Some pollutant should be displayed
      expect(screen.getByText(/PM2.5/i)).toBeInTheDocument();
    });
  });
});
