import { connect } from 'react-redux'
import { denormalize } from 'normalizr'

import request from 'state/modules/request'
import {
  normalizeData as executionNormalizeData,
  executions as executionSchema
} from 'state/schemas/execution'
import {
  normalizeData as stressExecutionNormalizeData,
  stressExecutions as stressExecutionSchema
} from 'state/schemas/stressExecution'
import HomePage from './HomePage'

const mapState = state => {
  const newState = {
    executions: [],
    stressExecutions: []
  }
  if (state.data.executions) {
    newState.executions = denormalize(
      Object.keys(state.data.executions),
      executionSchema,
      state.data
    )
  }

  if (state.data.executions && state.data.stressExecutions) {
    const stressExecutions = denormalize(
      Object.keys(state.data.stressExecutions),
      stressExecutionSchema,
      state.data
    )

    Object.values(stressExecutions).forEach(stressExecution => {
      stressExecution.executions.values = stressExecution.executions.values.map(
        execution => ({ ...state.data.executions[execution] })
      )
    })

    newState.stressExecutions = stressExecutions
  }
  return newState
}

const mapDispatch = dispatch => ({
  fetchExecutions: () =>
    dispatch(request('/executions', { normalizer: executionNormalizeData })),
  fetchStressExecutions: () =>
    dispatch(
      request('/stress-executions', {
        normalizer: stressExecutionNormalizeData
      })
    )
})

export default connect(
  mapState,
  mapDispatch
)(HomePage)
