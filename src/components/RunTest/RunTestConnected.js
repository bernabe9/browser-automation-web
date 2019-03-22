import { connect } from 'react-redux'

import request from 'state/modules/request'
import { normalizeData } from 'state/schemas/execution'
import RunTest from './RunTest'

const mapDispatch = dispatch => ({
  fetchExecutions: () =>
    dispatch(request('/executions', { normalizer: normalizeData }))
})

export default connect(
  null,
  mapDispatch
)(RunTest)
