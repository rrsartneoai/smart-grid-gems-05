
import { describe, it, expect, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../../test/test-utils';
import { VisualizationContent } from './VisualizationContent';

// Mock sensor data that correctly implements the SensorData interface
const mockSensorData = [
  {
    id: 'sensor1',
    name: 'Temperature Sensor',
    lastSynced: new Date('2023-01-02T14:00:00Z'),
    signalStrength: 85,
    readings: {
      'Temp': [
        { 
          sensorId: 'Temp', 
          value: 22.5, 
          timestamp: new Date('2023-01-01T12:00:00Z'),
          status: 'Good' as const,
          metric: '°C'
        },
        { 
          sensorId: 'Temp', 
          value: 23.1, 
          timestamp: new Date('2023-01-01T13:00:00Z'),
          status: 'Good' as const,
          metric: '°C'
        }
      ],
      'PM10': [
        { 
          sensorId: 'PM10', 
          value: 21.8, 
          timestamp: new Date('2023-01-02T12:00:00Z'),
          status: 'Fair' as const,
          metric: 'µg/m³'
        },
        { 
          sensorId: 'PM10', 
          value: 22.4, 
          timestamp: new Date('2023-01-02T13:00:00Z'),
          status: 'Fair' as const,
          metric: 'µg/m³'
        }
      ]
    }
  }
];

// Mock props that match the component interface
const mockProps = {
  sensorData: mockSensorData,
  selectedTimeRange: 'month',
  selectedSensors: ['Temp', 'PM10'],
  onSensorSelection: vi.fn(),
  isLoading: false,
  activeSensorTab: 'PM10',
  setActiveSensorTab: vi.fn(),
  onAddSensor: vi.fn()
};

describe('VisualizationContent Integration', () => {
  it('renders visualization content with sensor tabs', async () => {
    render(<VisualizationContent {...mockProps} />);
    
    // Check if the sensor tab is rendered
    expect(screen.getByText('Temperature Sensor')).toBeInTheDocument();
  });

  it('displays sensor comparison section', async () => {
    render(<VisualizationContent {...mockProps} />);
    
    // SensorComparison component should be rendered
    expect(screen.getByText('Porównanie sensorów')).toBeInTheDocument();
    
    // Add sensor button should be rendered
    const addButton = screen.getByRole('button', { name: /Dodaj kolejny sensor/i });
    expect(addButton).toBeInTheDocument();
    
    // Generate report button should be rendered
    const reportButton = screen.getByRole('button', { name: /Generuj raport/i });
    expect(reportButton).toBeInTheDocument();
  });

  it('opens report modal when generate report button is clicked', async () => {
    const user = userEvent.setup();
    render(<VisualizationContent {...mockProps} />);
    
    // Click the generate report button
    const reportButton = screen.getByRole('button', { name: /Generuj raport/i });
    await user.click(reportButton);
    
    // Wait for the modal to appear
    await waitFor(() => {
      expect(screen.getByText('Tytuł raportu')).toBeInTheDocument();
    });
  });

  it('calls onAddSensor when add sensor button is clicked', async () => {
    const user = userEvent.setup();
    render(<VisualizationContent {...mockProps} />);
    
    // Click the add sensor button
    const addButton = screen.getByRole('button', { name: /Dodaj kolejny sensor/i });
    await user.click(addButton);
    
    // Check if onAddSensor was called
    expect(mockProps.onAddSensor).toHaveBeenCalled();
  });
});
