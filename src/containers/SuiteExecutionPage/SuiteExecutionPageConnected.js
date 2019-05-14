import { connect } from 'react-redux'

import request from 'state/modules/request'
import { normalizeDataExecution } from 'state/schemas/suiteExecution'
import SuiteExecutionSelector from 'state/selectors/suiteExecutionSelector'
import SuiteExecutionPage from './SuiteExecutionPage'

const suiteExecutionSelector = new SuiteExecutionSelector()

const mapState = (state, ownProps) => {
  const { id } = ownProps.match.params
  const suiteExecution = suiteExecutionSelector.findOrdered(
    state,
    suite => suite.id === id
  )
  return { suiteExecution }
}

const mapDispatch = (dispatch, ownProps) => {
  const { id } = ownProps.match.params
  return {
    fetchSuiteExecution: () =>
      dispatch(
        request(`/suite-executions/${id}`, {
          normalizer: normalizeDataExecution
        })
      )
  }
}

export default connect(
  mapState,
  mapDispatch
)(SuiteExecutionPage)
