import { connect } from 'react-redux'

import request from 'state/modules/request'
import { normalizeDataSuite as suiteNormalizer } from 'state/schemas/testSuite'
import { normalizeData as suiteExecutionNormalizer } from 'state/schemas/suiteExecution'
import TestSuiteSelector from 'state/selectors/testSuiteSelector'
import SuiteExecutionSelector from 'state/selectors/suiteExecutionSelector'
import { applyQueryParams } from 'utils/helpers'
import SuitePage from './SuitePage'

const testSuiteSelector = new TestSuiteSelector()
const suiteExecutionSelector = new SuiteExecutionSelector()

const suiteExecutionsPath = props => {
  const {
    id,
    repositoryName,
    repositoryOwner,
    repositoryRef
  } = props.match.params
  return applyQueryParams('/suite-executions', {
    suite: id,
    repositoryName,
    repositoryOwner,
    repositoryRef
  })
}
const suitePath = props => `/suites/${props.match.params.id}`

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
  const suiteMeta = state.data.meta[suitePath(ownProps)]
  const loadingSuite = suiteMeta && suiteMeta.loading
  const suiteExecutionsMeta = state.data.meta[suiteExecutionsPath(ownProps)]
  const loadingSuiteExecutions =
    suiteExecutionsMeta && suiteExecutionsMeta.loading
  return {
    repositoryName: state.environment.repositoryName,
    repositoryOwner: state.environment.repositoryOwner,
    repositoryRef: state.environment.repositoryRef,
    suite,
    suiteExecutions: sortedExecutions,
    loadingSuite,
    loadingSuiteExecutions
  }
}

const mapDispatch = (dispatch, ownProps) => ({
  fetchSuite: () =>
    dispatch(request(suitePath(ownProps), { normalizer: suiteNormalizer })),
  fetchSuiteExecutions: () =>
    dispatch(
      request(suiteExecutionsPath(ownProps), {
        normalizer: suiteExecutionNormalizer
      })
    )
})

export default connect(
  mapState,
  mapDispatch
)(SuitePage)
