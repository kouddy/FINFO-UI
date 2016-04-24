import axios from 'axios';

const va = axios.create({
  baseURL: 'http://localhost:6001/',
  timeout: 3000
});

export default va;
