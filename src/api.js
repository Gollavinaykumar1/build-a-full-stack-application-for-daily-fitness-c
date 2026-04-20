import axios from 'axios';

const BASE_URL = "http://localhost:8000";

const api = axios.create({
  baseURL: BASE_URL
});

export const getWorkouts = async () => {
  try {
    const response = await api.get('/workouts');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createWorkout = async (workout) => {
  try {
    const response = await api.post('/workouts', workout);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};