import Axios from 'axios';

export default Axios.create({
  baseURL: 'https://careconnectapp.herokuapp.com/' || 'http://localhost:8080/',
});
