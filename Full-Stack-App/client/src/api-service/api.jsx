import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Replace with the appropriate base URL of your server
});

/* axios.get('/api/data')
  .then(response => {
    console.log(response.data);
    // Handle the response data
  })
  .catch(error => {
    console.error(error);
    // Handle the error
  });

axios.post('/api/data', { name: 'John', age: 30 })
  .then(response => {
    console.log(response.data);
    // Handle the response data
  })
  .catch(error => {
    console.error(error);
    // Handle the error
  });

axios.post('/api/data', { name: 'John', age: 30 })
  .then(response => {
    console.log(response.data);
    // Handle the response data
  })
  .catch(error => {
    console.error(error);
    // Handle the error
  });
 */


export default api;





