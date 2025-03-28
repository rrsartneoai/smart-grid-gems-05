
import { SensorsDataByCity } from "./types/SensorDataTypes";

// This will serve as fallback data when API fails
export const sensorsData: SensorsDataByCity = {
  gdansk: {
    name: "Gdańsk",
    coordinates: {
      lat: 54.372158,
      lon: 18.638306
    },
    sensors: [
      {
        iconType: "temperature",
        name: "Temperatura",
        value: "0",
        unit: "°C",
        status: "Good",
        description: "Temperatura powietrza"
      },
      {
        iconType: "co2",
        name: "CO₂",
        value: "485",
        unit: "ppm",
        status: "Good",
        description: "Dwutlenek węgla"
      },
      {
        iconType: "voc",
        name: "VOC",
        value: "52",
        unit: "ppb",
        status: "Warning",
        description: "Lotne związki organiczne"
      },
      {
        iconType: "pm25",
        name: "PM 2.5",
        value: "8",
        unit: "μg/m³",
        status: "Good",
        description: "Pyły zawieszone PM2.5"
      },
      {
        iconType: "pm10",
        name: "PM10",
        value: "11",
        unit: "μg/m³",
        status: "Good",
        description: "Pyły zawieszone PM10"
      },
      {
        iconType: "humidity",
        name: "Wilgotność",
        value: "55",
        unit: "%",
        status: "Good",
        description: "Wilgotność powietrza"
      },
      {
        iconType: "noise",
        name: "Hałas",
        value: "48",
        unit: "dBA",
        status: "Good",
        description: "Poziom hałasu"
      },
      {
        iconType: "pressure",
        name: "Ciśnienie",
        value: "1015",
        unit: "hPa",
        status: "Good",
        description: "Ciśnienie atmosferyczne"
      },
      {
        iconType: "light",
        name: "Oświetlenie",
        value: "82",
        unit: "%",
        status: "Good",
        description: "Poziom oświetlenia"
      }
    ]
  },
  gdynia: {
    name: "Gdynia",
    coordinates: {
      lat: 54.5189,
      lon: 18.5305
    },
    sensors: [
      {
        iconType: "temperature",
        name: "Temperatura",
        value: "2",
        unit: "°C",
        status: "Good",
        description: "Temperatura powietrza"
      },
      {
        iconType: "co2",
        name: "CO₂",
        value: "460",
        unit: "ppm",
        status: "Good",
        description: "Dwutlenek węgla"
      },
      {
        iconType: "voc",
        name: "VOC",
        value: "48",
        unit: "ppb",
        status: "Good",
        description: "Lotne związki organiczne"
      },
      {
        iconType: "pm25",
        name: "PM 2.5",
        value: "10",
        unit: "μg/m³",
        status: "Good",
        description: "Pyły zawieszone PM2.5"
      },
      {
        iconType: "pm10",
        name: "PM10",
        value: "15",
        unit: "μg/m³",
        status: "Good",
        description: "Pyły zawieszone PM10"
      },
      {
        iconType: "humidity",
        name: "Wilgotność",
        value: "60",
        unit: "%",
        status: "Good",
        description: "Wilgotność powietrza"
      },
      {
        iconType: "noise",
        name: "Hałas",
        value: "52",
        unit: "dBA",
        status: "Good",
        description: "Poziom hałasu"
      },
      {
        iconType: "pressure",
        name: "Ciśnienie",
        value: "1013",
        unit: "hPa",
        status: "Good",
        description: "Ciśnienie atmosferyczne"
      },
      {
        iconType: "light",
        name: "Oświetlenie",
        value: "78",
        unit: "%",
        status: "Good",
        description: "Poziom oświetlenia"
      }
    ]
  },
  sopot: {
    name: "Sopot",
    coordinates: {
      lat: 54.441581,
      lon: 18.560096
    },
    sensors: [
      {
        iconType: "temperature",
        name: "Temperatura",
        value: "1",
        unit: "°C",
        status: "Good",
        description: "Temperatura powietrza"
      },
      {
        iconType: "co2",
        name: "CO₂",
        value: "470",
        unit: "ppm",
        status: "Good",
        description: "Dwutlenek węgla"
      },
      {
        iconType: "voc",
        name: "VOC",
        value: "50",
        unit: "ppb",
        status: "Good",
        description: "Lotne związki organiczne"
      },
      {
        iconType: "pm25",
        name: "PM 2.5",
        value: "9",
        unit: "μg/m³",
        status: "Good",
        description: "Pyły zawieszone PM2.5"
      },
      {
        iconType: "pm10",
        name: "PM10",
        value: "13",
        unit: "μg/m³",
        status: "Good",
        description: "Pyły zawieszone PM10"
      },
      {
        iconType: "humidity",
        name: "Wilgotność",
        value: "57",
        unit: "%",
        status: "Good",
        description: "Wilgotność powietrza"
      },
      {
        iconType: "noise",
        name: "Hałas",
        value: "50",
        unit: "dBA",
        status: "Good",
        description: "Poziom hałasu"
      },
      {
        iconType: "pressure",
        name: "Ciśnienie",
        value: "1014",
        unit: "hPa",
        status: "Good",
        description: "Ciśnienie atmosferyczne"
      },
      {
        iconType: "light",
        name: "Oświetlenie",
        value: "80",
        unit: "%",
        status: "Good",
        description: "Poziom oświetlenia"
      }
    ]
  },
  slupsk: {
    name: "Słupsk",
    coordinates: {
      lat: 54.464148, 
      lon: 17.028482
    },
    sensors: [
      {
        iconType: "temperature",
        name: "Temperatura",
        value: "-1",
        unit: "°C",
        status: "Good",
        description: "Temperatura powietrza"
      },
      {
        iconType: "co2",
        name: "CO₂",
        value: "490",
        unit: "ppm",
        status: "Good",
        description: "Dwutlenek węgla"
      },
      {
        iconType: "voc",
        name: "VOC",
        value: "45",
        unit: "ppb",
        status: "Good",
        description: "Lotne związki organiczne"
      },
      {
        iconType: "pm25",
        name: "PM 2.5",
        value: "12",
        unit: "μg/m³",
        status: "Good",
        description: "Pyły zawieszone PM2.5"
      },
      {
        iconType: "pm10",
        name: "PM10",
        value: "18",
        unit: "μg/m³",
        status: "Good",
        description: "Pyły zawieszone PM10"
      },
      {
        iconType: "humidity",
        name: "Wilgotność",
        value: "65",
        unit: "%",
        status: "Good",
        description: "Wilgotność powietrza"
      },
      {
        iconType: "noise",
        name: "Hałas",
        value: "45",
        unit: "dBA",
        status: "Good",
        description: "Poziom hałasu"
      },
      {
        iconType: "pressure",
        name: "Ciśnienie",
        value: "1018",
        unit: "hPa",
        status: "Good",
        description: "Ciśnienie atmosferyczne"
      },
      {
        iconType: "light",
        name: "Oświetlenie",
        value: "75",
        unit: "%",
        status: "Good",
        description: "Poziom oświetlenia"
      }
    ]
  },
  ustka: {
    name: "Ustka",
    coordinates: {
      lat: 54.5805,
      lon: 16.8614
    },
    sensors: [
      {
        iconType: "temperature",
        name: "Temperatura",
        value: "0",
        unit: "°C",
        status: "Good",
        description: "Temperatura powietrza"
      },
      {
        iconType: "co2",
        name: "CO₂",
        value: "465",
        unit: "ppm",
        status: "Good",
        description: "Dwutlenek węgla"
      },
      {
        iconType: "voc",
        name: "VOC",
        value: "42",
        unit: "ppb",
        status: "Good",
        description: "Lotne związki organiczne"
      },
      {
        iconType: "pm25",
        name: "PM 2.5",
        value: "7",
        unit: "μg/m³",
        status: "Good",
        description: "Pyły zawieszone PM2.5"
      },
      {
        iconType: "pm10",
        name: "PM10",
        value: "10",
        unit: "μg/m³",
        status: "Good",
        description: "Pyły zawieszone PM10"
      },
      {
        iconType: "humidity",
        name: "Wilgotność",
        value: "68",
        unit: "%",
        status: "Good",
        description: "Wilgotność powietrza"
      },
      {
        iconType: "noise",
        name: "Hałas",
        value: "42",
        unit: "dBA",
        status: "Good",
        description: "Poziom hałasu"
      },
      {
        iconType: "pressure",
        name: "Ciśnienie",
        value: "1017",
        unit: "hPa",
        status: "Good",
        description: "Ciśnienie atmosferyczne"
      },
      {
        iconType: "light",
        name: "Oświetlenie",
        value: "72",
        unit: "%",
        status: "Good",
        description: "Poziom oświetlenia"
      }
    ]
  }
};
