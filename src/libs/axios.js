import axios from 'axios';

const va = axios.create({
  baseURL: 'http://testappy.mybluemix.net/',
  timeout: 3000
});

export default va;
