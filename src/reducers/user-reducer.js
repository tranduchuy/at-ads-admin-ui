import { LOGIN_SUCCESS, UNAUTH_USER } from "../actions/types";

export default function (state = {isLogout: false}, action) {
	switch (action.type) {
		case LOGIN_SUCCESS:
			return {
				user: action.user,
				token: action.token,
				isLogout: false
			};
		case UNAUTH_USER:
			return {
				isLogout: true
			};
		default:
			return state;
	}
}
