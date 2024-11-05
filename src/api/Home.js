import axios from 'axios';

const config = require('../../config');
const apiUrl = config.apiUrl;

const Home = async accessToken => {
  try {
    const response = await axios.get(`${apiUrl}/api/home`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error.response);
    return [];
  }
};

export default Home;
