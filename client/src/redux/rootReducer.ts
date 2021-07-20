import { combineReducers } from 'redux';
import AuthReducer from './user/AuthReducer';
import SearchReducer from './search/reducer';
import ModalReducer from './modal/Modal';

const rootReducer = combineReducers({
  auth: AuthReducer,
  search: SearchReducer,
  modal: ModalReducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
