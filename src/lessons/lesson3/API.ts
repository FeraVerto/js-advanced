import axios from 'axios';

const configOMB = {
  baseURL: 'http://www.omdbapi.com',
};
const key = '?apikey=1b50601c';
const axiosInstance = axios.create(configOMB);

const API = {
  searchFilmsByTitle: (title: string) => {
    const query = `${key}&s=${title}`;
    return axiosInstance.get(query).then(res => res.data);
  },

  searchFilmsByType: (title: string, type: string) => {

  },
};


export default API;
