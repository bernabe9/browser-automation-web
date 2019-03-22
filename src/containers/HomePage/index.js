import React, { useState, useEffect } from 'react'

import RunTest from './RunTest'
import Executions from './Executions'

const HomePage = () => {
  const [executions, setExecutions] = useState([])

  const fetchExecutions = () => {
    fetch(`${process.env.API_URL}/executions`)
      .then(res => res.json())
      .then(setExecutions)
  }

  useEffect(fetchExecutions, [])

  return (
    <div>
      <h2 className="mc-text-h2 mc-m-4">Browser Automation | MasterClass</h2>
      <RunTest onSuccess={fetchExecutions} />
      <Executions executions={executions} />
    </div>
  )
}

export default HomePage
