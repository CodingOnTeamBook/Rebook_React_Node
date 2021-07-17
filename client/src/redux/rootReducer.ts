import { combineReducers } from 'redux';
import AuthReducer from './user/AuthReducer';
import SearchReducer from './search/reducer';
import BookReducer from './book/reducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  search: SearchReducer,
  book: BookReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
