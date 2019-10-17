import { CHECKING_ATTACH_SCRIPT, LIST_WEBSITES } from "../actions/types";

export default function (state = {list: []}, action) {
	switch (action.type) {
		case LIST_WEBSITES:
			break;
		case CHECKING_ATTACH_SCRIPT:
			break;
		default:
			return state;
	}
}
