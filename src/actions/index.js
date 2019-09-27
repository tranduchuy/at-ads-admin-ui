import { LOGIN_SUCCESS } from "../store";

export const login = (user, token) => ({type: LOGIN_SUCCESS, user, token});