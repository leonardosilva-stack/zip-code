import { Request, Response } from 'express';
import { getWeather, getLocalTime } from '../services/weatherService';
import { getLocation } from '../services/locationService';
import { rateLimiter } from '../utils/rateLimiter';

interface AxiosErrorResponse {
  response?: {
    status?: number;
  };
}

export const getWeatherInfo = async (req: Request, res: Response) => {
  const { countryCode, cep } = req.params;
  const clientIp = req.clientIp || req.ip || '';

  if (await rateLimiter(clientIp)) {
    return res.status(429).json({ message: 'Limit exceeded. Try again tomorrow.' });
  }

  try {
    const location = await getLocation(countryCode, cep);
    const weather = await getWeather(location.city);
    const localTimeData = await getLocalTime(weather.coord.lat, weather.coord.lon);

    const localTime = {
      date: localTimeData.formatted.split(' ')[0],
      time: localTimeData.formatted.split(' ')[1]
    };

    res.json({ 
      location, 
      weather, 
      localTime 
    });
  } catch (error: unknown) {
  
    const axiosError = error as AxiosErrorResponse;

    if (axiosError.response?.status === 400) {
      res.status(400).json({ message: 'Invalid CEP or country code. Please check your input and try again.' });
    } else {
      res.status(500).json({ message: 'An unexpected error occurred. Please try again later.', error });
    }
  }
};
