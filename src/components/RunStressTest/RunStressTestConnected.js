import { connect } from 'react-redux'

import request from 'state/modules/request'
import { normalizeData as executionNormalizeData } from 'state/schemas/execution'
import { normalizeData as stressExecutionNormalizeData } from 'state/schemas/stressExecution'
import RunStressTest from './RunStressTest'

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
  null,
  mapDispatch
)(RunStressTest)
