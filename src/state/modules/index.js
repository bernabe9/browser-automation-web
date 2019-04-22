import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import { sessionReducer as session } from 'redux-react-session'

import data from 'state/modules/data'

const rootReducer = combineReducers({
  form,
  data,
  session
})

export default rootReducer
