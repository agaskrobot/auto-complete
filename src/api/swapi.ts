import axios from 'axios/index';

// search by value
export const getSearchResults = (value: string) => axios.get(`https://swapi.dev/api/people/?search=${value}`);
