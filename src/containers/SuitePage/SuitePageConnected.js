import { connect } from 'react-redux'
import queryString from 'query-string'

import request from 'state/modules/request'
import { normalizeDataSuite as suiteNormalizer } from 'state/schemas/testSuite'
import { normalizeData as suiteExecutionNormalizer } from 'state/schemas/suiteExecution'
import TestSuiteSelector from 'state/selectors/testSuiteSelector'
import SuiteExecutionSelector from 'state/selectors/suiteExecutionSelector'
import { applyQueryParams } from 'utils/helpers'
import SuitePage from './SuitePage'

const testSuiteSelector = new TestSuiteSelector()
const suiteExecutionSelector = new SuiteExecutionSelector()

const mapState = (state, ownProps) => {
  const suiteId = ownProps.match.params.id
  const suite = testSuiteSelector.getSuite(state, suite => suite.id === suiteId)
  const suiteExecutions = suiteExecutionSelector.filter(
    state,
    suiteExecution => suiteExecution.suiteId === suiteId
  )
  const sortedExecutions = suiteExecutionSelector.sortByDate(
    suiteExecutions,
    'createdAt'
  )
  return { suite, suiteExecutions: sortedExecutions }
}

const mapDispatch = (dispatch, ownProps) => {
  const suiteId = ownProps.match.params.id
  const { repositoryName, repositoryOwner, repositoryRef } = queryString.parse(
    ownProps.history.location.search
  )
  const suiteExecutionPath = applyQueryParams('/suite-executions', {
    suite: suiteId,
    repositoryName,
    repositoryOwner,
    repositoryRef
  })
  return {
    fetchSuite: () =>
      dispatch(request(`/suites/${suiteId}`, { normalizer: suiteNormalizer })),
    fetchSuiteExecutions: () =>
      dispatch(
        request(suiteExecutionPath, {
          normalizer: suiteExecutionNormalizer
        })
      )
  }
}

export default connect(
  mapState,
  mapDispatch
)(SuitePage)
