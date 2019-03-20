import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form/immutable';

const rootReducer = combineReducers({
  form,
});

export default rootReducer;
