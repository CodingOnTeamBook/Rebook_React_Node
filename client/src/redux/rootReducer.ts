import { combineReducers } from 'redux';
import AuthReducer from './user/AuthReducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
