import { connect } from 'react-redux'

import request from 'state/modules/request'
import { normalizeData } from 'state/schemas/testSuite'
import TestSuiteSelector from 'state/selectors/testSuiteSelector'
import { applyQueryParams } from 'utils/helpers'
import HomePage from './HomePage'

const testSuiteSelector = new TestSuiteSelector()

const mapState = state => ({
  testSuites: testSuiteSelector.getSuitesByRepository(state)
})

const mapDispatch = (dispatch, ownProps) => {
  const { repositoryName, repositoryOwner } = ownProps.match.params
  const repository = `${repositoryOwner}/${repositoryName}`
  return {
    fetchTestSuites: () =>
      dispatch(
        request(applyQueryParams('/suites', { repository }), {
          normalizer: normalizeData
        })
      )
  }
}

export default connect(
  mapState,
  mapDispatch
)(HomePage)
