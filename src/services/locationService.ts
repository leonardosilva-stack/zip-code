import axios from 'axios';

export const getLocation = async (cep: string) => {
  if (isBrazilianCep(cep)) {
    return await getBrazilLocation(cep);
  } else {
    return await getGlobalLocation(cep);
  }
};

const isBrazilianCep = (cep: string) => {
  return /^[0-9]{5}-[0-9]{3}$/.test(cep);
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

const getGlobalLocation = async (cep: string) => {
  const response = await axios.get(`https://api.zippopotam.us/${cep}`);
  return {
    city: response.data.places[0]['place name'],
    state: response.data.places[0]['state abbreviation'],
    country: response.data.country
  };
};
