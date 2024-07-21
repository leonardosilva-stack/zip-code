import axios from 'axios';

const getWeather = async (city: string) => {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
  return response.data;
};

const getLocalTime = async (lat: number, lon: number) => {
  const apiKey = process.env.TIMEZONEDB_API_KEY; 
  const response = await axios.get(`http://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${lat}&lng=${lon}`);
  return response.data;
};

export { getWeather, getLocalTime };
