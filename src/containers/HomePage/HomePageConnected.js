import { connect } from 'react-redux'
import { denormalize } from 'normalizr'

import request from 'state/modules/request'
import {
  normalizeData,
  executions as executionSchema
} from 'state/schemas/execution'
import HomePage from './HomePage'

const mapState = state => {
  if (!state.data.executions) {
    return { executions: [] }
  }
  const executions = denormalize(
    Object.keys(state.data.executions),
    executionSchema,
    state.data
  )
  return { executions }
}

const mapDispatch = dispatch => ({
  fetchExecutions: () =>
    dispatch(request('/executions', { normalizer: normalizeData }))
})

export default connect(
  mapState,
  mapDispatch
)(HomePage)
