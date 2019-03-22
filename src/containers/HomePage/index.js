import React, { useState, useEffect } from 'react'

import api from 'api'
import RunTest from './RunTest'
import Executions from './Executions'
import NavigationPanel from './NavigationPanel'

const HomePage = () => {
  const [executions, setExecutions] = useState([])

  const fetchExecutions = () => {
    api('/executions').then(setExecutions)
  }

  useEffect(fetchExecutions, [])

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

export default HomePage
