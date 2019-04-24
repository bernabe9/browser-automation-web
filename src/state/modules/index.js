import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { sessionReducer as session } from 'redux-react-session'

import environment from 'state/modules/environment'
import data from 'state/modules/data'

const rootReducer = combineReducers({
  form,
  data,
  session,
  environment
})

export default rootReducer
