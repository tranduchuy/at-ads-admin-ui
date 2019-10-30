import axios from 'axios';
import { API } from '../constants/api';

export const getLoggedInInfo = (token) => {
  return axios.get(API.info, {
    headers: {
      'accesstoken': token
    }
  });
};