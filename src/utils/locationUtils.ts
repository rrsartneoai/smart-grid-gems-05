
/**
 * Maps location names to coordinates
 */
interface LocationCoordinates {
  lat: number;
  lng: number;
}

const locationCoordinatesMap: Record<string, LocationCoordinates> = {
  "gdańsk": { lat: 54.372158, lng: 18.638306 },
  "gdansk": { lat: 54.372158, lng: 18.638306 },
  "gdańsk wrzeszcz": { lat: 54.3813, lng: 18.5954 },
  "gdansk wrzeszcz": { lat: 54.3813, lng: 18.5954 },
  "sopot": { lat: 54.441581, lng: 18.560096 },
  "gdynia": { lat: 54.5189, lng: 18.5305 },
  "gdynia ul starowiejska": { lat: 54.5163, lng: 18.5361 },
  "gdynia ul. starowiejska": { lat: 54.5163, lng: 18.5361 },
  "trójmiasto": { lat: 54.441581, lng: 18.560096 },
  "trojmiasto": { lat: 54.441581, lng: 18.560096 },
  "ustka": { lat: 54.5805, lng: 16.8614 },
  "łódź": { lat: 51.7592, lng: 19.4560 },
  "lodz": { lat: 51.7592, lng: 19.4560 },
  "wrocław": { lat: 51.1079, lng: 17.0385 },
  "wroclaw": { lat: 51.1079, lng: 17.0385 },
  "kraków": { lat: 50.0647, lng: 19.9450 },
  "krakow": { lat: 50.0647, lng: 19.9450 },
  "warszawa": { lat: 52.2297, lng: 21.0122 },
  "poznań": { lat: 52.4064, lng: 16.9252 },
  "poznan": { lat: 52.4064, lng: 16.9252 },
  "szczecin": { lat: 53.4285, lng: 14.5528 },
  "świdnica": { lat: 50.8449, lng: 16.4860 },
  "swidnica": { lat: 50.8449, lng: 16.4860 },
  "ćmielów": { lat: 50.8880, lng: 21.5117 },
  "cmielow": { lat: 50.8880, lng: 21.5117 },
  "zamość": { lat: 50.7230, lng: 23.2522 },
  "zamosc": { lat: 50.7230, lng: 23.2522 },
  "nysa": { lat: 50.4747, lng: 17.3327 }
};

/**
 * Normalizes location name by removing accents and converting to lowercase
 */
const normalizeLocationName = (location: string): string => {
  if (!location) return "";
  
  return location.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l")
    .replace(/ą/g, "a")
    .replace(/ę/g, "e")
    .replace(/ś/g, "s")
    .replace(/ć/g, "c")
    .replace(/ż/g, "z")
    .replace(/ź/g, "z")
    .replace(/ń/g, "n")
    .replace(/ó/g, "o");
};

/**
 * Returns coordinates for a given location name
 */
export const getCoordinatesForLocation = (location: string): LocationCoordinates | null => {
  if (!location) return null;
  
  const normalizedLocation = normalizeLocationName(location);
  
  if (normalizedLocation.includes("starowiejska")) {
    return locationCoordinatesMap["gdynia ul starowiejska"];
  }
  
  // Try direct match first
  if (locationCoordinatesMap[normalizedLocation]) {
    return locationCoordinatesMap[normalizedLocation];
  }
  
  // Try original location (with diacritics) as a fallback
  if (locationCoordinatesMap[location.toLowerCase()]) {
    return locationCoordinatesMap[location.toLowerCase()];
  }
  
  // Try partial matches
  for (const [key, coords] of Object.entries(locationCoordinatesMap)) {
    if (normalizedLocation.includes(key) || key.includes(normalizedLocation)) {
      return coords;
    }
  }
  
  return null;
};

/**
 * Checks if coordinates are in the Tri-City area (Gdańsk, Gdynia, Sopot)
 */
export const isInTriCity = (lat: number, lng: number): boolean => {
  if (!lat || !lng) return false;
  
  // Approximate bounding box for Tricity area
  const triCityBounds = {
    north: 54.60, // North of Gdynia
    south: 54.30, // South of Gdańsk
    east: 18.80,  // East coast
    west: 18.40   // West boundary
  };
  
  return (
    lat >= triCityBounds.south &&
    lat <= triCityBounds.north &&
    lng >= triCityBounds.west &&
    lng <= triCityBounds.east
  );
};

/**
 * Returns a display-friendly location name
 */
export const getDisplayLocationName = (requestedLocation: string, installation: any): string => {
  if (!requestedLocation) return "Nieznana lokalizacja";
  
  if (requestedLocation.toLowerCase().includes("starowiejska")) {
    return "Gdynia, ul. Starowiejska";
  }
  
  if (installation?.address) {
    const { street, city } = installation.address;
    if (street && city) {
      return `${city}, ul. ${street}`;
    }
    return city || "Nieznana lokalizacja";
  }
  
  // Ensure Polish characters are preserved in display name
  // Instead of normalizing, we will try to ensure proper capitalization
  const words = requestedLocation.split(/\s+/);
  const formattedWords = words.map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );
  
  return formattedWords.join(" ");
};

/**
 * Returns the appropriate unit for a sensor reading
 */
export const getUnitForReading = (name: string): string => {
  if (!name) return "";
  
  const units: Record<string, string> = {
    "PM1": "μg/m³",
    "PM2.5": "μg/m³",
    "PM10": "μg/m³",
    "TEMPERATURE": "°C",
    "HUMIDITY": "%",
    "PRESSURE": "hPa",
    "NO2": "μg/m³",
    "O3": "μg/m³",
    "SO2": "μg/m³",
    "CO": "μg/m³"
  };
  
  return units[name] || "";
};
