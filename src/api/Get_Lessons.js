import axios from 'axios';

const config = require('../../config');
const apiUrl = config.apiUrl;

const Get_Lessons = async (id, accessToken) => {
  try {
    const response = await axios.get(`${apiUrl}/api/lessons?class=${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error(error.response.data.message);
    return [];
  }
};

const Get_ListLessons = async (id, accessToken) => {
  try {
    const response = await axios.get(`${apiUrl}/api/lessons/${id}/materials`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error(error.response.data.message);
    return [];
  }
};

const Get_Material = async (id, id_materials, accessToken) => {
  try {
    const response = await axios.get(
      `${apiUrl}/api/lessons/${id}/materials/${id_materials}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
    return [];
  }
};

const Progress = async (id, id_materials, accessToken) => {
  try {
    await axios.put(
      `${apiUrl}/api/lessons/${id}/materials/${id_materials}/update`,
      null,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  } catch (error) {
    console.error(error.response.data.message);
    return [];
  }
};

const Get_Quiz = async (id, accessToken) => {
  try {
    const response = await axios.get(`${apiUrl}/api/lessons/${id}/quiz`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error(error.response.data.message);
    return [];
  }
};

const submitQuiz = async (id, accessToken, answers) => {
  try {
    const response = await axios.post(
      `${apiUrl}/api/lessons/${id}/quiz/attempt-answer`,
      {
        answers,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data.data;
  } catch (error) {
    console.error(error.response.data);
    return [];
  }
};

export {
  Get_Lessons,
  Get_ListLessons,
  Get_Quiz,
  Get_Material,
  Progress,
  submitQuiz,
};
