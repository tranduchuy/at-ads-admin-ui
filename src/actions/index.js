import { APP_LOADING, CHECKING_ATTACH_SCRIPT, LIST_WEBSITES, LOGIN_SUCCESS } from "./types";

export const login = (user, token) => ({ type: LOGIN_SUCCESS, user, token });

export const setAppLoading = (isLoading) => ({ type: APP_LOADING, isLoading });

export const websites = (websites) => ({ type: LIST_WEBSITES, websites });
export const checkAttachedScript = (website) => ({ type: CHECKING_ATTACH_SCRIPT, website });
