import axios from 'axios';

export const getLocation = async (cep: string) => {
  if (isBrazilianCep(cep)) {
    return await getBrazilLocation(cep);
  } else if (isPortugueseCep(cep)) {
    return await getPortugueseLocation(cep);
  } else {
    return await getGlobalLocation(cep);
  }
};

const isBrazilianCep = (cep: string) => {
  return /^[0-9]{5}-[0-9]{3}$/.test(cep);
};

const isPortugueseCep = (cep: string) => {
  return /^\d{4}-\d{3}$/.test(cep);
};

const getBrazilLocation = async (cep: string) => {
  const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
  return {
    street: response.data.logradouro,
    city: response.data.localidade,
    state: response.data.uf,
    country: 'Brazil'
  };
};

const getPortugueseLocation = async (cep: string) => {
  const response = await axios.get(`https://api.zippopotam.us/PT/${cep}`);
  return {
    street: response.data.places[0]['name'],
    city: response.data.places[0]['place name'],
    state: response.data.places[0]['state'],
    country: response.data.country
  };
};

const getGlobalLocation = async (cep: string) => {
  const countryCodes: { [key: string]: string } = {
    'AD': 'AD', 'AR': 'AR', 'AS': 'AS', 'AT': 'AT', 'AU': 'AU',
    'BD': 'BD', 'BE': 'BE', 'BG': 'BG', 'CA': 'CA', 'CH': 'CH',
    'CZ': 'CZ', 'DE': 'DE', 'DK': 'DK', 'DO': 'DO', 'ES': 'ES',
    'FI': 'FI', 'FO': 'FO', 'FR': 'FR', 'GB': 'GB', 'GF': 'GF',
    'GG': 'GG', 'GL': 'GL', 'GP': 'GP', 'GT': 'GT', 'GU': 'GU',
    'GY': 'GY', 'HR': 'HR', 'HU': 'HU', 'IM': 'IM', 'IN': 'IN',
    'IS': 'IS', 'IT': 'IT', 'JE': 'JE', 'JP': 'JP', 'LI': 'LI',
    'LK': 'LK', 'LT': 'LT', 'LU': 'LU', 'MC': 'MC', 'MD': 'MD',
    'MH': 'MH', 'MK': 'MK', 'MP': 'MP', 'MQ': 'MQ', 'MX': 'MX',
    'MY': 'MY', 'NL': 'NL', 'NO': 'NO', 'NZ': 'NZ', 'PH': 'PH',
    'PK': 'PK', 'PL': 'PL', 'PM': 'PM', 'PR': 'PR', 'RE': 'RE',
    'RU': 'RU', 'SE': 'SE', 'SI': 'SI', 'SJ': 'SJ', 'SK': 'SK',
    'SM': 'SM', 'TH': 'TH', 'TR': 'TR', 'US': 'US', 'VA': 'VA',
    'VI': 'VI', 'YT': 'YT', 'ZA': 'ZA'
  };

 
  const countryCode = Object.keys(countryCodes).find(code => {
    const regex = new RegExp(`^${countryCodes[code]}[0-9A-Za-z]+`);
    return regex.test(cep);
  }) || '';

  if (!countryCode) {
    throw new Error('Unsupported postal code format or country');
  }

  const url = `https://api.zippopotam.us/${countryCode}/${cep}`;
  const response = await axios.get(url);

  
  let location = {
    city: response.data.places[0]['place name'] || response.data.places[0]['name'],
    state: response.data.places[0]['state abbreviation'] || response.data.places[0]['state'],
    country: response.data.country
  };

  return location;
};
