import { connect } from 'react-redux'

import request from 'state/modules/request'
import { normalizeData } from 'state/schemas/testSuite'
import TestSuiteSelector from 'state/selectors/testSuiteSelector'
import { applyQueryParams } from 'utils/helpers'
import HomePage from './HomePage'

const testSuiteSelector = new TestSuiteSelector()

const suitesPath = props => {
  const { repositoryName, repositoryOwner } = props.match.params
  const repository = `${repositoryOwner}/${repositoryName}`
  return applyQueryParams('/suites', { repository })
}

const mapState = (state, ownProps) => ({
  testSuites: testSuiteSelector.getSuitesByRepository(state),
  loading:
    !!state.data.meta[suitesPath(ownProps)] &&
    state.data.meta[suitesPath(ownProps)].loading
})

const mapDispatch = (dispatch, ownProps) => ({
  fetchTestSuites: () =>
    dispatch(
      request(suitesPath(ownProps), {
        normalizer: normalizeData
      })
    )
})

export default connect(
  mapState,
  mapDispatch
)(HomePage)
