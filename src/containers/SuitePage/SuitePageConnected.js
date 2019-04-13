import { connect } from 'react-redux'

import request from 'state/modules/request'
import { normalizeDataSuite as suiteNormalizer } from 'state/schemas/testSuite'
import { normalizeData as suiteExecutionNormalizer } from 'state/schemas/suiteExecution'
import TestSuiteSelector from 'state/selectors/testSuiteSelector'
import SuiteExecutionSelector from 'state/selectors/suiteExecutionSelector'
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
  return {
    fetchSuite: () =>
      dispatch(request(`/suites/${suiteId}`, { normalizer: suiteNormalizer })),
    fetchSuiteExecutions: () =>
      dispatch(
        request(`/suite-executions?suite=${suiteId}`, {
          normalizer: suiteExecutionNormalizer
        })
      )
  }
}

export default connect(
  mapState,
  mapDispatch
)(SuitePage)
