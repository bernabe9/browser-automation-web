import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import RunTest from './RunTest'
import Executions from './Executions'
import NavigationPanel from './NavigationPanel'

const HomePage = ({ fetchExecutions, executions }) => {
  useEffect(() => {
    fetchExecutions()
  }, [])

  return (
    <div>
      <h2 className="mc-text-h2 mc-m-4 mc-text--center">
        Browser Automation | MasterClass
      </h2>
      <NavigationPanel />
      <RunTest onSuccess={fetchExecutions} />
      <Executions executions={executions} />
    </div>
  )
}

HomePage.propTypes = {
  fetchExecutions: PropTypes.func.isRequired,
  executions: PropTypes.array.isRequired
}

export default HomePage
