import { connect } from 'react-redux'

import request from 'state/modules/request'
import { normalizeData } from 'state/schemas/execution'
import StressTest from './StressTest'

const mapDispatch = dispatch => ({
  fetchExecutions: () =>
    dispatch(request('/executions', { normalizer: normalizeData }))
})

export default connect(
  null,
  mapDispatch
)(StressTest)
