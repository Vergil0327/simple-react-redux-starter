import { combineReducers } from 'redux';
import helloReduxReducer from './hello_redux';

const rootReducer = combineReducers({
	hello: helloReduxReducer,
});

export default rootReducer;
