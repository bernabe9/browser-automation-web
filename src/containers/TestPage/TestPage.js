import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Separator } from 'mc-components'

import Executions from 'components/Executions'
import Header from 'components/Header'
import MainPanel from './MainPanel'

const TestPage = ({
  fetchExecutions,
  fetchStressExecutions,
  executions,
  stressExecutions,
  history
}) => {
  useEffect(() => {
    fetchExecutions()
    fetchStressExecutions()
  }, [])

  return (
    <div>
      <Header />
      {executions && stressExecutions && (
        <Fragment>
          <MainPanel
            executions={executions}
            stressExecutions={stressExecutions}
            history={history}
          />
          <div className="container mc-my-5 mc-p-5 mc-invert mc-background--color-light">
            <h5 className="mc-text-h5">All Executions</h5>
            <Separator />
            <Executions executions={executions} />
          </div>
        </Fragment>
      )}
    </div>
  )
}

TestPage.propTypes = {
  fetchExecutions: PropTypes.func.isRequired,
  fetchStressExecutions: PropTypes.func.isRequired,
  executions: PropTypes.array,
  stressExecutions: PropTypes.array,
  history: PropTypes.object
}

export default TestPage
