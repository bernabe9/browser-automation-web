import { connect } from 'react-redux'

import request from 'state/modules/request'
import { normalizeData } from 'state/schemas/testSuite'
import TestSuiteSelector from 'state/selectors/testSuiteSelector'
import SuitePage from './SuitePage'

const testSuiteSelector = new TestSuiteSelector()

const getSuiteId = url => url.substr(url.lastIndexOf('/') + 1)

const mapState = (state, ownProps) => {
  const suiteId = getSuiteId(ownProps.history.location.pathname)
  const suites = testSuiteSelector.getAll(state)
  const suite = suites ? suites.find(suite => suite.id === suiteId) : {}
  return { suite }
}

const mapDispatch = (dispatch, ownProps) => {
  const suiteId = getSuiteId(ownProps.history.location.pathname)
  return {
    fetchSuite: () =>
      dispatch(
        request(`/suites?suite=${suiteId}`, { normalizer: normalizeData })
      )
  }
}

export default connect(
  mapState,
  mapDispatch
)(SuitePage)
