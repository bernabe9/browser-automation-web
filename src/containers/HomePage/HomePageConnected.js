import { connect } from 'react-redux'

import request from 'state/modules/request'
import { normalizeData } from 'state/schemas/testSuite'
import TestSuiteSelector from 'state/selectors/testSuiteSelector'
import HomePage from './HomePage'

const testSuiteSelector = new TestSuiteSelector()

const mapState = state => ({
  testSuites: testSuiteSelector.getAll(state)
})

const mapDispatch = dispatch => ({
  fetchTestSuites: () =>
    dispatch(request('/suites', { normalizer: normalizeData }))
})

export default connect(
  mapState,
  mapDispatch
)(HomePage)
