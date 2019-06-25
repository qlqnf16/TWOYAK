import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.twoyak.com'
});

export default instance;