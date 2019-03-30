import { connect } from 'react-redux'

import request from 'state/modules/request'
import { normalizeData as executionNormalizeData } from 'state/schemas/execution'
import { normalizeData as stressExecutionNormalizeData } from 'state/schemas/stressExecution'
import ExecutionSelector from 'state/selectors/executionSelector'
import StressExecutionSelector from 'state/selectors/stressExecutionSelector'
import HomePage from './HomePage'

const executionSelector = new ExecutionSelector()
const stressExecutionSelector = new StressExecutionSelector()

const mapState = state => {
  const executions = executionSelector.getAll(state)
  let stressExecutions
  if (executions) {
    stressExecutions = stressExecutionSelector.getAll(state)
  }
  return { executions, stressExecutions }
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
