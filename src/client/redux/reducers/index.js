import { combineReducers } from 'redux';

import journal from './journal';
import user from './user';

export default combineReducers({
  journal,
  user
});
