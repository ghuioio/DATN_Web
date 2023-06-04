const axios = require('axios');  // If you're in a browser environment, you might not need this line

const rasa_url = 'http://localhost:5005/webhooks/rest/webhook';

const headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

const message = {
  sender: 'test',
  message: 'what is dog?'
};

axios.post(rasa_url, message, { headers })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
