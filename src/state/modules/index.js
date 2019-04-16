import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import data from 'state/modules/data'
import user from 'state/modules/user'

const rootReducer = combineReducers({
  form,
  data,
  user
})

export default rootReducer
