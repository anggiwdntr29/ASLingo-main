import axios from 'axios';

const config = require('../../config');
const apiUrl = config.apiUrl;

const register = async (name, email, password, confirm_password) => {
  try {
    const response = await axios.post(`${apiUrl}/api/auth/register`, {
      name,
      email,
      password,
      confirm_password,
    });
    return response.data;
  } catch (error) {
    throw error.response.data.errors;
  }
};

export default register;
