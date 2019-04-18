import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'

import data from 'state/modules/data'

const rootReducer = combineReducers({
  form,
  data
})

export default rootReducer
