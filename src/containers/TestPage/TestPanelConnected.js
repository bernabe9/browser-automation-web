import { connect } from 'react-redux'

import request from 'state/modules/request'
import { normalizeData as executionNormalizeData } from 'state/schemas/execution'
import { normalizeData as stressExecutionNormalizeData } from 'state/schemas/stressExecution'
import ExecutionSelector from 'state/selectors/executionSelector'
import StressExecutionSelector from 'state/selectors/stressExecutionSelector'
import { applyQueryParams } from 'utils/helpers'
import TestPanel from './TestPanel'

const executionSelector = new ExecutionSelector()
const stressExecutionSelector = new StressExecutionSelector()

const executionsPath = props => {
  const { repositoryName, repositoryOwner } = props.match.params
  const { path } = props.cursor
  return applyQueryParams('/executions', {
    repositoryName,
    repositoryOwner,
    test: path
  })
}

const stressExecutionsPath = props => {
  const { repositoryName, repositoryOwner } = props.match.params
  const repository = `${repositoryOwner}/${repositoryName}`
  const { path } = props.cursor
  return applyQueryParams('/stress-executions', {
    repository,
    test: path
  })
}

const mapState = (state, ownProps) => {
  const executions = executionSelector.getAll(state)
  const testExecutions = executionSelector.filter(
    executions,
    ({ test }) => test === ownProps.cursor.path
  )
  const executionsMeta = state.data.meta[executionsPath(ownProps)]
  const loadingExecutions = executionsMeta && executionsMeta.loading
  let stressExecutionsSortedByDate
  if (testExecutions.length) {
    const stressExecutions = stressExecutionSelector.getAll(state)
    const testStressExecutions = stressExecutionSelector.filter(
      stressExecutions,
      ({ test }) => test === ownProps.cursor.path
    )
    stressExecutionsSortedByDate = stressExecutionSelector.sortByDate(
      testStressExecutions,
      'createdAt'
    )
  }
  const stressMeta = state.data.meta[stressExecutionsPath(ownProps)]
  const loadingStress = stressMeta && stressMeta.loading
  return {
    testExecutions,
    stressExecutions: stressExecutionsSortedByDate,
    loadingExecutions,
    loadingStress
  }
}

const mapDispatch = (dispatch, ownProps) => ({
  fetchExecutions: () =>
    dispatch(
      request(executionsPath(ownProps), { normalizer: executionNormalizeData })
    ),
  fetchStressExecutions: () =>
    dispatch(
      request(stressExecutionsPath(ownProps), {
        normalizer: stressExecutionNormalizeData
      })
    )
})

export default connect(
  mapState,
  mapDispatch
)(TestPanel)
