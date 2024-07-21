import axios from 'axios';

export const getLocation = async (countryCode: string, cep: string) => {
  if (countryCode === 'BR') {
    return await getBrazilLocation(cep);
  } else if (countryCode === 'PT') {
    return await getPortugueseLocation(cep);
  } else {
    return await getGlobalLocation(countryCode, cep);
  }
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

const getGlobalLocation = async (countryCode: string, cep: string) => {
  const url = `https://api.zippopotam.us/${countryCode}/${cep}`;
  const response = await axios.get(url);

  if (response.data.places && response.data.places.length > 0) {
    let location = {
      city: response.data.places[0]['place name'] || response.data.places[0]['name'],
      state: response.data.places[0]['state abbreviation'] || response.data.places[0]['state'],
      country: response.data.country
    };
    return location;
  } else {
    throw new Error('Location data not found for the given postal code');
  }
};
