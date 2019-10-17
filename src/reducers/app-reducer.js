import { APP_LOADING } from "../actions/types";

export default function (state = { isLoading: false }, action) {
	switch (action.type) {
		case APP_LOADING:
			return {
				...state,
				isLoading: action.isLoading
			};
			
		default:
			return state;
	}
}
