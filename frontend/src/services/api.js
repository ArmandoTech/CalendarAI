import axios from 'axios';
import { API } from '../apiConfig';

export const getGoals = () => axios.get(API.GOALS);
export const createGoal = (goal) => axios.post(API.GOALS, goal);
export const deleteGoal = (id) => axios.delete(API.GOAL_BY_ID(id));
export const updateGoal = (id, updatedGoal) => axios.put(API.GOAL_BY_ID(id), updatedGoal);
export const getSchedule = (userId) => axios.get(API.SCHEDULE(userId));
export const getGoalsByUser = (userId) => axios.get(API.GOAL_BY_USER(userId));
