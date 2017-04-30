import { HELLO_REDUX } from '../actions/index';

export default function (state = { }, action) {
	switch (action.type) {

	case HELLO_REDUX: {
		return { ...state, ...action.payload };
	}

	default:
		return state;
	}
}
