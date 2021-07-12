import { combineReducers } from 'redux';
import AuthReducer from './user/AuthReducer';
import SearchReducer from './search/reducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  search: SearchReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
