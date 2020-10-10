import Axios from 'axios';

export default Axios.create({
  baseURL: process.env.baseURL || 'http://localhost:8080/',
});
