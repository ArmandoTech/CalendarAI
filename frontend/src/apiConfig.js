const BASE_URL = 'http://localhost:8080';

export const API = {
  GOALS: `${BASE_URL}/api/goals`,
  SCHEDULE: (userId) => `${BASE_URL}/api/goals/schedule/${userId}`,
  GOAL_BY_ID: (id) => `${BASE_URL}/api/goals/${id}`
};
