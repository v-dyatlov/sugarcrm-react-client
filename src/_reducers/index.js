import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
// import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { map } from './map.reducer';

const rootReducer = combineReducers({
  authentication,
  map,
  users,
  alert
});

export default rootReducer;