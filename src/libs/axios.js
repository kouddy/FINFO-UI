import axios from 'axios';

const va = axios.create({
  baseURL: 'https://finfo.mybluemix.net/',
  timeout: 3000
});

export default va;
