import { LOGIN_SUCCESS } from "./types";

export const login = (user, token) => ({type: LOGIN_SUCCESS, user, token});
