import { connect } from 'react-redux'

import request from 'state/modules/request'
import StressExecutionSelector from 'state/selectors/stressExecutionSelector'
import { normalizeData as executionNormalizeData } from 'state/schemas/execution'
import { normalizeData as stressExecutionNormalizeData } from 'state/schemas/stressExecution'
import RunStressTest from './RunStressTest'

const stressExecutionSelector = new StressExecutionSelector()

const mapState = (state, ownProps) => {
  const stressExecutions = stressExecutionSelector.filter(
    state,
    ({ test }) => test === ownProps.test
  )
  const stressExecutionsSortedByDate = stressExecutionSelector.sortByDate(
    stressExecutions,
    'createdAt'
  )
  return { stressExecutions: stressExecutionsSortedByDate }
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
)(RunStressTest)
