import { connect } from 'react-redux'

import request from 'state/modules/request'
import { normalizeData as executionNormalizeData } from 'state/schemas/execution'
import ExecutionSelector from 'state/selectors/executionSelector'
import { applyQueryParams } from 'utils/helpers'
import MainPanel from './MainPanel'

const executionSelector = new ExecutionSelector()

const executionsPath = (props, tests) => {
  const { repositoryName, repositoryOwner } = props.match.params
  const parsedTests = tests.join(',')
  return applyQueryParams('/executions', {
    repositoryName,
    repositoryOwner,
    tests: parsedTests
  })
}

const mapState = state => ({
  executions: executionSelector.getAll(state)
})

const mapDispatch = (dispatch, ownProps) => ({
  fetchExecutions: tests =>
    dispatch(
      request(executionsPath(ownProps, tests), {
        normalizer: executionNormalizeData
      })
    )
})

export default connect(
  mapState,
  mapDispatch
)(MainPanel)
